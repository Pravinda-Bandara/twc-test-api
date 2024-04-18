// Function to validate email format and non-empty username, and non-empty password
export const validateUserInput = (userName: string, userPassword: string): string | null => {
    // Check if username is empty
    if (!userName) {
        return 'Username is required';
    }
    // Check if username is in email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userName)) {
        return 'Invalid email format';
    }

    // Check if password is empty
    if (!userPassword) {
        return 'Password is required';
    }

    // All validations passed
    return null;
};
