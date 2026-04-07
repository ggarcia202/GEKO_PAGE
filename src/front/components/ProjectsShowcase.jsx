import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { projectShowcaseContent } from "./projectShowcaseContent";

export const ProjectsShowcase = ({ preview = false }) => {
	const { store } = useGlobalReducer();
	const currentLanguage = store.language || "es";
	const copy = projectShowcaseContent[currentLanguage] || projectShowcaseContent.es;
	const items = preview ? copy.items.slice(0, 3) : copy.items;

	return (
		<>
			<div className="row align-items-end mb-4 g-4">
				<div className="col-12 col-lg-7" data-reveal="up">
					<div className="geko-chip mb-3">{copy.label}</div>
					<h2 className="geko-subtitle mb-0">{copy.title}</h2>
				</div>
				<div className="col-12 col-lg-5" data-reveal="up" style={{ "--reveal-delay": "120ms" }}>
					<p className="geko-lead mb-0">{copy.description}</p>
				</div>
			</div>

			<div className="geko-projects-showcase" data-reveal="up" style={{ "--reveal-delay": "140ms" }}>
				<div className="geko-projects-showcase__intro">
					<div className="geko-projects-showcase__headline">
						<span>{copy.highlight}</span>
						<strong>{String(items.length).padStart(2, "0")}</strong>
					</div>
					<p className="mb-0">{copy.intro}</p>
					{preview && (
						<div className="geko-projects-showcase__actions">
							<Link to="/projects" className="btn geko-pill-button geko-pill-button--primary">
								{copy.viewAll}
							</Link>
						</div>
					)}
				</div>

				<div className="geko-projects-grid">
					{items.map((project, index) => (
						<article
							key={project.name}
							className={`geko-project-card ${index === 1 ? "is-featured" : ""} geko-scroll-panel`}
						>
							<div className="geko-project-card__topline">
								<span>{project.category}</span>
								<div className="geko-project-card__index">0{index + 1}</div>
							</div>
							<h3 className="geko-project-card__title">{project.name}</h3>
							<p className="geko-project-card__description">{project.description}</p>
							<div className="geko-project-card__result">
								<span>{copy.resultLabel}</span>
								<strong>{project.result}</strong>
							</div>
						</article>
					))}
				</div>
			</div>
		</>
	);
};
