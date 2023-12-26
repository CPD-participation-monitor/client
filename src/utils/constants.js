export const ErrorMessages = {
  FAILED_TO_RETRIEVE_PROFILE: "Error occurred while retrieving profile data.",
  FAILED_TO_CHANGE_PROFILE: "Error occurred while updating profile data.",
  USER_NOT_FOUND: "User not found.",
  NO_USER_SIGNED_IN: "No user is currently signed in.",
  FAILED_TO_CHANGE_PASSWORD: "Error occurred while changing the password.",
  FAILED_TO_CHANGE_IMAGE: "Error occurred while updating the profile image.",
  UNEXPECTED_ERROR: "An unexpected error occurred. Please try again later.",
  FAILED_TO_SIGN_OUT: "Error occurred while signing out.",
  FAILED_TO_SIGN_IN: "Error occurred while signing in.",
  NETWORK_REQUEST_FAILED: "Network error. Please check your internet connection.",
  INVALID_CREDENTIALS: "Invalid credentials.",
  WEAK_PASSWORD: "Password is weak. Please try again with a stronger password.",
  INVALID_CONTACT_NUMBER: "Please enter a valid 9 or 10-digit phone number.",
  REQUIRED_FIELDS_MISSING: "Please fill in all required fields.",
  PROFILE_NOT_FOUND: "Requested profile not found.",
  ALL_FIELDS_REQUIRED: "Please fill in all required fields.",
};

export const SuccessMessages = {
  PROFILE_CHANGED_SUCCESSFULLY: "Profile updated successfully.",
  PASSWORD_CHANGED_SUCCESSFULLY: "Password changed successfully.",
  IMAGE_CHANGED_SUCCESSFULLY: "Profile image updated successfully.",
  PROFILE_ADDED_SUCCESSFULLY: "Profile added successfully.",
  SIGNED_OUT_SUCCESSFULLY: "Signed out successfully.",
  SIGNED_IN_SUCCESSFULLY: "Signed in successfully.",
  SIGNED_UP_SUCCESSFULLY: "Signed up successfully.",
};

export const ErrorCodes = {
  INVALID_EMAIL: "auth/invalid-email",
  NETWORK_REQUEST_FAILED: "auth/network-request-failed",
  INVALID_CREDENTIALS: "auth/invalid-credential",
  MISSING_PASSWORD: "auth/missing-password",
  WEAK_PASSWORD: "auth/weak-password",
};

export const roles = {
  ENG: 2044,
  ADMIN: 1344,
  ORG_ADMIN: 6445,
  ORG_SUPER_ADMIN: 3112,
  SYSTEM_ADMIN: 1580
}