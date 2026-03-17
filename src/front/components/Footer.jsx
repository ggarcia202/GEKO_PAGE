import { Link } from "react-router-dom";

const socialLinks = [
	{
		name: "Instagram",
		href: "#",
		icon: (
			<svg viewBox="0 0 24 24" aria-hidden="true">
				<path
					fill="currentColor"
					d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 1.8A3.7 3.7 0 0 0 3.8 7.5v9a3.7 3.7 0 0 0 3.7 3.7h9a3.7 3.7 0 0 0 3.7-3.7v-9a3.7 3.7 0 0 0-3.7-3.7h-9Zm9.75 1.35a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1ZM12 6.8A5.2 5.2 0 1 1 6.8 12 5.2 5.2 0 0 1 12 6.8Zm0 1.8A3.4 3.4 0 1 0 15.4 12 3.4 3.4 0 0 0 12 8.6Z"
				/>
			</svg>
		)
	},
	{
		name: "X",
		href: "#",
		icon: (
			<svg viewBox="0 0 24 24" aria-hidden="true">
				<path
					fill="currentColor"
					d="M18.9 3H21l-6.86 7.84L22.2 21h-6.3l-4.93-6.43L5.35 21H3.24l7.34-8.39L1.8 3h6.46l4.45 5.86L18.9 3Zm-1.1 16.1h1.16L7.63 4.84H6.38L17.8 19.1Z"
				/>
			</svg>
		)
	},
	{
		name: "LinkedIn",
		href: "#",
		icon: (
			<svg viewBox="0 0 24 24" aria-hidden="true">
				<path
					fill="currentColor"
					d="M6.94 8.5H3.56V21h3.38V8.5ZM5.25 3A2.01 2.01 0 1 0 7.26 5 2 2 0 0 0 5.25 3Zm15.19 10.22c0-3.05-1.63-4.72-4.27-4.72a3.73 3.73 0 0 0-3.36 1.85V8.5H9.44c.04 1.22 0 12.5 0 12.5h3.37v-6.98c0-.37.03-.74.14-1a2.2 2.2 0 0 1 2.06-1.47c1.45 0 2.03 1.1 2.03 2.72V21h3.4Z"
				/>
			</svg>
		)
	}
];

export const Footer = () => (
	<footer className="geko-footer">
		<div className="container">
			<div className="row g-4 align-items-start">
				<div className="col-12 col-lg-5">
					<div className="geko-footer-word mb-2"></div>
					<p className="mb-3" style={{ color: "rgba(255,255,255,0.66)", maxWidth: "32rem" }}>
					
					</p>
				</div>
				<div className="col-12 col-md-6 col-lg-4">
					<p className="geko-footer-heading mb-3">Redes sociales</p>
					<div className="d-flex align-items-center gap-3 flex-wrap">
						{socialLinks.map((item) => (
							<a
								key={item.name}
								href={item.href}
								target="_blank"
								rel="noreferrer"
								aria-label={item.name}
								className="geko-social-link"
							>
								{item.icon}
							</a>
						))}
					</div>
				</div>
			</div>

			<div className="row mt-4">
				<div className="col-12">
					<p className="mb-0 geko-footer-legal text-center">
						Este sitio web tiene caracter informativo. El acceso y uso del contenido implica la
						aceptacion de las condiciones generales, la politica de privacidad y la normativa aplicable en
						materia de propiedad intelectual y proteccion de datos.
					</p>
				</div>
			</div>
		</div>
	</footer>
);
