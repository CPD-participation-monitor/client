export const errorMessages = {
    gettingProfile: "Error getting profile data",
    changingProfile: "Error changing profile data",
    noUser: "No user found",
    noSignedIn: "No user signed in",
    changingPassword: "Error changing password",
    changingImage: "Error changing image",
    addingStudent: "Error adding student",
    unexpected: "Unexpected error. Please try again later.",
    signOut: "Error signing out",
    signIn: "Error signing in",
    networkRequestFailed: "Network error. Please check your internet connection.",
    invalidCredential: "Invalid credentials.",
    weakPassword: "Password is weak. Please try again.",
    contactNo: "Please enter a valid 9 or 10-digit phone number",
    requiredAll: "Please fill in all required fields",
    profileNotFound: "Requested profile not found.",
  };
  
  export const successMessages = {
    profileChanged: "Profile changed successfully",
    passwordChanged: "Password changed successfully",
    imageChanged: "Profile image changed successfully",
    profileAdded: "Profile added successfully",
    invalidCredential: "Invalid email address or password.",
    profileNotFound: "Requested profile not found.",
  };
  
  export const errorCodes = {
    invalidEmail: "auth/invalid-email",
    networkRequestFailed: "auth/network-request-failed",
    invalidCredential: "auth/invalid-credential",
    missingPassword: "auth/missing-password",
    weakPassword: "auth/weak-password",
  };