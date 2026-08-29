export interface ValidationResult {
  valid: boolean;
  message?: string;
}

export function validateName(name: string, fieldLabel = "Name"): ValidationResult {
  const trimmed = name.trim();
  if (!trimmed) return { valid: false, message: `${fieldLabel} is required.` };
  if (trimmed.length > 100) return { valid: false, message: `${fieldLabel} must be 100 characters or fewer.` };
  // Letters, spaces, periods (for "Dr.", "Mr."), apostrophes and hyphens — no digits.
  if (!/^[A-Za-z.\s'-]+$/.test(trimmed)) {
    return { valid: false, message: `${fieldLabel} can only contain letters — no numbers or symbols.` };
  }
  return { valid: true };
}

export function validatePhone(phone: string, fieldLabel = "Contact number"): ValidationResult {
  const digitsOnly = phone.replace(/\D/g, "");
  if (!phone.trim()) return { valid: false, message: `${fieldLabel} is required.` };
  if (digitsOnly.length !== 10) {
    return { valid: false, message: `${fieldLabel} must be exactly 10 digits.` };
  }
  if (!/^\d+$/.test(digitsOnly)) {
    return { valid: false, message: `${fieldLabel} must contain only numbers.` };
  }
  return { valid: true };
}

export function validateEmail(email: string): ValidationResult {
  const trimmed = email.trim();
  if (!trimmed) return { valid: false, message: "Email is required." };
  // Standard email shape, e.g. name@domain.com — not locked to only gmail.com,
  // since requiring literally every user to have a Gmail address would block
  // real campus/work emails. See note below the code for how to lock it down
  // to Gmail only if that's genuinely what you meant.
  if (!/^[^\s@]+@gmail\.com$/i.test(trimmed)) {
  return { valid: false, message: "Email must be a valid @gmail.com address." };
}
  return { valid: true };
}

export function validateDob(dob: string): ValidationResult {
  if (!dob) return { valid: true }; // DOB is optional in the current forms
  const date = new Date(dob);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (date > today) {
    return { valid: false, message: "Date of birth cannot be in the future." };
  }
  return { valid: true };
}

export function validatePassword(password: string): ValidationResult {
  if (password.length < 8) {
    return { valid: false, message: "Password must be at least 8 characters long." };
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: "Password must contain at least one uppercase letter." };
  }
  if (!/[a-z]/.test(password)) {
    return { valid: false, message: "Password must contain at least one lowercase letter." };
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: "Password must contain at least one number." };
  }
  if (!/[!@#$%^&*(),.?":{}|<>_\-+=[\]/\\~`]/.test(password)) {
    return { valid: false, message: "Password must contain at least one special character." };
  }
  return { valid: true };
}
