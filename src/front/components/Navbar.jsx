import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav
			className="navbar navbar-expand-lg px-4 py-3"
			style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e7dcff" }}
		>
			<div className="container-fluid px-0">
				<Link
					to="/"
					className="navbar-brand fw-bold fs-3 text-decoration-none"
					style={{ color: "#5b2ca0" }}
					aria-label="Ir al inicio"
				>
					GEKO
				</Link>
				
				<button
						type="button"
						className="btn rounded-pill px-4 py-2 fw-semibold"
						style={{ border: "1px solid #5b2ca0", color: "#5b2ca0", backgroundColor: "#ffffff" }}
					>
						idioma
					</button>

				<div className="d-flex align-items-center gap-3 ms-auto">
					<button
						type="button"
						className="btn btn-link text-decoration-none fw-semibold p-0"
						style={{ color: "#3f2a63" }}
					>
						Acerca de nosotros
					</button>

					<button
						type="button"
						className="btn rounded-pill px-4 py-2 fw-semibold"
						style={{ backgroundColor: "#ff7a00", color: "#ffffff" }}
					>
						Contactanos
					</button>
				</div>
			</div>
		</nav>
	);
};
