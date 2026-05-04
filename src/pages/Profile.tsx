import { useState } from 'react';
import { 
  User, Mail, Briefcase, 
  Calendar, Shield, Clock, Camera, Edit2,
  Settings, Key, Bell, Activity, AlertCircle, CheckCircle, Loader2, Lock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../lib/api';
import { Link } from 'react-router-dom';

// ─── Sub-components ───────────────────────────────────────────────────────────

const SidebarItem = ({ icon: Icon, label, id, activeTab, onClick }: { 
  icon: React.ElementType; label: string; id: string; activeTab: string; onClick: (id: string) => void 
}) => (
  <button
    onClick={() => onClick(id)}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
      activeTab === id 
        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
        : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'
    }`}
  >
    <Icon className={`w-5 h-5 ${activeTab === id ? 'text-white' : 'text-slate-400'}`} />
    {label}
  </button>
);

interface AlertProps { type: 'error' | 'success'; message: string }
const Alert = ({ type, message }: AlertProps) => (
  <div className={`flex items-start gap-3 p-4 rounded-xl text-sm ${
    type === 'error' ? 'bg-red-50 border border-red-200 text-red-700' : 'bg-emerald-50 border border-emerald-200 text-emerald-700'
  }`}>
    {type === 'error' ? <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" /> : <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />}
    <span>{message}</span>
  </div>
);

// ─── Loading Skeleton ─────────────────────────────────────────────────────────

const ProfileSkeleton = () => (
  <div className="flex-1 space-y-6 animate-pulse">
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="h-40 bg-slate-200" />
      <div className="px-8 pb-8 relative">
        <div className="flex justify-between items-end -mt-12 mb-6">
          <div className="w-24 h-24 rounded-full bg-slate-200 border-4 border-white" />
          <div className="w-32 h-10 bg-slate-200 rounded-xl" />
        </div>
        <div className="h-7 w-48 bg-slate-200 rounded-lg mb-3" />
        <div className="flex gap-4">
          <div className="h-6 w-36 bg-slate-200 rounded-full" />
          <div className="h-6 w-28 bg-slate-200 rounded-lg" />
        </div>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 h-48 bg-slate-100" />
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 h-48 bg-slate-100" />
    </div>
  </div>
);

// ─── General Tab ─────────────────────────────────────────────────────────────

interface GeneralTabProps { email: string; role: string; createdAt: string }
const GeneralTab = ({ email, role, createdAt }: GeneralTabProps) => {
  const displayName = email.split('@')[0];
  const joinDate = new Date(createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <>
      {/* Header Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="h-40 bg-gradient-to-r from-blue-600 to-indigo-700 relative">
          <button className="absolute bottom-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 cursor-not-allowed opacity-60">
            <Camera className="w-4 h-4" /> Edit Cover
          </button>
        </div>
        <div className="px-8 pb-8 relative">
          <div className="flex justify-between items-end -mt-12 mb-6">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full border-4 border-white shadow-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <span className="text-3xl font-bold text-white uppercase">
                  {displayName.charAt(0)}
                </span>
              </div>
              <button className="absolute bottom-0 right-0 p-1.5 bg-blue-600 rounded-full text-white shadow-lg hover:bg-blue-700 transition-colors opacity-0 group-hover:opacity-100">
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-medium hover:bg-slate-800 transition-colors shadow-md">
              <Edit2 className="w-4 h-4" /> Edit Profile
            </button>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900 capitalize">{displayName}</h1>
            <div className="flex flex-wrap items-center gap-4 mt-2 text-slate-600">
              <div className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium border border-blue-100">
                <Shield className="w-4 h-4" /> {role}
              </div>
              <div className="flex items-center gap-1.5 text-sm">
                <Briefcase className="w-4 h-4 text-slate-400" /> IT & Security
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Details */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Personal Details</h3>
          <div className="space-y-5">
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Email Address</p>
                <p className="text-sm font-medium text-slate-900 mt-0.5">{email}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Joined Date</p>
                <p className="text-sm font-medium text-slate-900 mt-0.5">{joinDate}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Role</p>
                <p className="text-sm font-medium text-slate-900 mt-0.5">{role}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Account Status */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Account Status</h3>
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 mb-4">
            <span className="text-sm font-medium text-slate-600">Current Status</span>
            <span className="px-3 py-1 bg-green-100 text-green-700 border border-green-200 rounded-full text-xs font-bold flex items-center gap-1.5 uppercase tracking-wide">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
              Active
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-sm font-medium text-slate-600">Account Type</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 border border-blue-200 rounded-full text-xs font-bold uppercase tracking-wide">
              {role}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

// ─── Security Tab ─────────────────────────────────────────────────────────────

const SecurityTab = () => {
  const [pwForm, setPwForm] = useState({ currentPassword: '', newPassword: '', confirm: '' });
  const [emailForm, setEmailForm] = useState({ email: '', password: '' });
  const [pwLoading, setPwLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [pwMsg, setPwMsg] = useState<{ type: 'error' | 'success'; text: string } | null>(null);
  const [emailMsg, setEmailMsg] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pwForm.newPassword !== pwForm.confirm) {
      setPwMsg({ type: 'error', text: 'New passwords do not match.' });
      return;
    }
    setPwLoading(true);
    setPwMsg(null);
    try {
      const res = await authApi.updatePassword({ currentPassword: pwForm.currentPassword, newPassword: pwForm.newPassword });
      setPwMsg({ type: 'success', text: res.message });
      setPwForm({ currentPassword: '', newPassword: '', confirm: '' });
    } catch (err: unknown) {
      setPwMsg({ type: 'error', text: err instanceof Error ? err.message : 'Failed to update password.' });
    } finally {
      setPwLoading(false);
    }
  };

  const handleEmailChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailLoading(true);
    setEmailMsg(null);
    try {
      const res = await authApi.updateEmail({ email: emailForm.email, password: emailForm.password });
      setEmailMsg({ type: 'success', text: res.message });
      setEmailForm({ email: '', password: '' });
    } catch (err: unknown) {
      setEmailMsg({ type: 'error', text: err instanceof Error ? err.message : 'Failed to update email.' });
    } finally {
      setEmailLoading(false);
    }
  };

  const inputClass = "appearance-none block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm bg-white text-sm";

  return (
    <div className="space-y-6">
      {/* Change Password */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Change Password</h2>
        <p className="text-sm text-slate-500 mb-6">Update your password to keep your account secure.</p>
        {pwMsg && <Alert type={pwMsg.type} message={pwMsg.text} />}
        <form onSubmit={handlePasswordChange} className="mt-4 space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400"><Lock className="h-5 w-5" /></div>
            <input type="password" required placeholder="Current password" value={pwForm.currentPassword}
              onChange={e => setPwForm(f => ({ ...f, currentPassword: e.target.value }))} className={inputClass} />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400"><Key className="h-5 w-5" /></div>
            <input type="password" required placeholder="New password (min 8 chars)" value={pwForm.newPassword}
              onChange={e => setPwForm(f => ({ ...f, newPassword: e.target.value }))} className={inputClass} />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400"><Key className="h-5 w-5" /></div>
            <input type="password" required placeholder="Confirm new password" value={pwForm.confirm}
              onChange={e => setPwForm(f => ({ ...f, confirm: e.target.value }))} className={inputClass} />
          </div>
          <button type="submit" disabled={pwLoading}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-60">
            {pwLoading && <Loader2 className="w-4 h-4 animate-spin" />} Update Password
          </button>
        </form>
      </div>

      {/* Change Email */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Change Email</h2>
        <p className="text-sm text-slate-500 mb-6">Confirm your password to update your email address.</p>
        {emailMsg && <Alert type={emailMsg.type} message={emailMsg.text} />}
        <form onSubmit={handleEmailChange} className="mt-4 space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400"><Mail className="h-5 w-5" /></div>
            <input type="email" required placeholder="New email address" value={emailForm.email}
              onChange={e => setEmailForm(f => ({ ...f, email: e.target.value }))} className={inputClass} />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400"><Lock className="h-5 w-5" /></div>
            <input type="password" required placeholder="Confirm current password" value={emailForm.password}
              onChange={e => setEmailForm(f => ({ ...f, password: e.target.value }))} className={inputClass} />
          </div>
          <button type="submit" disabled={emailLoading}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-60">
            {emailLoading && <Loader2 className="w-4 h-4 animate-spin" />} Update Email
          </button>
        </form>
      </div>

      {/* 2FA */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-base font-semibold text-slate-900">Two-Factor Authentication</h4>
            <p className="text-sm text-slate-500 mt-1">Add an extra layer of security to your account.</p>
          </div>
          <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-sm font-medium hover:bg-blue-100 transition-colors">
            Enable 2FA
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Activity Tab ─────────────────────────────────────────────────────────────

const ActivityTab = () => {
  const { user } = useAuth();
  const activities = [
    { id: 1, action: 'Logged into the system', time: 'Just now' },
    { id: 2, action: 'Profile page viewed', time: '1 minute ago' },
    { id: 3, action: `Account registered as ${user?.role}`, time: user ? new Date(user.createdAt).toLocaleDateString() : '' },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-8">Activity Log</h2>
      <div className="space-y-8">
        {activities.map((activity, index) => (
          <div key={activity.id} className="relative pl-6">
            {index !== activities.length - 1 && (
              <div className="absolute left-[11px] top-6 bottom-[-32px] w-px bg-slate-200"></div>
            )}
            <div className="absolute left-0 top-1.5 w-[22px] h-[22px] rounded-full bg-blue-50 border-4 border-white flex items-center justify-center shadow-sm">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            </div>
            <div>
              <p className="text-base font-medium text-slate-900">{activity.action}</p>
              <div className="flex items-center gap-1 mt-1.5 text-sm font-medium text-slate-500">
                <Clock className="w-4 h-4" />
                {activity.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Not Logged In ────────────────────────────────────────────────────────────

const NotLoggedIn = () => (
  <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4">
    <div className="max-w-md w-full text-center bg-white rounded-3xl shadow-sm border border-slate-200 p-12">
      <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
        <Shield className="w-8 h-8 text-blue-400" />
      </div>
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Sign in required</h2>
      <p className="text-slate-500 mb-8">Please log in to view your profile.</p>
      <Link to="/login" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors">
        Go to Login
      </Link>
    </div>
  </div>
);

// ─── Main Profile Component ───────────────────────────────────────────────────

const Profile = () => {
  const { user, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('general');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 pt-28 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-64 flex-shrink-0 space-y-2 animate-pulse">
              <div className="bg-white rounded-3xl h-60 border border-slate-200" />
            </div>
            <ProfileSkeleton />
          </div>
        </div>
      </div>
    );
  }

  if (!user) return <NotLoggedIn />;

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0 space-y-2">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-4 space-y-1">
              <SidebarItem icon={User} label="General" id="general" activeTab={activeTab} onClick={setActiveTab} />
              <SidebarItem icon={Key} label="Security" id="security" activeTab={activeTab} onClick={setActiveTab} />
              <SidebarItem icon={Bell} label="Notifications" id="notifications" activeTab={activeTab} onClick={setActiveTab} />
              <SidebarItem icon={Activity} label="Activity Log" id="activity" activeTab={activeTab} onClick={setActiveTab} />
              <SidebarItem icon={Settings} label="Preferences" id="preferences" activeTab={activeTab} onClick={setActiveTab} />
            </div>
            
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden mt-6">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3"></div>
              <Shield className="w-8 h-8 text-blue-200 mb-3 relative z-10" />
              <h4 className="text-lg font-semibold relative z-10">{user.role} Access</h4>
              <p className="text-sm text-blue-100 mt-1 relative z-10">You have full permissions to manage the system.</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {activeTab === 'general' && (
              <GeneralTab email={user.email} role={user.role} createdAt={user.createdAt} />
            )}
            {activeTab === 'security' && <SecurityTab />}
            {activeTab === 'activity' && <ActivityTab />}
            {['notifications', 'preferences'].includes(activeTab) && (
              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-12 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Settings className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900">Coming Soon</h3>
                <p className="text-slate-500 mt-2 max-w-sm mx-auto">
                  This section is currently under development. Check back later for updates.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
