// Function to validate email format and non-empty username, and non-empty password
export const validateUserInput = (userName: string, userPassword: string): string | null => {

    if (!userName) {
        return 'Username is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userName)) {
        return 'Invalid email format';
    }


    if (!userPassword) {
        return 'Password is required';
    }

    return null;
};
