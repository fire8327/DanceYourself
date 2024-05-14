export default defineNuxtRouteMiddleware((to) => {
    const userStore = useUserStore()
    const authenticated = useCookie("authenticated")
    const role = useCookie("role")

    if(authenticated.value) {
        userStore.authenticated = true
    }

    if (authenticated.value && (to?.path === '/auth' || to?.path === '/reg')) {
        return navigateTo('/profile')
    }

    if (!authenticated.value && to?.path === '/profile') {
        return navigateTo('/auth')
    }

    /* if((!authenticated.value || role.value != 'admin') && to?.path === '/admin') {
        return navigateTo('/')
    } */
})