import useGlobalReducer from "../hooks/useGlobalReducer";
import { translations } from "../i18n";

export const About = () => {
	const { store } = useGlobalReducer();
	const copy = translations[store.language || "es"].about;

	return (
		<div className="page-shell">
			<section className="geko-section">
				<div className="container">
					<div className="row g-5 align-items-center">
						<div className="col-12 col-lg-7">
							<div className="geko-chip mb-4">{copy.heroLabel}</div>
							<h1 className="geko-title" style={{ maxWidth: "11ch" }}>
								{copy.heroTitle}
							</h1>
							<p className="geko-lead mb-0" style={{ maxWidth: "42rem" }}>
								{copy.heroDescription}
							</p>
						</div>

						<div className="col-12 col-lg-5">
							<div className="geko-dark-card h-100">
								<div className="geko-chip mb-3" style={{ background: "var(--geko-dark-chip-bg)", color: "var(--geko-dark-chip-text)" }}>
									{copy.visionLabel}
								</div>
								<h2 className="geko-subtitle mb-3" style={{ color: "var(--geko-dark-title)", fontSize: "2.2rem" }}>
									{copy.visionTitle}
								</h2>
								<p className="mb-0" style={{ color: "var(--geko-dark-copy)", lineHeight: "1.8" }}>
									{copy.visionDescription}
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="geko-section">
				<div className="container">
					<div className="row g-5 align-items-center">
						<div className="col-12 col-lg-6">
							<div className="geko-chip mb-3">{copy.whoLabel}</div>
							<h2 className="geko-subtitle mb-4">{copy.whoTitle}</h2>
							<p className="geko-lead mb-4">{copy.whoDescription}</p>
							<div className="geko-highlight-list">
								{copy.principles.map((item) => (
									<div key={item} className="geko-highlight-item">
										<span className="fw-semibold">{item}</span>
									</div>
								))}
							</div>
						</div>

						<div className="col-12 col-lg-6">
							<div className="geko-soft-card">
								<div className="geko-metric-grid mb-3">
									<div className="geko-metric">
										<div className="geko-metric-value">360</div>
										<p className="mb-0 small" style={{ color: "var(--geko-metric-copy-color)" }}>
											{copy.fullVision}
										</p>
									</div>
									<div className="geko-metric">
										<div className="geko-metric-value" style={{ color: "var(--geko-accent-strong)" }}>
											1
										</div>
										<p className="mb-0 small" style={{ color: "var(--geko-metric-copy-color)" }}>
											{copy.consistentLanguage}
										</p>
									</div>
								</div>
								<div className="geko-dark-card" style={{ boxShadow: "none" }}>
									<div className="geko-chip mb-3" style={{ background: "var(--geko-dark-chip-bg)", color: "var(--geko-dark-chip-text)" }}>
										{copy.approachLabel}
									</div>
									<p className="mb-0" style={{ color: "var(--geko-dark-copy)", lineHeight: "1.8" }}>
										{copy.approachDescription}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="geko-section">
				<div className="container">
					<div className="row align-items-end mb-4 g-4">
						<div className="col-12 col-lg-7">
							<div className="geko-chip mb-3">{copy.workLabel}</div>
							<h2 className="geko-subtitle mb-0">{copy.workTitle}</h2>
						</div>
						<div className="col-12 col-lg-5">
							<p className="geko-lead mb-0">{copy.workDescription}</p>
						</div>
					</div>

					<div className="row g-4">
						{copy.pillars.map((pillar, index) => (
							<div className="col-12 col-lg-4" key={pillar.title}>
								<div className={`geko-grid-card ${index === 1 ? "is-warm" : "is-cool"}`}>
									<div
										className="geko-index-badge"
										style={{ background: index === 1 ? "var(--geko-badge-warm)" : "var(--geko-badge-cool)" }}
									>
										0{index + 1}
									</div>
									<h3 className="mb-3" style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: "2rem" }}>
										{pillar.title}
									</h3>
									<p className="mb-0 geko-lead" style={{ fontSize: "1rem" }}>
										{pillar.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="geko-section">
				<div className="container">
					<div className="geko-dark-card text-center">
						<div className="geko-chip mb-3 mx-auto" style={{ width: "fit-content", background: "var(--geko-dark-chip-bg)", color: "var(--geko-dark-chip-text)" }}>
							{copy.talkLabel}
						</div>
						<h2 className="geko-subtitle mb-3" style={{ color: "var(--geko-dark-title)", maxWidth: "15ch", marginInline: "auto" }}>
							{copy.talkTitle}
						</h2>
						<p className="mb-4 mx-auto" style={{ maxWidth: "42rem", color: "var(--geko-dark-copy-soft)", lineHeight: "1.8" }}>
							{copy.talkDescription}
						</p>
						<div className="d-flex justify-content-center">
							<button type="button" className="btn geko-pill-button geko-pill-button--primary">
								{copy.contact}
							</button>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};
