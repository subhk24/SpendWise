// import React from 'react';
// import { Card } from '../components/UI';
// import { useAuth } from '../context/AuthContext';
// import { useTheme } from '../context/ThemeContext';

// export const Settings: React.FC = () => {
//   const { user } = useAuth();
//   const { theme, setTheme } = useTheme();

//   return (
//     <div className="max-w-2xl space-y-6">
//       <Card className="space-y-4">
//         <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100">Profile Information</h3>
//         <div className="space-y-3 text-sm">
//           <div>
//             <label className="text-xs text-slate-500 uppercase font-semibold">Name</label>
//             <p className="text-slate-800 dark:text-slate-200 font-medium">{user?.name}</p>
//           </div>
//           <div>
//             <label className="text-xs text-slate-500 uppercase font-semibold">Email</label>
//             <p className="text-slate-800 dark:text-slate-200 font-medium">{user?.email}</p>
//           </div>
//         </div>
//       </Card>

//       <Card className="space-y-4">
//         <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100">Appearance Settings</h3>
//         <div className="space-y-2">
//           <label className="block text-xs text-slate-500 uppercase font-semibold">Theme Mode</label>
//           <div className="grid grid-cols-3 gap-3">
//             {(['light', 'dark', 'system'] as const).map((mode) => (
//               <button
//                 key={mode}
//                 onClick={() => setTheme(mode)}
//                 className={`py-2 px-4 rounded-lg text-sm font-medium border capitalize transition-colors ${
//                   theme === mode
//                     ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400'
//                     : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
//                 }`}
//               >
//                 {mode}
//               </button>
//             ))}
//           </div>
//         </div>
//       </Card>
//     </div>
//   );
// };

import React, { useState } from 'react';
import { Check, Edit3, Lock, X } from 'lucide-react';
import { Card, Input, Button } from '../components/UI';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

export const Settings: React.FC = () => {
  const { user, updateUser } = useAuth();

  const [editingProfile, setEditingProfile] = useState(false);

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [profileMessage, setProfileMessage] = useState('');
  const [profileError, setProfileError] = useState('');

  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [savingProfile, setSavingProfile] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  const handleEditProfile = () => {
    setName(user?.name || '');
    setEmail(user?.email || '');
    setProfileMessage('');
    setProfileError('');
    setEditingProfile(true);
  };

  const handleCancelProfile = () => {
    setName(user?.name || '');
    setEmail(user?.email || '');
    setProfileMessage('');
    setProfileError('');
    setEditingProfile(false);
  };

  const handleSaveProfile = async () => {
    setProfileMessage('');
    setProfileError('');

    if (!name.trim()) {
      setProfileError('Name is required.');
      return;
    }

    if (!email.trim()) {
      setProfileError('Email is required.');
      return;
    }

    try {
      setSavingProfile(true);

      const updatedUser = await api.updateProfile({
        name: name.trim(),
        email: email.trim(),
      });

      updateUser(updatedUser);

      setProfileMessage('Profile updated successfully.');
      setEditingProfile(false);
    } catch (error) {
      setProfileError(
        error instanceof Error
          ? error.message
          : 'Unable to update profile.'
      );
    } finally {
      setSavingProfile(false);
    }
  };

  const handleChangePassword = async () => {
    setPasswordMessage('');
    setPasswordError('');

    if (!currentPassword) {
      setPasswordError('Please enter your current password.');
      return;
    }

    if (!newPassword) {
      setPasswordError('Please enter a new password.');
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError(
        'New password must be at least 6 characters.'
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }

    try {
      setChangingPassword(true);

      const result = await api.changePassword({
        current_password: currentPassword,
        new_password: newPassword,
      });

      setPasswordMessage(result.message);

      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      setPasswordError(
        error instanceof Error
          ? error.message
          : 'Unable to change password.'
      );
    } finally {
      setChangingPassword(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-6">

      {/* Profile */}
      <Card className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-slate-800">
              Profile Information
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Update your personal information.
            </p>
          </div>

          {!editingProfile && (
            <Button
              variant="outline"
              onClick={handleEditProfile}
            >
              <Edit3 className="w-4 h-4 mr-2" />
              Edit
            </Button>
          )}
        </div>

        {editingProfile ? (
          <div className="space-y-4">
            <Input
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {profileError && (
              <p className="text-sm text-rose-500">
                {profileError}
              </p>
            )}

            <div className="flex gap-3">
              <Button
                onClick={handleSaveProfile}
                disabled={savingProfile}
              >
                <Check className="w-4 h-4 mr-2" />
                {savingProfile ? 'Saving...' : 'Save Changes'}
              </Button>

              <Button
                variant="outline"
                onClick={handleCancelProfile}
                disabled={savingProfile}
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="text-xs text-slate-500 uppercase font-semibold">
                Name
              </label>

              <p className="text-slate-800 font-medium mt-1">
                {user?.name}
              </p>
            </div>

            <div>
              <label className="text-xs text-slate-500 uppercase font-semibold">
                Email
              </label>

              <p className="text-slate-800 font-medium mt-1">
                {user?.email}
              </p>
            </div>
          </div>
        )}

        {profileMessage && (
          <div className="rounded-lg bg-emerald-50 border border-emerald-100 px-4 py-3 text-sm text-emerald-700">
            {profileMessage}
          </div>
        )}
      </Card>

      {/* Password */}
      <Card className="space-y-5">
        <div>
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#ed6f9b]" />

            <h3 className="text-base font-semibold text-slate-800">
              Change Password
            </h3>
          </div>

          <p className="text-sm text-slate-500 mt-1">
            For your security, enter your current password before
            choosing a new one.
          </p>
        </div>

        <div className="space-y-4">
          <Input
            label="Current Password"
            type="password"
            value={currentPassword}
            onChange={(e) =>
              setCurrentPassword(e.target.value)
            }
          />

          <Input
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(e.target.value)
            }
          />

          <Input
            label="Confirm New Password"
            type="password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
          />

          {passwordError && (
            <p className="text-sm text-rose-500">
              {passwordError}
            </p>
          )}

          {passwordMessage && (
            <div className="rounded-lg bg-emerald-50 border border-emerald-100 px-4 py-3 text-sm text-emerald-700">
              {passwordMessage}
            </div>
          )}

          <Button
            onClick={handleChangePassword}
            disabled={changingPassword}
          >
            <Lock className="w-4 h-4 mr-2" />

            {changingPassword
              ? 'Changing Password...'
              : 'Change Password'}
          </Button>
        </div>
      </Card>

    </div>
  );
};