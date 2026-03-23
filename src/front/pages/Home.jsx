import useGlobalReducer from "../hooks/useGlobalReducer";
import { translations } from "../i18n";
import Stepper, { Step } from "../components/Stepper";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const serviceStepContent = {
	es: [
		{
			eyebrow: "Step 1",
			title: "Branding con identidad y criterio",
			description:
				"Trabajamos la base de la marca para que tenga una presencia reconocible, coherente y lista para crecer con una direccion visual clara.",
			listTitle: "Que incluye",
			items: [
				"Definicion de tono, estilo visual y personalidad de marca.",
				"Construccion de una identidad consistente para web, redes y presentaciones.",
				"Direccion creativa para que cada pieza comunique con mas fuerza."
			],
			metricTitle: "Impacto",
			metricValue: "01",
			metricCopy: "Una marca bien construida transmite mas confianza y hace que todo lo demas funcione mejor."
		},
		{
			eyebrow: "Step 2",
			title: "Social Media pensado para conectar",
			description:
				"Disenamos contenido y narrativa para que tus redes no sean solo bonitas, sino una extension real de la marca y una herramienta de atraccion.",
			listTitle: "Que incluye",
			items: [
				"Estrategia de contenido alineada con tus objetivos y tu audiencia.",
				"Lineas visuales y copies adaptados a cada formato y canal.",
				"Planificacion de publicaciones con criterio creativo y comercial."
			],
			metricTitle: "Impacto",
			metricValue: "02",
			metricCopy: "Las redes sociales bien trabajadas mejoran percepcion, comunidad y oportunidades de venta."
		},
		{
			eyebrow: "Step 3",
			title: "Paid Ads enfocado en resultados",
			description:
				"Creamos campanas con una base estrategica para que la inversion publicitaria atraiga trafico cualificado y apoye el crecimiento del negocio.",
			listTitle: "Que incluye",
			items: [
				"Creatividades y mensajes orientados a conversion.",
				"Segmentacion y planteamiento de campanas segun objetivo.",
				"Optimizacion progresiva para mejorar rendimiento y retorno."
			],
			metricTitle: "Impacto",
			metricValue: "03",
			metricCopy: "La publicidad deja de ser gasto cuando cada anuncio forma parte de una estrategia mejor pensada."
		}
	],
	en: [
		{
			eyebrow: "Step 1",
			title: "Branding with identity and intent",
			description:
				"We build the brand foundation so it feels recognizable, coherent and ready to grow with a clear visual direction.",
			listTitle: "What is included",
			items: [
				"Definition of tone, visual style and brand personality.",
				"Consistent identity for web, social channels and presentations.",
				"Creative direction so every piece communicates with more strength."
			],
			metricTitle: "Impact",
			metricValue: "01",
			metricCopy: "A well-built brand creates trust and makes every next move work better."
		},
		{
			eyebrow: "Step 2",
			title: "Social Media designed to connect",
			description:
				"We shape content and narrative so your social presence is not only attractive, but a real extension of the brand.",
			listTitle: "What is included",
			items: [
				"Content strategy aligned with your goals and audience.",
				"Visual lines and copy adapted to each format and channel.",
				"Publishing planning with creative and commercial intent."
			],
			metricTitle: "Impact",
			metricValue: "02",
			metricCopy: "Strong social media improves perception, community and sales opportunities."
		},
		{
			eyebrow: "Step 3",
			title: "Paid Ads focused on performance",
			description:
				"We create campaigns with a strategic base so ad spend attracts qualified traffic and supports business growth.",
			listTitle: "What is included",
			items: [
				"Creatives and messages built for conversion.",
				"Audience targeting and campaign design by objective.",
				"Progressive optimization to improve performance and return."
			],
			metricTitle: "Impact",
			metricValue: "03",
			metricCopy: "Advertising stops feeling like expense when each campaign supports a clearer growth strategy."
		}
	],
	pt: [
		{
			eyebrow: "Step 1",
			title: "Branding com identidade e criterio",
			description:
				"Trabalhamos a base da marca para que ela tenha uma presenca reconhecivel, coerente e pronta para crescer com direcao visual clara.",
			listTitle: "O que inclui",
			items: [
				"Definicao de tom, estilo visual e personalidade da marca.",
				"Identidade consistente para site, redes e apresentacoes.",
				"Direcao criativa para que cada peca comunique com mais forca."
			],
			metricTitle: "Impacto",
			metricValue: "01",
			metricCopy: "Uma marca bem construida transmite mais confianca e melhora todo o resto."
		},
		{
			eyebrow: "Step 2",
			title: "Social Media pensado para conectar",
			description:
				"Criamos conteudo e narrativa para que suas redes nao sejam apenas bonitas, mas uma extensao real da marca.",
			listTitle: "O que inclui",
			items: [
				"Estrategia de conteudo alinhada com seus objetivos e publico.",
				"Linhas visuais e textos adaptados a cada formato e canal.",
				"Planejamento de publicacoes com criterio criativo e comercial."
			],
			metricTitle: "Impacto",
			metricValue: "02",
			metricCopy: "Redes sociais bem trabalhadas melhoram percepcao, comunidade e oportunidades de venda."
		},
		{
			eyebrow: "Step 3",
			title: "Paid Ads focado em resultados",
			description:
				"Criamos campanhas com base estrategica para que o investimento em anuncios atraia trafego qualificado e apoie o crescimento do negocio.",
			listTitle: "O que inclui",
			items: [
				"Criativos e mensagens orientados para conversao.",
				"Segmentacao e estrutura de campanha segundo o objetivo.",
				"Otimizacao progressiva para melhorar desempenho e retorno."
			],
			metricTitle: "Impacto",
			metricValue: "03",
			metricCopy: "A publicidade deixa de ser custo quando faz parte de uma estrategia melhor pensada."
		}
	],
	fr: [
		{
			eyebrow: "Step 1",
			title: "Branding avec identite et intention",
			description:
				"Nous travaillons la base de la marque pour lui donner une presence reconnaissable, coherente et prete a grandir avec une direction visuelle claire.",
			listTitle: "Ce qui est inclus",
			items: [
				"Definition du ton, du style visuel et de la personnalite de marque.",
				"Identite coherente pour le site, les reseaux et les presentations.",
				"Direction creative pour que chaque support communique avec plus de force."
			],
			metricTitle: "Impact",
			metricValue: "01",
			metricCopy: "Une marque bien construite inspire plus de confiance et renforce tout le reste."
		},
		{
			eyebrow: "Step 2",
			title: "Social Media pense pour connecter",
			description:
				"Nous concevons contenu et narration pour que vos reseaux soient plus qu'esthetiques: une vraie extension de la marque.",
			listTitle: "Ce qui est inclus",
			items: [
				"Strategie de contenu alignee avec vos objectifs et votre audience.",
				"Lignes visuelles et textes adaptes a chaque format et canal.",
				"Planification editoriale avec intention creative et commerciale."
			],
			metricTitle: "Impact",
			metricValue: "02",
			metricCopy: "Des reseaux bien travailles ameliorent la perception, la communaute et les opportunites."
		},
		{
			eyebrow: "Step 3",
			title: "Paid Ads centre sur la performance",
			description:
				"Nous creons des campagnes avec une base strategique pour que l'investissement attire un trafic qualifie et soutienne la croissance.",
			listTitle: "Ce qui est inclus",
			items: [
				"Creatifs et messages orientes conversion.",
				"Ciblage et structure de campagne selon l'objectif.",
				"Optimisation continue pour ameliorer performance et retour."
			],
			metricTitle: "Impact",
			metricValue: "03",
			metricCopy: "La publicite cesse d'etre une depense lorsqu'elle fait partie d'une strategie plus claire."
		}
	]
};

