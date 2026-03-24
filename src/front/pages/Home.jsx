import useGlobalReducer from "../hooks/useGlobalReducer";
import { translations } from "../i18n";
import { Globe } from "../components/Globe";
import { useEffect, useRef } from "react";
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

const serviceVisualThemes = [
	{
		className: "is-brand",
		eyebrow: "Identity System",
		tag: "Brand",
		preview: (
			<div className="geko-tool-preview__brand">
				<span></span>
				<span></span>
				<span></span>
			</div>
		)
	},
	{
		className: "is-social",
		eyebrow: "Content Engine",
		tag: "Social",
		preview: (
			<div className="geko-tool-preview__social">
				<span></span>
				<span></span>
				<span></span>
			</div>
		)
	},
	{
		className: "is-ads",
		eyebrow: "Growth Layer",
		tag: "Ads",
		preview: (
			<div className="geko-tool-preview__ads">
				<span></span>
				<span></span>
				<span></span>
				<span></span>
			</div>
		)
	}
];

export const Home = () => {
	const { store } = useGlobalReducer();
	const location = useLocation();
	const pageRef = useRef(null);
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

	useEffect(() => {
		const page = pageRef.current;

		if (!page) return undefined;

		const revealItems = page.querySelectorAll("[data-reveal]");
		const scrollStages = page.querySelectorAll("[data-scroll-stage]");
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("is-visible");
					}
				});
			},
			{ threshold: 0.18, rootMargin: "0px 0px -10% 0px" }
		);

		revealItems.forEach((item) => observer.observe(item));

		const handleScroll = () => {
			const hero = page.querySelector(".geko-hero");
			const heroHeight = hero?.offsetHeight || window.innerHeight;
			const progress = Math.min(window.scrollY / Math.max(heroHeight, 1), 1);
			const pageHeight = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
			const pageProgress = Math.min(window.scrollY / pageHeight, 1);
			const drift = Math.min(window.scrollY / 2200, 1);

			page.style.setProperty("--geko-hero-progress", progress.toFixed(3));
			page.style.setProperty("--geko-page-progress", pageProgress.toFixed(3));
			page.style.setProperty("--geko-scroll-drift", drift.toFixed(3));

			scrollStages.forEach((stage) => {
				const rect = stage.getBoundingClientRect();
				const viewport = window.innerHeight;
				const total = rect.height + viewport;
				const passed = viewport - rect.top;
				const stageProgress = Math.min(Math.max(passed / total, 0), 1);
				stage.style.setProperty("--stage-progress", stageProgress.toFixed(3));
			});
		};

		handleScroll();
		window.addEventListener("scroll", handleScroll, { passive: true });

		return () => {
			observer.disconnect();
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const scrollToContact = () => {
		document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
	};

	return (
		<div ref={pageRef} className="page-shell page-shell--interactive">
			<div className="geko-scroll-orb geko-scroll-orb--violet" aria-hidden="true"></div>
			<div className="geko-scroll-orb geko-scroll-orb--orange" aria-hidden="true"></div>
			<div className="geko-scroll-orb geko-scroll-orb--pearl" aria-hidden="true"></div>

			<section className="geko-section geko-hero">
				<div className="geko-scene-objects geko-scene-objects--hero" aria-hidden="true">
					<span className="geko-scene-object geko-scene-object--ticket"></span>
					<span className="geko-scene-object geko-scene-object--ring"></span>
					<span className="geko-scene-object geko-scene-object--capsule"></span>
				</div>
				<div className="container py-4">
					<div className="row align-items-center g-5">
						<div className="col-12 col-lg-7" data-reveal="left">
							<div className="geko-hero-copy-card geko-scroll-panel">
								<div className="geko-brand-signature" aria-hidden="true">
									<span className="geko-brand-signature__eye"></span>
									<span className="geko-brand-signature__tail"></span>
								</div>
								<div className="geko-chip mb-4">{copy.agency}</div>
								<h1 className="geko-title" style={{ maxWidth: "11ch" }}>
									{copy.heroTitle}
								</h1>
								<p className="geko-lead mb-4" style={{ maxWidth: "40rem" }}>
									{copy.heroDescription}
								</p>
								<div className="geko-hero-copy-card__actions d-flex flex-wrap gap-3">
									<button
										type="button"
										className="btn geko-pill-button geko-pill-button--primary"
										onClick={scrollToContact}
									>
										{copy.contact}
									</button>
									<button type="button" className="btn geko-pill-button geko-pill-button--secondary">
										{copy.viewServices}
									</button>
								</div>
							</div>
						</div>

						<div className="col-12 col-lg-5" data-reveal="right">
							<div className="geko-hero-globe-card geko-scroll-panel">
								<div className="geko-globe-card__mark" aria-hidden="true">
									<span></span>
									<span></span>
									<span></span>
								</div>
								<div className="geko-chip mb-3" style={{ background: "var(--geko-dark-chip-bg)", color: "var(--geko-dark-chip-text)" }}>
									{copy.digitalPresence}
								</div>
								<Globe />
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="geko-section">
				<div className="geko-scene-objects geko-scene-objects--services" aria-hidden="true">
					<span className="geko-scene-object geko-scene-object--diamond"></span>
					<span className="geko-scene-object geko-scene-object--panel"></span>
					<span className="geko-scene-object geko-scene-object--dot-grid"></span>
				</div>
				<div className="container">
					<div className="row align-items-end mb-4 g-4">
						<div className="col-12 col-lg-7" data-reveal="up">
							<div className="geko-chip mb-3">{copy.servicesLabel}</div>
							<h2 className="geko-subtitle mb-0">{copy.servicesTitle}</h2>
						</div>
						<div className="col-12 col-lg-5" data-reveal="up" style={{ "--reveal-delay": "120ms" }}>
							<p className="geko-lead mb-0">{copy.servicesDescription}</p>
						</div>
					</div>

					<div className="geko-services-premium-bar" data-reveal="up" style={{ "--reveal-delay": "100ms" }}>
						<div className="geko-services-premium-bar__label">Geko Creative System</div>
						<div className="geko-services-premium-bar__chips">
							<span>Visual Identity</span>
							<span>Content Systems</span>
							<span>Campaign Motion</span>
						</div>
					</div>

					<div className="geko-scroll-showcase" data-scroll-stage data-reveal="up" style={{ "--reveal-delay": "120ms" }}>
						<div className="geko-scroll-showcase__copy">
							<div className="geko-scroll-showcase__intro">
								<div className="geko-scroll-showcase__intro-mark" aria-hidden="true"></div>
								<p>
									Geko Marketing trabaja cada capa como un sistema vivo: identidad, contenido y
									campanas moviendose con una misma direccion visual.
								</p>
							</div>
							{serviceSteps.map((step, index) => (
								<article key={step.title} className="geko-scroll-showcase__item">
									<div className="geko-scroll-showcase__item-index">{step.metricValue}</div>
									<div>
										<p className="geko-scroll-showcase__item-kicker">{serviceVisualThemes[index].eyebrow}</p>
										<h3 className="geko-scroll-showcase__item-title">{step.title}</h3>
										<p className="geko-scroll-showcase__item-copy">{step.metricCopy}</p>
									</div>
								</article>
							))}
						</div>
						<div className="geko-scroll-showcase__visual">
							<div className="geko-scroll-showcase__stage">
								<div className="geko-scroll-showcase__chrome">
									<span></span>
									<span></span>
									<span></span>
								</div>
								<div className="geko-scroll-showcase__floor"></div>
								{serviceSteps.map((step, index) => (
									<div
										key={step.title}
										className={`geko-scroll-showcase__panel ${serviceVisualThemes[index].className}`}
									>
										<div className="geko-scroll-showcase__panel-glow"></div>
										<div className="geko-scroll-showcase__panel-preview">{serviceVisualThemes[index].preview}</div>
										<div className="geko-scroll-showcase__panel-body">
											<span>{serviceVisualThemes[index].tag}</span>
											<strong>{step.title}</strong>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>

				</div>
			</section>

			<section className="geko-section">
				<div className="geko-scene-objects geko-scene-objects--cta" aria-hidden="true">
					<span className="geko-scene-object geko-scene-object--wave"></span>
					<span className="geko-scene-object geko-scene-object--coin"></span>
				</div>
				<div className="container">
					<div className="geko-dark-card text-center geko-scroll-panel" data-reveal="up">
						<div className="geko-minimal-track geko-minimal-track--cta" aria-hidden="true">
							<span></span>
						</div>
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
								onClick={scrollToContact}
							>
								{copy.ctaButton}
							</button>
						</div>
					</div>
				</div>
			</section>

			<section id="contact" className="geko-section">
				<div className="geko-scene-objects geko-scene-objects--contact" aria-hidden="true">
					<span className="geko-scene-object geko-scene-object--frame"></span>
					<span className="geko-scene-object geko-scene-object--signal"></span>
				</div>
				<div className="container">
					<div className="row align-items-stretch g-4">
						<div className="col-12 col-lg-5" data-reveal="left">
							<div className="geko-dark-card h-100 geko-scroll-panel">
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

						<div className="col-12 col-lg-7" data-reveal="right" style={{ "--reveal-delay": "120ms" }}>
							<div className="geko-glass-card h-100 geko-scroll-panel">
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
