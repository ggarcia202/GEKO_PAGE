import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { ProjectsShowcase } from "../components/ProjectsShowcase";
import { translations } from "../i18n";

export const Projects = () => {
	const { store } = useGlobalReducer();
	const navigate = useNavigate();
	const currentLanguage = store.language || "es";
	const copy = translations[currentLanguage].projects;

	return (
		<div className="page-shell">
			<section className="geko-section">
				<div className="container">
					<div className="row g-5 align-items-center">
						<div className="col-12 col-lg-7">
							<div className="geko-chip mb-4">{copy.heroLabel}</div>
							<h1 className="geko-title" style={{ maxWidth: "12ch" }}>
								{copy.heroTitle}
							</h1>
							<p className="geko-lead mb-0" style={{ maxWidth: "44rem" }}>
								{copy.heroDescription}
							</p>
						</div>

						<div className="col-12 col-lg-5">
							<div className="geko-dark-card h-100">
								<div
									className="geko-chip mb-3"
									style={{ background: "var(--geko-dark-chip-bg)", color: "var(--geko-dark-chip-text)" }}
								>
									{copy.sideLabel}
								</div>
								<h2
									className="geko-subtitle mb-3"
									style={{ color: "var(--geko-dark-title)", fontSize: "2.2rem" }}
								>
									{copy.sideTitle}
								</h2>
								<p className="mb-0" style={{ color: "var(--geko-dark-copy)", lineHeight: "1.8" }}>
									{copy.sideDescription}
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="geko-section">
				<div className="container">
					<ProjectsShowcase />
				</div>
			</section>

			<section className="geko-section">
				<div className="container">
					<div className="geko-dark-card text-center">
						<div
							className="geko-chip mb-3 mx-auto"
							style={{ width: "fit-content", background: "var(--geko-dark-chip-bg)", color: "var(--geko-dark-chip-text)" }}
						>
							{copy.ctaLabel}
						</div>
						<h2
							className="geko-subtitle mb-3"
							style={{ color: "var(--geko-dark-title)", maxWidth: "15ch", marginInline: "auto" }}
						>
							{copy.ctaTitle}
						</h2>
						<p
							className="mb-4 mx-auto"
							style={{ maxWidth: "42rem", color: "var(--geko-dark-copy-soft)", lineHeight: "1.8" }}
						>
							{copy.ctaDescription}
						</p>
						<div className="d-flex justify-content-center">
							<button
								type="button"
								className="btn geko-pill-button geko-pill-button--primary"
								onClick={() => navigate("/#contact")}
							>
								{copy.ctaButton}
							</button>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};