export const Home = () => {
	const { store } = useGlobalReducer();
	const location = useLocation();
	const currentLanguage = store.language || "es";
	const copy = translations[currentLanguage].home;
	const serviceSteps = serviceStepContent[currentLanguage];

	useEffect(() => {
		if (location.hash === "#contact") {
			window.requestAnimationFrame(() => {
				document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
			});
		}
	}, [location.hash]);

	return (
		<div className="page-shell">
			<section className="geko-section geko-hero">
				<div className="container py-4">
					<div className="row align-items-center g-5">
						<div className="col-12 col-lg-7">
							<div className="geko-chip mb-4">{copy.agency}</div>
							<h1 className="geko-title" style={{ maxWidth: "11ch" }}>
								{copy.heroTitle}
							</h1>
							<p className="geko-lead mb-4" style={{ maxWidth: "40rem" }}>
								{copy.heroDescription}
							</p>
							<div className="d-flex flex-wrap gap-3">
								<button type="button" className="btn geko-pill-button geko-pill-button--primary">
									{copy.contact}
								</button>
								<button type="button" className="btn geko-pill-button geko-pill-button--secondary">
									{copy.viewServices}
								</button>
							</div>
						</div>

						<div className="col-12 col-lg-5">
							<div className="geko-dark-card">
								<div className="geko-chip mb-3" style={{ background: "var(--geko-dark-chip-bg)", color: "var(--geko-dark-chip-text)" }}>
									{copy.digitalPresence}
								</div>
								<h2 className="geko-subtitle mb-3" style={{ color: "var(--geko-dark-title)" }}>
									{copy.strategyTitle}
								</h2>
								<p className="mb-4" style={{ color: "var(--geko-dark-copy)", lineHeight: "1.8" }}>
									{copy.strategyDescription}
								</p>
								<div className="geko-metric-grid">
									<div className="geko-metric">
										<div className="geko-metric-value">01</div>
										<p className="mb-0 small" style={{ color: "var(--geko-metric-copy-color)" }}>
											Brand systems with clear direction.
										</p>
									</div>
									<div className="geko-metric">
										<div className="geko-metric-value" style={{ color: "var(--geko-accent-strong)" }}>
											02
										</div>
										<p className="mb-0 small" style={{ color: "var(--geko-metric-copy-color)" }}>
											Content designed to attract the right audience.
										</p>
									</div>
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
							<div className="geko-chip mb-3">{copy.servicesLabel}</div>
							<h2 className="geko-subtitle mb-0">{copy.servicesTitle}</h2>
						</div>
						<div className="col-12 col-lg-5">
							<p className="geko-lead mb-0">{copy.servicesDescription}</p>
						</div>
					</div>

					<Stepper
						backButtonText={currentLanguage === "es" ? "Atras" : currentLanguage === "pt" ? "Voltar" : currentLanguage === "fr" ? "Retour" : "Back"}
						nextButtonText={currentLanguage === "es" ? "Continuar" : currentLanguage === "pt" ? "Continuar" : currentLanguage === "fr" ? "Continuer" : "Continue"}
					>
						{serviceSteps.map((step) => (
							<Step key={step.title}>
								<div className="geko-service-step">
									<div className="geko-service-step__eyebrow">{step.eyebrow}</div>
									<div className="geko-service-step__title">{step.title}</div>
									<p className="geko-service-step__description mb-0">{step.description}</p>
									<div className="geko-service-step__grid">
										<div className="geko-service-step__panel">
											<h4>{step.listTitle}</h4>
											<ul className="geko-service-step__list">
												{step.items.map((item) => (
													<li key={item}>{item}</li>
												))}
											</ul>
										</div>
										<div className="geko-service-step__panel geko-service-step__metric">
											<h4>{step.metricTitle}</h4>
											<div className="geko-service-step__metric-value">{step.metricValue}</div>
											<p className="geko-service-step__metric-copy mb-0">{step.metricCopy}</p>
										</div>
									</div>
								</div>
							</Step>
						))}
					</Stepper>
				</div>
			</section>

			<section className="geko-section">
				<div className="container">
					<div className="geko-dark-card text-center">
						<div className="geko-chip mb-3 mx-auto" style={{ width: "fit-content", background: "var(--geko-dark-chip-bg)", color: "var(--geko-dark-chip-text)" }}>
							{copy.startLabel}
						</div>
						<h2 className="geko-subtitle mb-3" style={{ color: "var(--geko-dark-title)", maxWidth: "14ch", marginInline: "auto" }}>
							{copy.ctaTitle}
						</h2>
						<p className="mb-4 mx-auto" style={{ maxWidth: "42rem", color: "var(--geko-dark-copy-soft)", lineHeight: "1.8" }}>
							{copy.ctaDescription}
						</p>
						<div className="d-flex justify-content-center">
							<button
								type="button"
								className="btn geko-pill-button geko-pill-button--primary"
								onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" })}
							>
								{copy.ctaButton}
							</button>
						</div>
					</div>
				</div>
			</section>

			<section id="contact" className="geko-section">
				<div className="container">
					<div className="row align-items-stretch g-4">
						<div className="col-12 col-lg-5">
							<div className="geko-dark-card h-100">
								<div className="geko-chip mb-3" style={{ background: "var(--geko-dark-chip-bg)", color: "var(--geko-dark-chip-text)" }}>
									{copy.contactLabel}
								</div>
								<h2 className="geko-subtitle mb-3" style={{ color: "var(--geko-dark-title)", maxWidth: "12ch" }}>
									{copy.contactTitle}
								</h2>
								<p className="mb-4" style={{ color: "var(--geko-dark-copy)", lineHeight: "1.8", maxWidth: "30rem" }}>
									{copy.contactDescription}
								</p>
								<div className="d-grid gap-3">
									<div className="geko-contact-detail">
										<span className="geko-contact-detail__label">{copy.contactEmailLabel}</span>
										<a href="mailto:hola@gekoagency.com" className="text-decoration-none">
											hola@gekoagency.com
										</a>
									</div>
									<div className="geko-contact-detail">
										<span className="geko-contact-detail__label">{copy.contactSocialLabel}</span>
										<span>@gekoagency</span>
									</div>
									<div className="geko-contact-detail">
										<span className="geko-contact-detail__label">{copy.contactReplyLabel}</span>
										<span>{copy.contactReplyValue}</span>
									</div>
								</div>
							</div>
						</div>

						<div className="col-12 col-lg-7">
							<div className="geko-glass-card h-100">
								<form className="geko-contact-form" onSubmit={(event) => event.preventDefault()}>
									<div className="row g-3">
										<div className="col-12 col-md-6">
											<label className="geko-contact-form__label" htmlFor="contact-name">
												{copy.contactFormName}
											</label>
											<input id="contact-name" type="text" className="form-control geko-contact-input" placeholder={copy.contactFormNamePlaceholder} />
										</div>
										<div className="col-12 col-md-6">
											<label className="geko-contact-form__label" htmlFor="contact-email">
												{copy.contactFormEmail}
											</label>
											<input id="contact-email" type="email" className="form-control geko-contact-input" placeholder={copy.contactFormEmailPlaceholder} />
										</div>
										<div className="col-12">
											<label className="geko-contact-form__label" htmlFor="contact-company">
												{copy.contactFormCompany}
											</label>
											<input id="contact-company" type="text" className="form-control geko-contact-input" placeholder={copy.contactFormCompanyPlaceholder} />
										</div>
										<div className="col-12">
											<label className="geko-contact-form__label" htmlFor="contact-message">
												{copy.contactFormMessage}
											</label>
											<textarea
												id="contact-message"
												rows="6"
												className="form-control geko-contact-input geko-contact-textarea"
												placeholder={copy.contactFormMessagePlaceholder}
											/>
										</div>
									</div>
									<div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mt-4">
										<p className="mb-0 geko-contact-note">{copy.contactFormNote}</p>
										<button type="submit" className="btn geko-pill-button geko-pill-button--primary">
											{copy.contactFormButton}
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};
