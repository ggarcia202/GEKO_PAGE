import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { AIChatWidget } from "../components/AIChatWidget"
import useGlobalReducer from "../hooks/useGlobalReducer"

// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const Layout = () => {
    const { store } = useGlobalReducer()
    const currentTheme = store.theme || "light"
    const currentLanguage = store.language || "es"

    useEffect(() => {
        document.documentElement.dataset.theme = currentTheme
        document.body.dataset.theme = currentTheme
        document.documentElement.lang = currentLanguage
    }, [currentTheme, currentLanguage])

    return (
        <ScrollToTop>
            <div className="d-flex flex-column min-vh-100" data-theme={currentTheme}>
                <Navbar />
                <main className="flex-grow-1">
                    <Outlet />
                </main>
                <Footer />
                <AIChatWidget />
            </div>
        </ScrollToTop>
    )
}
