import { useEffect, useRef, useState } from 'react';
import { X, Music, FlipHorizontal, Zap, Timer, Sliders, Sparkles, Image, Play } from 'lucide-react';

type Duration = '10m' | '60s' | '15s' | 'PHOTO' | 'TEXT';

const DURATIONS: Duration[] = ['10m', '60s', '15s', 'PHOTO', 'TEXT'];

export default function CameraPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [flashOn, setFlashOn] = useState(false);
  const [timer, setTimer] = useState<0 | 3 | 10>(0);
  const [duration, setDuration] = useState<Duration>('15s');
  const [showFilters, setShowFilters] = useState(false);
  const [showSoundPicker, setShowSoundPicker] = useState(false);
  const [beauty, setBeauty] = useState(0);
  const [recording, setRecording] = useState(false);
  const [recordProgress, setRecordProgress] = useState(0);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cameraReady, setCameraReady] = useState(false);
  const recordTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function startCamera() {
      setCameraReady(false);
      setError(null);

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode },
          audio: true,
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play().catch(() => {});
        }
        setCameraReady(true);
      } catch (err) {
        setError('Camera access denied. Please allow camera permissions.');
      }
    }

    startCamera();

    return () => {
      cancelled = true;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
    };
  }, [facingMode]);

  function getMaxDurationMs(): number {
    switch (duration) {
      case '10m': return 10 * 60 * 1000;
      case '60s': return 60 * 1000;
      case '15s': return 15 * 1000;
      default: return 15 * 1000;
    }
  }

  function startCapture() {
    if (duration === 'PHOTO') {
      window.location.hash = '#/post-preview';
      return;
    }
    if (duration === 'TEXT') {
      window.location.hash = '#/post-preview';
      return;
    }

    if (timer > 0) {
      setCountdown(timer);
      const cdRef = setInterval(() => {
        setCountdown((prev) => {
          if (prev === null) return null;
          if (prev <= 1) {
            clearInterval(cdRef);
            setCountdown(null);
            beginRecording();
            return null;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      beginRecording();
    }
  }

  function beginRecording() {
    setRecording(true);
    setRecordProgress(0);
    const maxMs = getMaxDurationMs();
    const startTime = Date.now();

    recordTimerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / maxMs) * 100, 100);
      setRecordProgress(pct);
      if (pct >= 100) {
        stopCapture();
      }
    }, 50);
  }

  function stopCapture() {
    if (recordTimerRef.current) {
      clearInterval(recordTimerRef.current);
      recordTimerRef.current = null;
    }
    setRecording(false);
    setRecordProgress(0);
    window.location.hash = '#/post-preview';
  }

  const recordRadius = 40;
  const circumference = 2 * Math.PI * recordRadius;

  return (
    <div className="relative h-screen w-full bg-black overflow-hidden text-white">
      {/* Camera preview */}
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        autoPlay
        playsInline
        muted
        style={{ transform: facingMode === 'user' ? 'scaleX(-1)' : 'none' }}
      />

      {/* Black overlay when camera not ready */}
      {!cameraReady && !error && (
        <div className="absolute inset-0 bg-black flex items-center justify-center">
          <div className="w-10 h-10 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}

      {/* Error overlay */}
      {error && (
        <div className="absolute inset-0 bg-black flex flex-col items-center justify-center px-8 text-center">
          <p className="text-white font-semibold text-base mb-2">Camera unavailable</p>
          <p className="text-gray-500 text-sm">{error}</p>
        </div>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-30 px-4 pt-6 flex items-center justify-between">
        <button
          onClick={() => window.location.hash = '#/'}
          className="w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center active:scale-90 transition-transform"
        >
          <X className="w-5 h-5" />
        </button>

        <button
          onClick={() => setShowSoundPicker(true)}
          className="flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-full px-4 py-1.5 active:scale-95 transition-transform"
        >
          <Music className="w-4 h-4" />
          <span className="text-sm font-medium">Add sound</span>
        </button>

        <div className="w-9" />
      </div>

      {/* Right icons */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-5">
        <button
          onClick={() => setFacingMode((f) => (f === 'user' ? 'environment' : 'user'))}
          className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center active:scale-90 transition-transform"
        >
          <FlipHorizontal className="w-5 h-5" />
        </button>

        <button
          onClick={() => setFlashOn((f) => !f)}
          className={`w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center active:scale-90 transition-transform ${flashOn ? 'bg-[#FFD700]/40' : 'bg-black/30'}`}
        >
          <Zap className={`w-5 h-5 ${flashOn ? 'fill-[#FFD700] text-[#FFD700]' : ''}`} />
        </button>

        <button
          onClick={() => setTimer((t) => (t === 0 ? 3 : t === 3 ? 10 : 0))}
          className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center active:scale-90 transition-transform relative"
        >
          <Timer className="w-5 h-5" />
          {timer > 0 && (
            <span className="absolute -bottom-1 -right-1 text-[9px] font-bold bg-[#00FF88] text-black rounded-full w-5 h-5 flex items-center justify-center">
              {timer}s
            </span>
          )}
        </button>

        <button
          onClick={() => setShowFilters(true)}
          className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center active:scale-90 transition-transform"
        >
          <Sliders className="w-5 h-5" />
        </button>

        <button
          onClick={() => setBeauty((b) => (b >= 3 ? 0 : b + 1))}
          className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center active:scale-90 transition-transform relative"
        >
          <Sparkles className="w-5 h-5" />
          {beauty > 0 && (
            <span className="absolute -bottom-1 -right-1 text-[9px] font-bold bg-[#FF2D55] text-white rounded-full w-5 h-5 flex items-center justify-center">
              {beauty}
            </span>
          )}
        </button>
      </div>

      {/* Countdown */}
      {countdown !== null && (
        <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
          <span className="text-[120px] font-black text-white drop-shadow-2xl animate-ping-slow">{countdown}</span>
        </div>
      )}

      {/* Bottom controls */}
      <div className="absolute bottom-0 left-0 right-0 z-30 pb-6">
        {/* Duration selector */}
        <div className="flex items-center justify-center gap-2 mb-4">
          {DURATIONS.map((d) => (
            <button
              key={d}
              onClick={() => setDuration(d)}
              className={`text-xs font-bold px-3 py-1 rounded-full transition-all ${
                duration === d
                  ? 'bg-white text-black'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        {/* Record button + side buttons */}
        <div className="flex items-center justify-between px-8">
          {/* Left: drafts / gallery */}
          <button className="w-12 h-12 rounded-xl bg-white/10 overflow-hidden border border-white/20 flex items-center justify-center">
            <Image className="w-5 h-5 text-white/70" />
          </button>

          {/* Center: record button */}
          <button
            onClick={startCapture}
            onPointerUp={recording ? stopCapture : undefined}
            className="relative w-20 h-20 flex items-center justify-center active:scale-95 transition-transform"
            disabled={!cameraReady && !error}
          >
            {recording ? (
              <div className="w-12 h-12 rounded-lg bg-[#FF2D55]" />
            ) : (
              <>
                <svg className="absolute inset-0" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r={recordRadius} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />
                  {recording && (
                    <circle
                      cx="50" cy="50" r={recordRadius}
                      fill="none" stroke="#FF2D55" strokeWidth="4"
                      strokeDasharray={circumference}
                      strokeDashoffset={circumference - (recordProgress / 100) * circumference}
                      transform="rotate(-90 50 50)"
                      style={{ transition: 'stroke-dashoffset 0.05s linear' }}
                    />
                  )}
                </svg>
                <div className="w-14 h-14 rounded-full bg-[#FF2D55] border-4 border-white" />
              </>
            )}
          </button>

          {/* Right: effects */}
          <button className="w-12 h-12 rounded-xl bg-white/10 overflow-hidden border border-white/20 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white/70" />
          </button>
        </div>

        {/* Bottom tabs */}
        <div className="flex items-center justify-center gap-8 mt-5">
          <button
            onClick={() => window.location.hash = '#/live'}
            className="text-sm font-semibold text-white/70 hover:text-white transition-colors"
          >
            LIVE
          </button>
          <button className="text-sm font-bold text-white relative">
            CAMERA
            <div className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-white rounded-full" />
          </button>
          <button
            onClick={() => window.location.hash = '#/upload'}
            className="text-sm font-semibold text-white/70 hover:text-white transition-colors"
          >
            UPLOAD
          </button>
        </div>
      </div>

      {/* Filters bottom sheet */}
      {showFilters && (
        <div className="absolute inset-0 z-50 flex items-end" onClick={() => setShowFilters(false)}>
          <div className="absolute inset-0 bg-black/60" />
          <div
            className="relative w-full bg-[#1a1a1a] rounded-t-3xl p-5 pb-8"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: 'slideUp 0.3s ease-out' }}
          >
            <style>{`@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }`}</style>
            <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-4" />
            <h3 className="font-bold text-base mb-4">Filters</h3>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {['Normal', 'Vivid', 'Warm', 'Cool', 'B&W', 'Vintage', 'Glow', 'Sharp'].map((f, i) => (
                <button
                  key={f}
                  className={`flex-shrink-0 w-20 h-24 rounded-xl flex items-end justify-center pb-2 text-xs font-medium border-2 transition-colors ${
                    i === 0 ? 'border-[#00FF88]' : 'border-transparent'
                  }`}
                  style={{
                    background: ['none', 'sepia(0.3)', 'hue-rotate(20deg)', 'hue-rotate(-20deg)', 'grayscale(1)', 'sepia(0.6)', 'brightness(1.2)', 'contrast(1.3)'][i],
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sound picker modal */}
      {showSoundPicker && (
        <div className="absolute inset-0 z-50 flex items-end" onClick={() => setShowSoundPicker(false)}>
          <div className="absolute inset-0 bg-black/60" />
          <div
            className="relative w-full bg-[#1a1a1a] rounded-t-3xl p-5 pb-8"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: 'slideUp 0.3s ease-out' }}
          >
            <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-4" />
            <h3 className="font-bold text-base mb-4">Add sound</h3>
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {['Original audio', 'Trending now', 'Hip Hop', 'Pop hits', 'R&B classics', 'Electronic', 'Ambient'].map((s, i) => (
                <button
                  key={s}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${i === 0 ? 'bg-white/10' : 'hover:bg-white/5'}`}
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00FF88] to-[#0088FF] flex items-center justify-center">
                    <Play className="w-4 h-4 text-black" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium">{s}</p>
                    <p className="text-xs text-gray-500">{i === 0 ? 'Record with your own audio' : 'Popular sound'}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
