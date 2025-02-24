import { z } from 'zod'
import { Errors, Profile } from '../types';

export const FormDataSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  country: z.string().min(1, 'Country is required'),
  street: z.string().min(1, 'Street is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zip: z.string().min(1, 'Zip is required')
})

//for register
export const RegisterFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().refine((value) => {
    // Custom email validation logic
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(value);
  }, "Invalid email address"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
  confirmPassword: z.string()
});


//offer
export const OfferedFormSchema = z.object({
  // price: z.number().positive('Price must be greater than 0'),
});


//client portal settings components

  // Validation function for real-time validation
  export const validateField = (field: keyof Profile, value: string, setErrors?:any, errors?:any, showPasswordFields?:any, profile?:any) => {
    let fieldErrors: Errors = { ...errors };

    if (field === 'fullName') {
      if (!/^[A-Za-z\s]+$/.test(value)) {
        fieldErrors.fullName = 'Full name should contain only alphabets.';
      } else if (value?.length > 40) {
        fieldErrors.fullName = "Full name can't exceed 40 characters.";
      } else {
        delete fieldErrors.fullName;
      }
    }

    if (field === 'phoneNumber') {
      if (!/^\d+$/.test(value)) {
        fieldErrors.phoneNumber = 'Phone number should contain only numbers.';
      } else if (value?.length > 15) {
        fieldErrors.phoneNumber = "Phone number can't exceed 15 digits.";
      } else {
        delete fieldErrors.phoneNumber;
      }
    }

    if (field === 'company') {
      if (!value?.trim()) {
        fieldErrors.company = 'Company name cannot be empty.';
      } else if (value.length > 40) {
        fieldErrors.company = "Company name can't exceed 40 characters.";
      } else {
        delete fieldErrors.company;
      }
    }

    // Updated Password Validation Logic
    if (showPasswordFields && (field === 'newPassword' || field === 'confirmPassword')) {
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

      // Validate new password format
      if (!passwordRegex.test(profile.newPassword)) {
        fieldErrors.newPassword = "Password must have at least 1 uppercase letter, 1 number, and 1 special character.";
      } else {
        // Clear new password errors once it meets requirements
        delete fieldErrors.newPassword;

        // Check if confirm password matches new password
        if (profile.newPassword !== profile.confirmPassword) {
          fieldErrors.confirmPassword = 'Passwords do not match.';
        } else {
          // If confirm password matches, clear the confirm password error
          delete fieldErrors.confirmPassword;
        }
      }
    }

    setErrors?.(fieldErrors);
  };

  export const validateAllField = (profile?:any, showPasswordFields?:any, errors = {}) => {
    // Validate individual fields
    validateField('fullName', profile?.fullName);
    validateField('phoneNumber', profile?.phoneNumber);
    validateField('company', profile?.company);
  
    // If password fields should be shown, validate them as well
    if (showPasswordFields) {
      validateField('newPassword', profile?.newPassword || '');
      validateField('confirmPassword', profile?.confirmPassword || '');
    }
  
    // Ensure errors is an object and check the number of error keys
    return Object.keys(errors).length === 0;
  };
  
  export const getErrorMessage = (error: string | null) => {
    switch (error) {
        case 'User not found':
            return 'Email is incorrect, user not found with this email';
        case 'Password mismatch':
            return 'Your password is wrong';
        default:
            return error;  // Return the error itself if no case matches
    }
  };

