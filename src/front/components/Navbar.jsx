import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { languageOptions, translations } from "../i18n";

export const Navbar = () => {
	const [isLanguageOpen, setIsLanguageOpen] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();
	const { store, dispatch } = useGlobalReducer();
	const currentLanguage = store.language || "es";
	const currentTheme = store.theme || "light";
	const copy = translations[currentLanguage].navbar;
	const currentOption =
		languageOptions.find((option) => option.code === currentLanguage) || languageOptions[0];

	const handleLanguageChange = (languageCode) => {
		dispatch({ type: "set_language", payload: languageCode });
		setIsLanguageOpen(false);
	};

	const handleThemeToggle = () => {
		dispatch({ type: "set_theme", payload: currentTheme === "dark" ? "light" : "dark" });
	};

	const handleContactClick = () => {
		if (location.pathname === "/") {
			document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
			return;
		}

		navigate("/#contact");
	};

	return (
		<nav className="navbar navbar-expand-lg px-4 py-3 geko-navbar">
			<div className="container-fluid px-0">
				<Link
					to="/"
					className="navbar-brand text-decoration-none d-flex align-items-center geko-navbar-brand"
					aria-label="Ir al inicio"
				>
					<span className="geko-brand-word">GEKO</span>
				</Link>

				<div className="d-flex align-items-center gap-3 ms-auto flex-wrap justify-content-end">
					<Link to="/about" className="btn btn-link text-decoration-none p-0 geko-nav-link">
						{copy.about}
					</Link>

					<button
						type="button"
						className="btn geko-pill-button geko-pill-button--primary"
						onClick={handleContactClick}
					>
						{copy.contact}
					</button>

					<div className="position-relative">
						<div className="d-flex align-items-center gap-2">
							<button
								type="button"
								className="btn geko-pill-button geko-theme-toggle"
								onClick={handleThemeToggle}
								aria-label={currentTheme === "dark" ? copy.lightMode : copy.darkMode}
								title={currentTheme === "dark" ? copy.lightMode : copy.darkMode}
							>
								<span className="geko-theme-toggle__icon" aria-hidden="true">
									<FontAwesomeIcon icon={currentTheme === "dark" ? faSun : faMoon} />
								</span>
							</button>
							<button
								type="button"
								className="btn geko-pill-button geko-language-button"
								onClick={() => setIsLanguageOpen((value) => !value)}
								aria-haspopup="true"
								aria-expanded={isLanguageOpen}
								aria-label={copy.language}
							>
								{currentOption.shortLabel}
							</button>
						</div>

						{isLanguageOpen && (
							<div className="position-absolute end-0 mt-2 rounded-4 p-2 geko-language-menu">
								{languageOptions.map((option) => (
									<button
										key={option.code}
										type="button"
										className={`btn w-100 text-start rounded-3 px-3 py-2 geko-language-option ${
											option.code === currentLanguage ? "is-active" : ""
										}`}
										onClick={() => handleLanguageChange(option.code)}
									>
										{option.shortLabel}
									</button>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
};
