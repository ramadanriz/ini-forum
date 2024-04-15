import { createBrowserRouter } from "react-router-dom"
import BaseLayout from "../layouts/BaseLayout"
import ErrorPage from '../pages/ErrorPage'
import ThreadsPage from '../pages/ThreadsPage'
import ThreadPage from "../pages/ThreadPage"
import LeaderboardsPage from "../pages/LeaderboardsPage"
import LoginPage from "../pages/LoginPage"
import RegisterPage from "../pages/RegisterPage"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <BaseLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <ThreadsPage />,
            },
            {
                path: "/thread/:id",
                element: <ThreadPage />
            },
            {
                path: "/leaderboards",
                element: <LeaderboardsPage />
            },
            {
                path: "/login",
                element: <LoginPage />
            },
            {
                path: "/register",
                element: <RegisterPage />
            }
        ]
    }
])