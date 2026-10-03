import { useEffect, useRef, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { LoadingState, ErrorState } from '@/components/States';
import { createSignaling, createPeerConnection } from '@/lib/webrtc';
import { X, Users, Mic, MicOff, Camera, CameraOff, ShieldAlert } from 'lucide-react';
// Model will be loaded from CDN to avoid install error
const NSFW_CDN = "https://cdn.jsdelivr.net/npm/nsfwjs@2.4.2/dist/nsfwjs.min.js";

interface Props {
  streamId: string;
}

interface PeerState {
  pc: RTCPeerConnection;
  viewerId: string;
}

const SCAN_INTERVAL_MS = 2000;
const NUDITY_THRESHOLD = 0.75;
const BAN_COUNTDOWN_SECONDS = 3;

export function GoLivePage({ streamId }: Props) {
  const { user, profile } = useAuth();
  const videoRef = useRef<HTMLVideoElement>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const peersRef = useRef<Map<string, PeerState>>(new Map());
  const signalingRef = useRef<ReturnType<typeof createSignaling> | null>(null);
  const [viewerCount, setViewerCount] = useState(0);
  const [streamTitle, setStreamTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);

  // Nudity detection state
  const nsfwModelRef = useRef<NSFWJS | null>(null);
  const scanTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const banCountdownRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [nudityWarning, setNudityWarning] = useState(false);
  const [banCountdown, setBanCountdown] = useState<number | null>(null);
  const [banned, setBanned] = useState(false);

  if (profile && !profile.is_live_allowed) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-8 text-center">
        <p className="text-white font-semibold text-lg mb-2">Live is unavailable</p>
        <p className="text-gray-400 text-sm mb-6">Live is only for Vertiq global accounts</p>
        <button
          onClick={() => window.location.hash = '#/'}
          className="bg-[#8A2BE2] text-white font-bold px-8 py-2.5 rounded-full text-sm active:scale-95 transition-transform"
        >
          Go Home
        </button>
      </div>
    );
  }

  useEffect(() => {
    async function loadStream() {
      const { data, error: err } = await supabase
        .from('live_streams')
        .select('id, host_id, title, status, viewer_count')
        .eq('id', streamId)
        .maybeSingle();

      if (err || !data) {
        setError(err?.message ?? 'Stream not found');
        setLoading(false);
        return;
      }

      if (data.host_id !== user?.id) {
        setError('You are not the host of this stream.');
        setLoading(false);
        return;
      }

      setStreamTitle(data.title);
      setViewerCount(data.viewer_count);
      setLoading(false);
    }
    loadStream();
  }, [streamId, user]);

  const startStreaming = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 720 }, height: { ideal: 1280 } },
        audio: true,
      });
      localStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      setError(`Failed to access camera/microphone: ${(err as Error).message}`);
    }
  }, []);

  useEffect(() => {
    if (loading || error) return;
    startStreaming();
  }, [loading, error, startStreaming]);

  // Load NSFW model once camera is ready
  useEffect(() => {
    if (loading || error) return;

    let cancelled = false;

    async function loadModel() {
      try {
        await tf.ready();
        const model = await loadNsfwModel();
        if (cancelled) return;
        nsfwModelRef.current = model;
      } catch {
        // Model failed to load — detection just won't run, stream continues
      }
    }

    loadModel();
    return () => { cancelled = true; };
  }, [loading, error]);

  // Start scanning loop once video is playing and model is loaded
  const beginNudityScanning = useCallback(() => {
    if (scanTimerRef.current) return;

    scanTimerRef.current = setInterval(async () => {
      const video = videoRef.current;
      const model = nsfwModelRef.current;
      if (!video || !model || video.readyState < 2) return;
      if (nudityWarning || banned) return;

      try {
        const predictions = await model.classify(video, 1);
        const top = predictions[0];
        if (!top) return;

        if ((top.className === 'Porn' || top.className === 'Sexy') && top.probability > NUDITY_THRESHOLD) {
          setNudityWarning(true);
          startBanCountdown();
        }
      } catch {
        // Classification error — skip this frame
      }
    }, SCAN_INTERVAL_MS);
  }, [nudityWarning, banned]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || loading || error) return;

    function onPlaying() {
      beginNudityScanning();
    }

    video.addEventListener('playing', onPlaying);
    return () => video.removeEventListener('playing', onPlaying);
  }, [loading, error, beginNudityScanning]);

  function startBanCountdown() {
    if (banCountdownRef.current) return;
    setBanCountdown(BAN_COUNTDOWN_SECONDS);

    banCountdownRef.current = setInterval(() => {
      setBanCountdown((prev) => {
        if (prev === null) return null;
        if (prev <= 1) {
          // Countdown finished — ban and end stream
          if (banCountdownRef.current) {
            clearInterval(banCountdownRef.current);
            banCountdownRef.current = null;
          }
          setBanned(true);
          setNudityWarning(false);
          doBanAndEndStream();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  async function doBanAndEndStream() {
    // Stop scanning
    if (scanTimerRef.current) {
      clearInterval(scanTimerRef.current);
      scanTimerRef.current = null;
    }

    // End the stream in database
    await supabase
      .from('live_streams')
      .update({ status: 'ended', ended_at: new Date().toISOString() })
      .eq('id', streamId);

    // Stop all tracks
    signalingRef.current?.cleanupSignals();
    localStreamRef.current?.getTracks().forEach((t) => t.stop());
  }

  useEffect(() => {
    if (loading || error || !user) return;

    const signaling = createSignaling({
      table: 'stream_signals',
      foreignKey: 'stream_id',
      sessionId: streamId,
      myId: user.id,
      onSignal: async (fromId, type, payload) => {
        if (type === 'offer') {
          const pc = createPeerConnection();
          localStreamRef.current?.getTracks().forEach((track) => {
            pc.addTrack(track, localStreamRef.current!);
          });

          pc.onicecandidate = (e) => {
            if (e.candidate) {
              signaling.sendSignal(fromId, 'ice', JSON.stringify(e.candidate));
            }
          };

          peersRef.current.set(fromId, { pc, viewerId: fromId });
          await pc.setRemoteDescription(JSON.parse(payload));
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          signaling.sendSignal(fromId, 'answer', JSON.stringify(answer));
        } else if (type === 'ice') {
          const peer = peersRef.current.get(fromId);
          if (peer) {
            try {
              await peer.pc.addIceCandidate(JSON.parse(payload));
            } catch {
              // ignore
            }
          }
        }
      },
    });
    signalingRef.current = signaling;

    const streamChannel = supabase
      .channel(`host-stream-${streamId}`)
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'live_streams', filter: `id=eq.${streamId}` }, (payload) => {
        const updated = payload.new as { viewer_count: number };
        setViewerCount(updated.viewer_count);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(streamChannel);
      peersRef.current.forEach((p) => p.pc.close());
      peersRef.current.clear();
      signaling.cleanupSignals();
      localStreamRef.current?.getTracks().forEach((t) => t.stop());
      if (scanTimerRef.current) {
        clearInterval(scanTimerRef.current);
        scanTimerRef.current = null;
      }
      if (banCountdownRef.current) {
        clearInterval(banCountdownRef.current);
        banCountdownRef.current = null;
      }
    };
  }, [loading, error, user, streamId]);

  async function endStream() {
    if (scanTimerRef.current) {
      clearInterval(scanTimerRef.current);
      scanTimerRef.current = null;
    }
    await supabase.from('live_streams').update({ status: 'ended', ended_at: new Date().toISOString() }).eq('id', streamId);
    signalingRef.current?.cleanupSignals();
    localStreamRef.current?.getTracks().forEach((t) => t.stop());
    window.location.hash = '#/live';
  }

  function toggleMic() {
    const audio = localStreamRef.current?.getAudioTracks();
    if (audio && audio[0]) {
      audio[0].enabled = !audio[0].enabled;
      setMicOn(audio[0].enabled);
    }
  }

  function toggleCamera() {
    const video = localStreamRef.current?.getVideoTracks();
    if (video && video[0]) {
      video[0].enabled = !video[0].enabled;
      setCameraOn(video[0].enabled);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <LoadingState label="Starting stream…" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black px-4 pt-6">
        <a href="#/live" className="text-gray-400 hover:text-white transition-colors mb-4 inline-block">
          <X className="w-6 h-6" />
        </a>
        <ErrorState message={error} />
      </div>
    );
  }

  // Final ban screen
  if (banned) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center px-8 text-center">
        <div className="w-24 h-24 rounded-full bg-[#FF3B30] flex items-center justify-center mb-6">
          <ShieldAlert className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-white text-2xl font-black mb-3">Your ID has been banned for nudity</h1>
        <p className="text-gray-400 text-sm mb-8 max-w-xs">
          Your live stream has been terminated. Your account is flagged for violating Vertiq's community guidelines.
        </p>
        <button
          onClick={() => window.location.hash = '#/'}
          className="bg-[#8A2BE2] text-white font-bold px-10 py-3 rounded-full text-sm active:scale-95 transition-transform"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full bg-black overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="h-full w-full object-cover"
        style={{ transform: 'scaleX(-1)' }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />

      {/* Nudity warning overlay — hidden by default, shown only on detection */}
      {nudityWarning && banCountdown !== null && banCountdown > 0 && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#FF3B30]/95">
          <div className="w-28 h-28 rounded-full bg-white/20 flex items-center justify-center mb-6">
            <span
              className="text-7xl font-black text-white"
              style={{ animation: 'banPulse 1s ease-in-out infinite' }}
            >
              {banCountdown}
            </span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <ShieldAlert className="w-10 h-10 text-white" />
            <h2 className="text-white text-2xl font-black uppercase tracking-wide">NUDITY NOT ALLOWED</h2>
          </div>
          <p className="text-white text-xl font-bold uppercase tracking-wide">ID WILL BE BANNED</p>
          <p className="text-white/80 text-sm mt-4">Stopping stream in {banCountdown}…</p>
          <style>{`@keyframes banPulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.3); } }`}</style>
        </div>
      )}

      <div className="absolute top-0 left-0 right-0 z-30 pt-6 pb-3 px-4 flex items-center justify-between bg-gradient-to-b from-black/60 to-transparent">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-[#8A2BE2] px-2.5 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-white text-xs font-bold">LIVE</span>
          </div>
          <span className="flex items-center gap-1 text-white/80 text-xs">
            <Users className="w-3.5 h-3.5" />
            {viewerCount}
          </span>
        </div>
        <button onClick={endStream} className="bg-[#FF3B30] hover:bg-red-600 text-white text-sm font-bold px-4 py-1.5 rounded-full transition-colors">
          End Stream
        </button>
      </div>

      <div className="absolute top-16 left-4 z-30">
        <p className="text-white font-bold text-lg drop-shadow-lg">{streamTitle}</p>
        <p className="text-white/60 text-xs">You are streaming</p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-30 pb-6 pt-4 px-4 bg-gradient-to-t from-black/70 to-transparent">
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={toggleMic}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
              micOn ? 'bg-white/15 text-white' : 'bg-[#FF3B30] text-white'
            }`}
          >
            {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
          </button>
          <button
            onClick={toggleCamera}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
              cameraOn ? 'bg-white/15 text-white' : 'bg-[#FF3B30] text-white'
            }`}
          >
            {cameraOn ? <Camera className="w-5 h-5" /> : <CameraOff className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
