import { useLocation } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { translations } from "../i18n";
import PillNav from "./PillNav";

export const Navbar = () => {
	const location = useLocation();
	const { store } = useGlobalReducer();
	const currentLanguage = store.language || "es";
	const currentTheme = store.theme || "light";
	const copy = translations[currentLanguage].navbar;
	const navItems = [
		{ label: copy.about, href: "/about" },
		{ label: copy.projects, href: "/projects" },
		{ label: copy.contact, href: "/#contact" }
	];

	return (
		<nav className="navbar px-4 py-3 geko-navbar">
			<div className="container-fluid px-0 geko-navbar-shell">
				<PillNav
					logoText="GEKO"
					items={navItems}
					activeHref={location.pathname}
					baseColor={currentTheme === "dark" ? "#ffd8b4" : "#ffffff"}
					pillColor={currentTheme === "dark" ? "#f6efff" : "#160f24"}
					hoveredPillTextColor="#160f24"
					pillTextColor={currentTheme === "dark" ? "#160f24" : "#ffffff"}
				/>
			</div>
		</nav>
	);
};
