import { useEffect, useMemo, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { languageOptions, translations } from "../i18n";

const uiCopy = {
	es: {
		button: "IA",
		title: "Asistente Geko",
		subtitle: "Branding, social media, paid ads y mejoras para tu web.",
		inputPlaceholder: "Escribe tu pregunta...",
		send: "Enviar",
		close: "Cerrar",
		thinking: "Escribiendo...",
		welcome:
			"Hola, soy el asistente de Geko. Puedo ayudarte con servicios, tendencias de marketing, ideas de contenido y mejoras para la pagina.",
		suggestionsTitle: "Puedes preguntarme por:"
	},
	en: {
		button: "AI",
		title: "Geko Assistant",
		subtitle: "Branding, social media, paid ads and website improvements.",
		inputPlaceholder: "Type your question...",
		send: "Send",
		close: "Close",
		thinking: "Typing...",
		welcome:
			"Hi, I'm Geko's assistant. I can help with services, marketing trends, content ideas and website improvements.",
		suggestionsTitle: "You can ask me about:"
	},
	pt: {
		button: "IA",
		title: "Assistente Geko",
		subtitle: "Branding, social media, paid ads e melhorias para o seu site.",
		inputPlaceholder: "Escreva sua pergunta...",
		send: "Enviar",
		close: "Fechar",
		thinking: "Escrevendo...",
		welcome:
			"Ola, sou o assistente da Geko. Posso ajudar com servicos, tendencias de marketing, ideias de conteudo e melhorias para o site.",
		suggestionsTitle: "Voce pode perguntar sobre:"
	},
	fr: {
		button: "IA",
		title: "Assistant Geko",
		subtitle: "Branding, social media, paid ads et ameliorations pour votre site.",
		inputPlaceholder: "Ecrivez votre question...",
		send: "Envoyer",
		close: "Fermer",
		thinking: "En train d'ecrire...",
		welcome:
			"Bonjour, je suis l'assistant Geko. Je peux vous aider avec les services, les tendances marketing, les idees de contenu et les ameliorations du site.",
		suggestionsTitle: "Vous pouvez demander:"
	}
};

export const AIChatWidget = () => {
	const { store, dispatch } = useGlobalReducer();
	const currentLanguage = store.language || "es";
	const currentTheme = store.theme || "light";
	const copy = uiCopy[currentLanguage] || uiCopy.es;
	const navbarCopy = translations[currentLanguage].navbar;
	const [isOpen, setIsOpen] = useState(false);
	const [isLanguageOpen, setIsLanguageOpen] = useState(false);
	const [inputValue, setInputValue] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [suggestions, setSuggestions] = useState([]);
	const [messages, setMessages] = useState([
		{ role: "assistant", content: copy.welcome }
	]);
	const abortRef = useRef(null);
	const bodyRef = useRef(null);
	const languageMenuRef = useRef(null);
	const currentOption =
		languageOptions.find((option) => option.code === currentLanguage) || languageOptions[0];

	useEffect(() => {
		setMessages([{ role: "assistant", content: copy.welcome }]);
	}, [copy.welcome]);

	useEffect(() => {
		if (!isOpen || suggestions.length > 0) return;

		fetch(`${import.meta.env.VITE_BACKEND_URL}/api/ai-chat/topics`)
			.then((response) => response.json())
			.then((data) => setSuggestions(data.topics || []))
			.catch(() => setSuggestions([]));
	}, [isOpen, suggestions.length]);

	useEffect(() => {
		bodyRef.current?.scrollTo({
			top: bodyRef.current.scrollHeight,
			behavior: "smooth"
		});
	}, [messages, isLoading]);

	useEffect(() => {
		return () => {
			abortRef.current?.abort();
		};
	}, []);

	useEffect(() => {
		const handleOutsideClick = (event) => {
			if (!languageMenuRef.current?.contains(event.target)) {
				setIsLanguageOpen(false);
			}
		};

		document.addEventListener("mousedown", handleOutsideClick);
		return () => document.removeEventListener("mousedown", handleOutsideClick);
	}, []);

	const history = useMemo(
		() => messages.map((message) => ({ role: message.role, content: message.content })),
		[messages]
	);

	const handleLanguageChange = (languageCode) => {
		dispatch({ type: "set_language", payload: languageCode });
		setIsLanguageOpen(false);
	};

	const sendMessage = async (prefilledMessage) => {
		const nextMessage = (prefilledMessage ?? inputValue).trim();
		if (!nextMessage || isLoading) return;

		const nextHistory = [...history, { role: "user", content: nextMessage }];
		setInputValue("");
		setIsLoading(true);
		setMessages((current) => [
			...current,
			{ role: "user", content: nextMessage },
			{ role: "assistant", content: "" }
		]);

		const controller = new AbortController();
		abortRef.current = controller;

		try {
			const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/ai-chat`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					message: nextMessage,
					history: nextHistory.slice(0, -1)
				}),
				signal: controller.signal
			});

			if (!response.ok || !response.body) {
				throw new Error("No se pudo conectar con el asistente.");
			}

			const reader = response.body.getReader();
			const decoder = new TextDecoder("utf-8");
			let buffer = "";

			while (true) {
				const { value, done } = await reader.read();
				if (done) break;

				buffer += decoder.decode(value, { stream: true });
				const events = buffer.split("\n\n");
				buffer = events.pop() || "";

				events.forEach((eventChunk) => {
					const line = eventChunk
						.split("\n")
						.find((entry) => entry.startsWith("data: "));

					if (!line) return;

					const payload = line.replace("data: ", "").trim();
					if (payload === "[DONE]") return;

					try {
						const parsed = JSON.parse(payload);

						if (parsed.error) {
							throw new Error(parsed.error);
						}

						if (parsed.content) {
							setMessages((current) => {
								const updated = [...current];
								const lastIndex = updated.length - 1;
								if (updated[lastIndex]?.role === "assistant") {
									updated[lastIndex] = {
										...updated[lastIndex],
										content: `${updated[lastIndex].content}${parsed.content}`
									};
								}
								return updated;
							});
						}
					} catch (error) {
						setMessages((current) => {
							const updated = [...current];
							const lastIndex = updated.length - 1;
							if (updated[lastIndex]?.role === "assistant" && !updated[lastIndex].content.trim()) {
								updated[lastIndex] = {
									...updated[lastIndex],
									content: "Ahora mismo no pude generar respuesta. Revisa la configuracion de Gemini."
								};
							}
							return updated;
						});
					}
				});
			}
		} catch (error) {
			if (error.name !== "AbortError") {
				setMessages((current) => {
					const updated = [...current];
					const lastIndex = updated.length - 1;
					if (updated[lastIndex]?.role === "assistant") {
						updated[lastIndex] = {
							...updated[lastIndex],
							content:
								updated[lastIndex].content ||
								"No pude conectarme con la IA. Comprueba VITE_BACKEND_URL, GEMINI_API_KEY y que el backend este corriendo."
						};
					}
					return updated;
				});
			}
		} finally {
			setIsLoading(false);
			abortRef.current = null;
		}
	};

	return (
		<>
			<div className={`geko-floating-tools ${isOpen ? "is-chat-open" : ""}`}>
				<div className="geko-floating-language-wrap" ref={languageMenuRef}>
					<button
						type="button"
						className={`btn geko-floating-bubble geko-floating-bubble--language ${isLanguageOpen ? "is-open" : ""}`}
						onClick={() => setIsLanguageOpen((value) => !value)}
						aria-haspopup="true"
						aria-expanded={isLanguageOpen}
						aria-label={navbarCopy.language}
						title={navbarCopy.language}
					>
						<span className="geko-floating-bubble__glow" aria-hidden="true"></span>
						<span className="geko-floating-bubble__label">{currentOption.shortLabel}</span>
					</button>

					{isLanguageOpen && (
						<div className="rounded-4 p-2 geko-floating-language-menu">
							{languageOptions.map((option) => (
								<button
									key={option.code}
									type="button"
									className={`btn w-100 text-start rounded-3 px-3 py-2 geko-language-option ${
										option.code === currentLanguage ? "is-active" : ""
									}`}
									onMouseDown={(event) => {
										event.preventDefault();
										handleLanguageChange(option.code);
									}}
									onClick={() => handleLanguageChange(option.code)}
								>
									{option.label}
								</button>
							))}
						</div>
					)}
				</div>

				<button
					type="button"
					className="btn geko-floating-bubble geko-floating-bubble--theme"
					onClick={() =>
						dispatch({
							type: "set_theme",
							payload: currentTheme === "dark" ? "light" : "dark"
						})
					}
					aria-label={currentTheme === "dark" ? navbarCopy.lightMode : navbarCopy.darkMode}
					title={currentTheme === "dark" ? navbarCopy.lightMode : navbarCopy.darkMode}
				>
					<span className="geko-floating-bubble__glow" aria-hidden="true"></span>
					<span className="geko-floating-bubble__icon" aria-hidden="true">
						<FontAwesomeIcon icon={currentTheme === "dark" ? faSun : faMoon} />
					</span>
				</button>
			</div>

			<button
				type="button"
				className={`geko-ai-launcher ${isOpen ? "is-open" : ""}`}
				onClick={() => setIsOpen((value) => !value)}
				aria-label={copy.title}
				aria-expanded={isOpen}
			>
				<span className="geko-ai-launcher__pulse" aria-hidden="true"></span>
				<span className="geko-ai-launcher__label">{copy.button}</span>
			</button>

			{isOpen && <div className="geko-ai-overlay" onClick={() => setIsOpen(false)} aria-hidden="true"></div>}

			<aside className={`geko-ai-panel ${isOpen ? "is-open" : ""}`} aria-hidden={!isOpen}>
				<div className="geko-ai-panel__header">
					<div>
						<div className="geko-chip mb-2">{copy.title}</div>
						<p className="geko-ai-panel__subtitle mb-0">{copy.subtitle}</p>
					</div>
					<button
						type="button"
						className="btn geko-ai-close"
						onClick={() => setIsOpen(false)}
						aria-label={copy.close}
					>
						<span aria-hidden="true">x</span>
					</button>
				</div>

				<div className="geko-ai-panel__body" ref={bodyRef}>
					<div className="geko-ai-suggestions">
						<p className="geko-ai-suggestions__title">{copy.suggestionsTitle}</p>
						<div className="geko-ai-suggestions__list">
							{suggestions.slice(0, 4).map((topic) => (
								<button
									key={topic}
									type="button"
									className="btn geko-ai-suggestion"
									onClick={() => sendMessage(topic)}
								>
									{topic}
								</button>
							))}
						</div>
					</div>

					<div className="geko-ai-messages">
						{messages.map((message, index) => (
							<div
								key={`${message.role}-${index}`}
								className={`geko-ai-message ${message.role === "user" ? "is-user" : "is-assistant"}`}
							>
								<div className="geko-ai-message__bubble">
									{message.content || (isLoading && index === messages.length - 1 ? copy.thinking : "")}
								</div>
							</div>
						))}
					</div>
				</div>

				<form
					className="geko-ai-panel__composer"
					onSubmit={(event) => {
						event.preventDefault();
						sendMessage();
					}}
				>
					<input
						type="text"
						className="form-control geko-contact-input"
						value={inputValue}
						onChange={(event) => setInputValue(event.target.value)}
						placeholder={copy.inputPlaceholder}
					/>
					<button type="submit" className="btn geko-pill-button geko-pill-button--primary" disabled={isLoading}>
						{copy.send}
					</button>
				</form>
			</aside>
		</>
	);
};
