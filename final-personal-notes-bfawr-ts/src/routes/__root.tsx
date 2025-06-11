import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Footer } from '../components/footer'

export const Route = createRootRoute({
    component: () => (
        <>
            <Outlet />
            <Footer />
            <TanStackRouterDevtools />
        </>
    ),
})
