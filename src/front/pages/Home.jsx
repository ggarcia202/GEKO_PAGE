const services = [
	{
		title: "Branding",
		description: "Construimos identidades visuales y mensajes que hacen que tu marca se reconozca con claridad."
	},
	{
		title: "Social Media",
		description: "Disenamos contenido con criterio creativo para conectar con tu audiencia y fortalecer tu presencia."
	},
	{
		title: "Paid Ads",
		description: "Creamos campanas orientadas a resultados para atraer trafico cualificado y generar oportunidades."
	}
];

const strengths = [
	"Estrategia adaptada a cada negocio",
	"Creatividad orientada a conversion",
	"Comunicacion clara y coherente en todos los canales"
];

export const Home = () => {
	return (
		<div style={{ backgroundColor: "#fffdf8", color: "#22163a" }}>
			<section
				className="d-flex align-items-center"
				style={{
					minHeight: "calc(100vh - 88px)",
					background:
						"radial-gradient(circle at top left, #f5ecff 0%, #efe2ff 28%, #fff5ea 62%, #fffdf8 100%)"
				}}
			>
				<div className="container py-5">
					<div className="row align-items-center g-5">
						<div className="col-12 col-lg-7">
							<p
								className="text-uppercase fw-semibold mb-3"
								style={{ letterSpacing: "0.18em", color: "#ff7a00", fontSize: "0.8rem" }}
							>
								Geko Marketing Agency
							</p>
							<h1
								className="fw-bold lh-1 mb-4"
								style={{ fontSize: "clamp(3rem, 7vw, 6rem)", maxWidth: "13ch" }}
							>
								Hacemos crecer marcas con estrategia y creatividad.
							</h1>
							<p
								className="mb-4"
								style={{ fontSize: "1.12rem", maxWidth: "38rem", color: "#5f5575", lineHeight: "1.7" }}
							>
								Ayudamos a empresas y proyectos a destacar con una presencia digital
								mas solida, atractiva y enfocada en resultados reales.
							</p>
							<div className="d-flex flex-wrap gap-3">
								<button
									type="button"
									className="btn rounded-pill px-4 py-3 fw-semibold"
									style={{ backgroundColor: "#ff7a00", color: "#ffffff" }}
								>
									Contacto
								</button>
								<button
									type="button"
									className="btn rounded-pill px-4 py-3 fw-semibold"
									style={{ border: "1px solid #5b2ca0", color: "#5b2ca0", backgroundColor: "#ffffff" }}
								>
									Ver servicios
								</button>
							</div>
						</div>

						<div className="col-12 col-lg-5">
							<div
								className="rounded-5 p-4 p-lg-5"
								style={{
									background: "linear-gradient(155deg, #20112f 0%, #48206f 55%, #6d38b1 100%)",
									color: "#ffffff",
									boxShadow: "0 28px 60px rgba(91, 44, 160, 0.22)"
								}}
							>
								<p
									className="text-uppercase mb-3"
									style={{ letterSpacing: "0.15em", fontSize: "0.78rem", color: "#ffd1a8" }}
								>
									Presencia digital integral
								</p>
								<h2 className="fw-bold mb-3" style={{ fontSize: "2rem" }}>
									Estrategia, contenido y rendimiento.
								</h2>
								<p className="mb-0" style={{ color: "#ddd3f0", lineHeight: "1.7" }}>
									Reunimos las piezas clave para que tu marca comunique mejor, se vea
									mas profesional y aproveche cada oportunidad de crecimiento.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="py-5 py-lg-6" style={{ backgroundColor: "#ffffff" }}>
				<div className="container py-4 py-lg-5">
					<div className="row align-items-end mb-4">
						<div className="col-12 col-lg-7">
							<p
								className="text-uppercase fw-semibold mb-2"
								style={{ letterSpacing: "0.18em", color: "#ff7a00", fontSize: "0.8rem" }}
							>
								Servicios
							</p>
							<h2 className="fw-bold mb-0" style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)" }}>
								Las areas que impulsan tu marca.
							</h2>
						</div>
						<div className="col-12 col-lg-5 mt-3 mt-lg-0">
							<p className="mb-0" style={{ color: "#5f5575", lineHeight: "1.7" }}>
								Trabajamos con una mirada estrategica y creativa para que cada accion
								tenga una funcion clara dentro de tu crecimiento digital.
							</p>
						</div>
					</div>

					<div className="row g-4">
						{services.map((service, index) => (
							<div className="col-12 col-md-6 col-xl-4" key={service.title}>
								<div
									className="h-100 rounded-5 p-4 p-lg-5"
									style={{
										backgroundColor: index === 1 ? "#fff0e3" : "#f6f1ff",
										border: "1px solid #e7dcff"
									}}
								>
									<div
										className="mb-4 d-inline-flex align-items-center justify-content-center rounded-circle fw-bold"
										style={{
											width: "52px",
											height: "52px",
											backgroundColor: index === 1 ? "#ff7a00" : "#5b2ca0",
											color: "#ffffff"
										}}
									>
										0{index + 1}
									</div>
									<h3 className="fw-bold mb-3" style={{ fontSize: "1.5rem" }}>
										{service.title}
									</h3>
									<p className="mb-0" style={{ color: "#5f5575", lineHeight: "1.7" }}>
										{service.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="py-5 py-lg-6">
				<div className="container py-4 py-lg-5">
					<div className="row g-5 align-items-center">
						<div className="col-12 col-lg-6">
							<p
								className="text-uppercase fw-semibold mb-2"
								style={{ letterSpacing: "0.18em", color: "#ff7a00", fontSize: "0.8rem" }}
							>
								Acerca de nosotros
							</p>
							<h2 className="fw-bold mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3.3rem)" }}>
								Una agencia que mezcla criterio, diseno y objetivos de negocio.
							</h2>
							<p className="mb-4" style={{ color: "#5f5575", lineHeight: "1.8" }}>
								En GEKO trabajamos con marcas que quieren verse mejor, comunicar con
								mas coherencia y crecer con una estrategia pensada a largo plazo.
								Cada propuesta nace desde la combinacion entre identidad, contenido y accion.
							</p>
							<div className="d-grid gap-3">
								{strengths.map((item) => (
									<div
										key={item}
										className="rounded-4 px-4 py-3"
										style={{ backgroundColor: "#ffffff", border: "1px solid #e7dcff" }}
									>
										<span className="fw-semibold">{item}</span>
									</div>
								))}
							</div>
						</div>

						<div className="col-12 col-lg-6">
							<div
								className="rounded-5 p-4 p-lg-5 h-100"
								style={{
									background: "linear-gradient(160deg, #3f1d72 0%, #6d38b1 100%)",
									color: "#ffffff"
								}}
							>
								<div
									className="rounded-5 mb-4"
									style={{
										height: "260px",
										background:
											"linear-gradient(135deg, rgba(255,122,0,0.95) 0%, rgba(243,237,255,0.4) 100%)"
									}}
								/>
								<h3 className="fw-bold mb-3" style={{ fontSize: "1.7rem" }}>
									Pensamos marcas para destacar de verdad.
								</h3>
								<p className="mb-0" style={{ color: "#dddddd", lineHeight: "1.7" }}>
									Nuestro enfoque combina una direccion visual cuidada con decisiones
									estrategicas que ayudan a que cada pieza tenga mas valor y mas impacto.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="py-5 py-lg-6" style={{ backgroundColor: "#2f1458", color: "#ffffff" }}>
				<div className="container py-4 py-lg-5 text-center">
					<p
						className="text-uppercase fw-semibold mb-2"
						style={{ letterSpacing: "0.18em", color: "#ffb066", fontSize: "0.8rem" }}
					>
						Empecemos
					</p>
					<h2 className="fw-bold mb-3" style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)" }}>
						Cuentanos tu proyecto y construimos algo potente.
					</h2>
					<p
						className="mx-auto mb-4"
						style={{ maxWidth: "42rem", color: "#e5dbf7", lineHeight: "1.7" }}
					>
						Si quieres una web, una marca mas solida o una estrategia digital con mas
						intencion, podemos ayudarte a darle forma.
					</p>
					<button
						type="button"
						className="btn rounded-pill px-5 py-3 fw-semibold"
						style={{ backgroundColor: "#ff7a00", color: "#ffffff" }}
					>
						Contacto
					</button>
				</div>
			</section>
		</div>
	);
};
