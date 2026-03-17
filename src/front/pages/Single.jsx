import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { translations } from "../i18n";

export const Single = props => {
	const { store } = useGlobalReducer();
	const { theId } = useParams();
	const singleTodo = store.todos.find((todo) => todo.id === parseInt(theId));
	const copy = translations[store.language || "es"].single;

	return (
		<div className="page-shell">
			<section className="geko-section geko-single">
				<div className="container">
					<div className="geko-glass-card geko-single-card">
						<div className="geko-chip mb-4 mx-auto" style={{ width: "fit-content" }}>
							{copy.titlePrefix}
						</div>
						<h1 className="geko-title mb-0">{singleTodo?.title}</h1>
						<hr className="geko-divider" />
						<div className="d-flex justify-content-center">
							<Link to="/" className="text-decoration-none">
								<span className="btn geko-pill-button geko-pill-button--primary" role="button">
									{copy.backHome}
								</span>
							</Link>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

Single.propTypes = {
	match: PropTypes.object
};
