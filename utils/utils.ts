export function hideOnPublicRoute(path: string){
    const defaultRoute = path.length == 1
    const hideOnRoutes = ["/signin", "/signup", "/auth"];
    const isOnHideRoutes =  hideOnRoutes.some(route => path.startsWith(route))
    if(defaultRoute) return true
    return isOnHideRoutes
}