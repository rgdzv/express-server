export const signUpSchema = {
    firstName: {
        trim: true,
        notEmpty: {
            errorMessage: 'FirstName cannot be empty!',
            bail: true
        },
        isLength: {
            options: { min: 3 },
            errorMessage: 'FirstName should be at least 3 characters!',
            bail: true
        }
    },
    lastName: {
        trim: true,
        notEmpty: {
            errorMessage: 'LastName cannot be empty!',
            bail: true
        },
        isLength: {
            options: { min: 3 },
            errorMessage: 'LastName should be at least 3 characters!',
            bail: true
        }
    },
    email: {
        trim: true,
        notEmpty: {
            errorMessage: 'Email cannot be empty!',
            bail: true
        },
        isEmail: {
            errorMessage: 'Invalid email!',
            bail: true
        },
        normalizeEmail: true
    },
    password: {
        trim: true,
        notEmpty: {
            errorMessage: 'Password cannot be empty!',
            bail: true
        },
        isStrongPassword: {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
            errorMessage:
                'Password must be greater than 8 characters and contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 symbol',
            bail: true
        }
    }
}
