export const useFormUtils = () => {
    const required = (v: string) => {
        return !!v || 'Field is required'
    }

    return { required }
}