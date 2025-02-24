import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '../store/hooks';
import { apiRequest } from '../services';
import { selectAuth } from '../store/features/authSlice';

interface Profile {
  fullName: string;
  phoneNumber: string;
  company: string;
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface Errors {
  [key: string]: string;
}

const useProfileSettings = () => {
  const [originalProfile, setOriginalProfile] = useState<Profile | any>(null);
  const [profile, setProfile] = useState<Profile>({
    fullName: '',
    phoneNumber: '',
    company: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [isFormModified, setIsFormModified] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isVerifyPasswordLoading, setIsVerifyLoading] = useState(false);
  const [showNewPasswordFields, setShowNewPasswordFields] = useState(false);
  const [passwordVerificationError, setPasswordVerificationError] = useState('');

  const { auth: storedData } = useAppSelector(selectAuth);
  const dispatch = useDispatch();

  const verifyPassword = async (old_password: any) => {
    try {
      setIsVerifyLoading(true)
      const response = await apiRequest('/verifyPassword', {
        method: 'POST',
        headers: {
          revalidate: true,
          ...(storedData && { Authorization: `Bearer ${storedData.token}` }),
        },
        body: {
          current_password: old_password
        },
      });

      if (response?.is_correct === true) {
        setShowNewPasswordFields(true);
      } else {
        setPasswordVerificationError('Incorrect password, please try again.')
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setIsVerifyLoading(false);
    }
  };

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        const response = await apiRequest('/profile', {
          method: 'POST',
          headers: {
            revalidate: true,
            ...(storedData && { Authorization: `Bearer ${storedData.token}` }),
          },
          body: {},
        });

        if (response.user) {
          const userData = response.user;
          const profileData = {
            fullName: userData.name || '',
            phoneNumber: userData.phone_number || '',
            company: userData.company || '',
            email: userData.email || '',
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
          };
          setProfile(profileData);
          setOriginalProfile(profileData); // Save the original profile data
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [storedData]);

  // Compare profile with originalProfile to see if any field has changed
  useEffect(() => {
    if (originalProfile) {
      const isModified =
        profile?.fullName !== originalProfile.fullName ||
        profile?.phoneNumber !== originalProfile.phoneNumber ||
        profile?.company !== originalProfile.company;
      setIsFormModified(isModified);
    }
  }, [profile, originalProfile]);

  return {
    profile,
    setProfile,
    originalProfile,
    showPasswordFields,
    setShowPasswordFields,
    isFormModified,
    errors,
    setErrors,
    storedData,
    dispatch,
    isLoading,
    setIsLoading,
    verifyPassword,
    showNewPasswordFields,
    passwordVerificationError,
    setShowNewPasswordFields,
    setPasswordVerificationError,
    isVerifyPasswordLoading,
    
  };
};

export default useProfileSettings;
