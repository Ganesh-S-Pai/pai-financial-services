import { useRouter } from 'vue-router'

export const useRedirect = () => {
    const redirect = (url: string): void => {
        const router = useRouter()
        router.replace(url)
    }

    const redirectToLogin = (redirectPath: string): void => {
        const router = useRouter()
        router.push({ name: 'Login', query: { redirect: redirectPath } })
    }

    const redirectToHome = (): void => {
        const router = useRouter()
        router.push({ name: 'Home' })
    }

    return { redirect, redirectToLogin, redirectToHome }
}