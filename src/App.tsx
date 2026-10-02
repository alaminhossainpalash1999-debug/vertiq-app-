import { useEffect, useState } from 'react';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { AuthPage } from '@/pages/AuthPage';
import { FeedPage } from '@/pages/FeedPage';
import { UploadPage } from '@/pages/UploadPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { SearchPage } from '@/pages/SearchPage';
import { BookmarksPage } from '@/pages/BookmarksPage';
import { NotificationsPage } from '@/pages/NotificationsPage';
import { MessagesPage } from '@/pages/MessagesPage';
import { SettingsPage } from '@/pages/SettingsPage';
import SettingsAndPrivacy from '@/pages/SettingsAndPrivacy';
import MePage from '@/pages/MePage';
import BalancePage from '@/pages/BalancePage';
import ActivityCenterPage from '@/pages/ActivityCenterPage';
import QrCodePage from '@/pages/QrCodePage';
import PromotePage from '@/pages/PromotePage';
import { AdminPage } from '@/pages/AdminPage';
import { LivePage } from '@/pages/LivePage';
import { GoLivePage } from '@/pages/GoLivePage';
import { LiveViewerPage } from '@/pages/LiveViewerPage';
import { AudioChatPage } from '@/pages/AudioChatPage';
import { AudioRoomPage } from '@/pages/AudioRoomPage';
import EditProfilePage from '@/pages/EditProfilepage';
import { LanguagePage } from '@/pages/LanguagePage';
import SubSettingPage from '@/pages/SubSettingPage';
import CameraPage from '@/pages/CameraPage';
import PostPreviewPage from '@/pages/PostPreviewPage';
import FriendsPage from '@/pages/FriendsPage';
import InboxPage from '@/pages/InboxPage';
import OfflineVideosPage from '@/pages/OfflineVideosPage';
import CreatorToolsPage from '@/pages/CreatorToolsPage';
function useHashRoute() {
  const [hash, setHash] = useState(window.location.hash);
  useEffect(() => {
    function onHashChange() {
      setHash(window.location.hash);
    }
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);
  return hash;
}

function Router() {
  const { user, loading } = useAuth();
  const hash = useHashRoute();

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#00FF88] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  if (hash === '#/upload') return <UploadPage />;
  if (hash === '#/search') return <SearchPage />;
  if (hash === '#/saved') return <BookmarksPage />;
  if (hash === '#/notifications') return <NotificationsPage />;
  if (hash === '#/messages') return <MessagesPage />;
  if (hash === '#/settings') return <SettingsPage />;
  if (hash === '#/language') return <LanguagePage />;
  if (hash === '#/settings-privacy') return <SettingsAndPrivacy />;
  if (hash === '#/edit-profile') return <EditProfilePage />;
  if (hash === '#/me') return <MePage />;
  if (hash === '#/balance') return <BalancePage />;
  if (hash === '#/activity-center') return <ActivityCenterPage />;
  if (hash === '#/qr-code') return <QrCodePage />;
  if (hash === '#/promote') return <PromotePage />;
  if (hash === '#/offline-videos') return <OfflineVideosPage />;
  if (hash === '#/creator-tools') return <CreatorToolsPage />;
  if (hash === '#/camera') return <CameraPage />;
  if (hash === '#/post-preview') return <PostPreviewPage />;
  if (hash === '#/friends') return <FriendsPage />;
  if (hash === '#/inbox') return <InboxPage />;
  if (hash === '#/admin') return <AdminPage />;
  if (hash === '#/live') return <LivePage />;
  if (hash === '#/audio') return <AudioChatPage />;

  // Sub-settings pages with back navigation to #/settings-privacy
  if (hash === '#/settings/account') return <SubSettingPage title="Account" items={[{ title: 'Username', value: localStorage.getItem('edit_username') || 'Not set' }, { title: 'Email' }, { title: 'Phone number' }, { title: 'Password', hash: '#/settings/password' }, { title: 'Two-factor authentication' }]} />;
  if (hash === '#/settings/privacy') return <SubSettingPage title="Privacy" items={[{ title: 'Private account', value: 'Off' }, { title: 'Blocked accounts', hash: '#/settings/blocked' }, { title: 'Following list', hash: '#/settings/following-list', value: 'Only you' }, { title: 'Liked videos', hash: '#/settings/liked-videos', value: 'Only you' }]} />;
  if (hash === '#/settings/blocked') return <SubSettingPage title="Blocked accounts" />;
  if (hash === '#/settings/comments') return <SubSettingPage title="Comments" items={[{ title: 'Who can comment', value: 'Everyone' }, { title: 'Comment filters', hash: '#/settings/comment-filters' }, { title: 'Filtered keywords' }]} />;
  if (hash === '#/settings/mentions') return <SubSettingPage title="Mentions" items={[{ title: 'Who can mention you', value: 'Everyone' }]} />;
  if (hash === '#/settings/dm') return <SubSettingPage title="Direct messages" items={[{ title: 'Who can send you DMs', value: 'Everyone' }, { title: 'Message filters' }]} />;
  if (hash === '#/settings/reuse') return <SubSettingPage title="Reuse of content" items={[{ title: 'Allow reuse', value: 'Off' }]} />;
  if (hash === '#/settings/downloads') return <SubSettingPage title="Downloads" items={[{ title: 'Video downloads', value: 'Off' }, { title: 'Allow your videos to be downloaded', value: 'Off' }]} />;
  if (hash === '#/settings/following-list') return <SubSettingPage title="Following list" items={[{ title: 'Who can see your following list', value: 'Only you' }, { title: 'Friends' }, { title: 'Everyone' }]} />;
  if (hash === '#/settings/liked-videos') return <SubSettingPage title="Liked videos" items={[{ title: 'Who can see your liked videos', value: 'Only you' }, { title: 'Friends' }, { title: 'Everyone' }]} />;
  if (hash === '#/settings/content-prefs') return <SubSettingPage title="Content preferences" items={[{ title: 'Filtered keywords' }, { title: 'Restricted mode', value: 'Off' }]} />;
  if (hash === '#/settings/viewers') return <SubSettingPage title="Viewers" items={[{ title: 'Allow viewers to see your profile', value: 'On' }]} />;
  if (hash === '#/settings/data-saver') return <SubSettingPage title="Data Saver" items={[{ title: 'Data Saver', value: 'Off' }, { title: 'Enable on cellular data', value: 'On' }]} />;
  if (hash === '#/settings/clear-cache') return <SubSettingPage title="Clear cache" items={[{ title: 'Clear cache', value: '0 MB' }]} />;
  if (hash === '#/settings/help') return <SubSettingPage title="Help Center" items={[{ title: 'FAQ' }, { title: 'Contact support' }, { title: 'Report a problem' }]} />;
  if (hash === '#/settings/guidelines') return <SubSettingPage title="Community Guidelines" />;
  if (hash === '#/settings/about') return <SubSettingPage title="About Vertiq" items={[{ title: 'Terms of Service' }, { title: 'Privacy Policy' }, { title: 'Community Guidelines' }, { title: 'Version', value: '1.0.0' }]} />;
  if (hash === '#/settings/logout') return <SubSettingPage title="Log out" showLogout />;
  if (hash === '#/settings/activity-center') return <SubSettingPage title="Activity center" items={[{ title: 'Recent activity' }, { title: 'Notifications' }]} />;
  if (hash === '#/settings/your-activity') return <SubSettingPage title="Your activity" items={[{ title: 'Screen time' }, { title: 'Watch history' }, { title: 'Search history' }]} />;
  if (hash === '#/settings/private') return <SubSettingPage title="Private account" items={[{ title: 'Private account', value: 'Off' }]} />;
  if (hash === '#/settings/profile-view') return <SubSettingPage title="Profile view" items={[{ title: 'Who can view your profile', value: 'Everyone' }, { title: 'Friends' }, { title: 'Only you' }]} />;
  if (hash === '#/settings/password') return <SubSettingPage title="Password" items={[{ title: 'Change password' }]} />;
  if (hash === '#/settings/comment-filters') return <SubSettingPage title="Comment filters" items={[{ title: 'Filter spam', value: 'On' }, { title: 'Filter keywords' }]} />;

  const liveHostMatch = hash.match(/^#\/live\/host\/(.+)$/);
  if (liveHostMatch) return <GoLivePage streamId={liveHostMatch[1]} />;

  const liveViewMatch = hash.match(/^#\/live\/view\/(.+)$/);
  if (liveViewMatch) return <LiveViewerPage streamId={liveViewMatch[1]} />;

  const audioRoomMatch = hash.match(/^#\/audio\/room\/(.+)$/);
  if (audioRoomMatch) return <AudioRoomPage roomId={audioRoomMatch[1]} />;

  const profileMatch = hash.match(/^#\/profile\/(.+)$/);
  if (profileMatch) return <ProfilePage userId={profileMatch[1]} />;

  return <FeedPage />;
}

export default function App() {
  return (
    <AuthProvider>
      <div className="max-w-md mx-auto bg-black min-h-screen relative">
        <Router />
      </div>
    </AuthProvider>
  );
}
