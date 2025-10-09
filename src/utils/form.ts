export const useFormUtils = () => {
    const required = (v: string) => {
        if (typeof (v) === 'number')
            return !!v || v === 0 || 'Field is required'
        return !!v || 'Field is required'
    }

    const passwordRules = () => [
        (v: string) => !!v || 'Password is required',
        (v: string) => v.length >= 8 || 'Password must be at least 8 characters',
        (v: string) => /[A-Z]/.test(v) || 'Must contain an uppercase letter',
        (v: string) => /[a-z]/.test(v) || 'Must contain a lowercase letter',
        (v: string) => /[0-9]/.test(v) || 'Must contain a number',
        (v: string) => /[^A-Za-z0-9]/.test(v) || 'Must contain a special character'
    ]

    const confirmPasswordRules = (password: string) => [
        (v: string) => !!v || 'Password is required',
        (v: string) => !!v || 'Please confirm your password',
        (v: string) => v === password || 'Passwords must match'
    ]

    const emailRules = () => [
        (v: string) => !!v || 'Email is required',
        (v: string) => /.+@.+\..+/.test(v) || 'Email must be valid',
    ]

    const phoneRules = () => [
        (v: string | number) => {
            if (typeof (v) === 'number')
                return !!v || v === 0 || 'Field is required'
            return !!v || 'Phone number is required'
        },
        (v: string) => /^\d{10}$/.test(v) || 'Enter a valid 10-digit phone number',
    ]

    const dobRules = () => [
        (v: string) => !!v || 'Date of birth is required',
        (v: string) => {
            const birthDate = new Date(v)
            if (isNaN(birthDate.getTime())) return 'Invalid date'

            const today = new Date()
            const age =
                today.getFullYear() -
                birthDate.getFullYear() -
                (today < new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate()) ? 1 : 0)

            return age >= 18 || 'You must be at least 18 years old'
        },
    ]

    return { required, passwordRules, confirmPasswordRules, emailRules, phoneRules, dobRules }
}