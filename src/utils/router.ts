import { useRouter, type NavigationFailure } from 'vue-router'

export const useRouterUtil = () => {
  const router = useRouter() // ✅ Get router once, inside composable setup

  // TODO: commented below two methods as currently no change from router push and replace

  // const push = (url: string | RouteLocationAsPathGeneric | RouteLocationAsRelativeGeneric): Promise<NavigationFailure | void | undefined> => {
  //   return router.push(url)
  // }

  // const replace = (url: string | RouteLocationAsPathGeneric | RouteLocationAsRelativeGeneric): Promise<NavigationFailure | void | undefined> => {
  //   return router.replace(url)
  // }

  const redirectToLogin = (redirectPath: string): Promise<NavigationFailure | void | undefined> => {
    return router.replace({ name: 'Login', query: { redirect: redirectPath } })
  }

  const redirectToHome = (): Promise<NavigationFailure | void | undefined> => {
    return router.push({ name: 'Home' })
  }

  return { push: router.push, replace: router.replace, redirectToLogin, redirectToHome }
}
