export const ErrorMessages = {
  FailedToRetrieveProfile: "Error occurred while retrieving profile data.",
  FailedToChangeProfile: "Error occurred while updating profile data.",
  UserNotFound: "User not found.",
  NoUserSignedIn: "No user is currently signed in.",
  FailedToChangePassword: "Error occurred while changing the password.",
  FailedToChangeImage: "Error occurred while updating the profile image.",
  FailedToAddStudent: "Error occurred while adding a student.",
  UnexpectedError: "An unexpected error occurred. Please try again later.",
  FailedToSignOut: "Error occurred while signing out.",
  FailedToSignIn: "Error occurred while signing in.",
  NetworkRequestFailed: "Network error. Please check your internet connection.",
  InvalidCredentials: "Invalid credentials.",
  WeakPassword: "Password is weak. Please try again with a stronger password.",
  InvalidContactNumber: "Please enter a valid 9 or 10-digit phone number.",
  RequiredFieldsMissing: "Please fill in all required fields.",
  ProfileNotFound: "Requested profile not found.",
};

export const SuccessMessages = {
  ProfileChangedSuccessfully: "Profile updated successfully.",
  PasswordChangedSuccessfully: "Password changed successfully.",
  ImageChangedSuccessfully: "Profile image updated successfully.",
  ProfileAddedSuccessfully: "Profile added successfully.",
  InvalidCredentials: "Invalid email address or password.",
  ProfileNotFound: "Requested profile not found.",
};

export const ErrorCodes = {
  InvalidEmail: "auth/invalid-email",
  NetworkRequestFailed: "auth/network-request-failed",
  InvalidCredentials: "auth/invalid-credential",
  MissingPassword: "auth/missing-password",
  WeakPassword: "auth/weak-password",
};

export const roles = {
  eng: 2044,
  orgAdmin: 6445,
  orgSuperAdmin: 3112,
  admin: 1344
}