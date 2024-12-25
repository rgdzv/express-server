export const signInSchema = {
    email: {
        trim: true,
        notEmpty: {
            errorMessage: 'Email cannot be empty!',
            bail: true
        }
    },
    password: {
        trim: true,
        notEmpty: {
            errorMessage: 'Password cannot be empty!',
            bail: true
        }
    }
}
