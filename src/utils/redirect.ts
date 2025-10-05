import { useRouter } from 'vue-router'

export const useRedirect = () => {
  const router = useRouter() // ✅ Get router once, inside composable setup

  const redirect = (url: string): void => {
    router.replace(url)
  }

  const redirectToLogin = (redirectPath: string): void => {
    router.push({ name: 'Login', query: { redirect: redirectPath } })
  }

  const redirectToHome = (): void => {
    router.push({ name: 'Home' })
  }

  return { redirect, redirectToLogin, redirectToHome }
}
