"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import json
import os

from flask import Blueprint, Response, jsonify, request, stream_with_context
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


AI_CHAT_TOPICS = [
    "Servicios de la empresa: branding, social media y paid ads.",
    "Tendencias generales de marketing digital y posicionamiento de marca.",
    "Ideas para mejorar la web, conversion, mensajes y estructura de contenido.",
    "Recomendaciones para captar clientes, generar confianza y diferenciar la marca.",
    "Propuestas de campanas, contenido para redes y anuncios orientados a resultados.",
    "Siguientes pasos recomendados para hacer crecer la presencia digital de la empresa."
]


def _build_company_prompt(user_message, history):
    system_prompt = """
Eres el asistente virtual de Geko Marketing.

Tu funcion es ayudar a visitantes y clientes potenciales a entender mejor la empresa, sus
servicios y las oportunidades de crecimiento digital que pueden trabajar con la marca.

Contexto de la empresa y la web:
- Geko Marketing trabaja principalmente branding, social media y paid ads.
- La web comunica una propuesta creativa y estrategica enfocada en identidad de marca,
  contenido que conecta y campanas orientadas a resultados.
- El tono debe sentirse cercano, claro, profesional y orientado a accion.

Tus prioridades:
- Explicar que hace la empresa de forma sencilla y convincente.
- Recomendar enfoques de marketing, contenido, conversion y presencia digital.
- Hablar de tendencias del mercado de manera util y aplicada al negocio del usuario.
- Sugerir mejoras relacionadas con la pagina: estructura, copy, propuesta de valor,
  llamadas a la accion, captacion de leads, experiencia de usuario y mensaje comercial.

Cuando te pregunten por tendencias del mercado:
- Responde con tendencias generales y buenas practicas de marketing digital.
- No inventes datos en tiempo real ni cifras actuales si no te las proporcionan.
- Si el usuario necesita datos del momento, aclara que haria falta conectarlo a una fuente en vivo.

Si el usuario se sale del tema principal:
- Redirige la conversacion con naturalidad a temas relacionados con la empresa o la web.
- Tambien puedes ayudar con: estrategia de contenidos, tono de marca, ideas de campanas,
  anuncios, embudos, analisis de propuesta de valor, UX de la landing, captacion,
  fidelizacion y presencia digital.

Responde siempre en espanol.
""".strip()

    conversation_text = system_prompt + "\n\n"

    for msg in history:
        role = "Usuario" if msg.get("role") == "user" else "Asistente"
        content = (msg.get("content") or "").strip()
        if content:
            conversation_text += f"{role}: {content}\n\n"

    conversation_text += f"Usuario: {user_message}\n\nAsistente:"
    return conversation_text


def _resolve_gemini_model(genai):
    try:
        preferred_models = [
            "models/gemini-1.5-flash",
            "models/gemini-1.5-pro",
            "gemini-1.5-flash",
            "gemini-1.5-pro",
        ]

        available_models = list(genai.list_models())
        available_names = {model.name for model in available_models}

        for model_name in preferred_models:
            if model_name in available_names:
                return genai.GenerativeModel(model_name)

        for model in available_models:
            methods = getattr(model, "supported_generation_methods", []) or []
            if "generateContent" in methods and "gemini" in model.name.lower():
                return genai.GenerativeModel(model.name)

        for model in available_models:
            methods = getattr(model, "supported_generation_methods", []) or []
            if "generateContent" in methods:
                return genai.GenerativeModel(model.name)

        raise ValueError("No available Gemini model supports generateContent.")
    except Exception as error:
        fallback_models = [
            "models/gemini-1.5-flash",
            "models/gemini-1.5-pro",
            "gemini-1.5-flash",
            "gemini-1.5-pro",
            "gemini-pro",
        ]

        last_error = str(error)
        for model_name in fallback_models:
            try:
                return genai.GenerativeModel(model_name)
            except Exception as model_error:
                last_error = str(model_error)

        raise ValueError(f"No Gemini model could be initialized. Last error: {last_error}")


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route("/ai-chat", methods=["POST"])
def ai_chat():
    """
    Chat principal de IA para la web de Geko Marketing.

    Recibe:
    - message: mensaje actual del usuario
    - history: historial de la conversacion [{ role, content }]

    Devuelve:
    - Stream SSE con bloques data: {"content": "..."}
    """
    data = request.get_json() or {}
    user_message = (data.get("message") or "").strip()
    conversation_history = data.get("history", []) or []

    if not user_message:
        return jsonify({"message": "Message is required"}), 400

    gemini_api_key = os.getenv("GEMINI_API_KEY")
    if not gemini_api_key:
        return jsonify({"message": "GEMINI_API_KEY not configured"}), 500

    try:
        import google.generativeai as genai

        genai.configure(api_key=gemini_api_key)
        conversation_text = _build_company_prompt(user_message, conversation_history)
        model = _resolve_gemini_model(genai)

        response = model.generate_content(
            conversation_text,
            stream=True,
            generation_config=genai.types.GenerationConfig(
                temperature=0.7,
                max_output_tokens=2048,
            )
        )

        def generate():
            try:
                for chunk in response:
                    chunk_text = getattr(chunk, "text", "")
                    if chunk_text:
                        yield f"data: {json.dumps({'content': chunk_text})}\n\n"
                yield "data: [DONE]\n\n"
            except Exception as error:
                yield f"data: {json.dumps({'error': str(error)})}\n\n"
                yield "data: [DONE]\n\n"

        return Response(
            stream_with_context(generate()),
            mimetype="text/event-stream",
            headers={
                "Cache-Control": "no-cache",
                "X-Accel-Buffering": "no",
                "Connection": "keep-alive"
            }
        )

    except ImportError:
        return jsonify({
            "message": (
                "google-generativeai library not installed. "
                "Install dependencies and restart the backend."
            )
        }), 500
    except Exception as error:
        return jsonify({"message": f"Error in AI chat: {str(error)}"}), 500


@api.route("/ai-chat/topics", methods=["GET"])
def ai_chat_topics():
    return jsonify({
        "title": "Temas que el asistente puede cubrir",
        "topics": AI_CHAT_TOPICS
    }), 200
