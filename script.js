
/* ==================================
   JUEGO DE CLASIFICACIÓN DE RESIDUOS
================================== */

const residuos = [
    { nombre: "🍌 Plátano", tipo: "organico" },
    { nombre: "📄 Papel", tipo: "reciclable" },
    { nombre: "🔋 Pila", tipo: "especial" },
    { nombre: "🍎 Manzana", tipo: "organico" },
    { nombre: "🫙 Frasco de vidrio", tipo: "reciclable" },
    { nombre: "💻 Electrónico", tipo: "especial" },
    { nombre: "🥕 Zanahoria", tipo: "organico" },
    { nombre: "📦 Cartón", tipo: "reciclable" }
];

let indice = 0;
let puntos = 0;
let respondido = false;

const wasteElement = document.getElementById("waste");
const scoreElement = document.getElementById("score");
const feedbackElement = document.getElementById("feedback");
const nextButton = document.getElementById("next");

function mostrarResiduo() {
    if (indice >= residuos.length) {
        wasteElement.textContent = "🏆";
        document.getElementById("question").textContent =
            "¡Terminaste el juego!";
        feedbackElement.textContent =
            "Obtuviste " + puntos + " puntos de " + residuos.length + ".";
        nextButton.textContent = "Volver a jugar";
        nextButton.disabled = false;

        document.querySelectorAll(".bin").forEach(boton => {
            boton.disabled = true;
        });

        return;
    }

    wasteElement.textContent = residuos[indice].nombre;
    feedbackElement.textContent = "";
    respondido = false;
    nextButton.textContent = "Siguiente residuo";

    document.querySelectorAll(".bin").forEach(boton => {
        boton.disabled = false;
    });
}

document.querySelectorAll(".bin").forEach(boton => {
    boton.addEventListener("click", function() {

        if (respondido || indice >= residuos.length) return;

        const respuesta = boton.dataset.type;
        const correcta = residuos[indice].tipo;

        respondido = true;

        if (respuesta === correcta) {
            puntos += 10;
            feedbackElement.textContent = "¡Correcto! +10 puntos 🌱";
        } else {
            feedbackElement.textContent =
                "No exactamente. La clasificación educativa correcta es: " + correcta + ".";
        }

        scoreElement.textContent = puntos;

        document.querySelectorAll(".bin").forEach(b => {
            b.disabled = true;
        });
    });
});

nextButton.addEventListener("click", function() {
    if (indice >= residuos.length) {
        indice = 0;
        puntos = 0;
        scoreElement.textContent = puntos;
        mostrarResiduo();
        return;
    }

    if (!respondido) {
        feedbackElement.textContent = "Primero selecciona un contenedor.";
        return;
    }

    indice++;
    mostrarResiduo();
});

mostrarResiduo();

/* ==================================
   CUESTIONARIO EDUCATIVO
================================== */

const preguntas = [
    {
        pregunta: "¿Qué puedes hacer con restos de frutas y verduras?",
        opciones: [
            "Tirarlos al suelo",
            "Aprovecharlos para compostaje cuando sea posible",
            "Mezclarlos con pilas"
        ],
        correcta: 1
    },
    {
        pregunta: "¿Qué debes hacer antes de reciclar un envase?",
        opciones: [
            "Dejarlo lleno de comida",
            "Prepararlo según las indicaciones de reciclaje local",
            "Enterrarlo"
        ],
        correcta: 1
    },
    {
        pregunta: "¿Dónde deben llevarse las pilas usadas?",
        opciones: [
            "A un punto de recolección especializado",
            "Al jardín",
            "Al drenaje"
        ],
        correcta: 0
    },
    {
        pregunta: "¿Cuál es una buena práctica ambiental?",
        opciones: [
            "Comprar productos innecesarios",
            "Usar artículos desechables todo el tiempo",
            "Reutilizar materiales cuando sea posible"
        ],
        correcta: 2
    },
    {
        pregunta: "¿Cuál es el primer paso para reducir residuos?",
        opciones: [
            "Consumir más",
            "Evitar productos innecesarios y reducir el consumo",
            "Tirar todo junto"
        ],
        correcta: 1
    }
];

let preguntaActual = 0;
let aciertos = 0;
let quizRespondido = false;

const quizQuestion = document.getElementById("quiz-question");
const quizOptions = document.getElementById("quiz-options");
const quizFeedback = document.getElementById("quiz-feedback");
const quizNext = document.getElementById("quiz-next");
const quizProgress = document.getElementById("quiz-progress");

function mostrarPregunta() {
    quizRespondido = false;

    if (preguntaActual >= preguntas.length) {
        quizQuestion.textContent = "¡Quiz terminado! 🎉";
        quizOptions.innerHTML = "";
        quizFeedback.textContent =
            "Tu resultado: " + aciertos + " de " + preguntas.length + " respuestas correctas.";
        quizProgress.textContent = "¡Gracias por aprender con EcoAprende!";
        quizNext.textContent = "Repetir quiz";
        return;
    }

    const pregunta = preguntas[preguntaActual];

    quizQuestion.textContent = pregunta.pregunta;
    quizOptions.innerHTML = "";
    quizFeedback.textContent = "";
    quizNext.textContent = "Continuar";
    quizProgress.textContent =
        "Pregunta " + (preguntaActual + 1) + " de " + preguntas.length;

    pregunta.opciones.forEach((opcion, index) => {
        const boton = document.createElement("button");

        boton.textContent = opcion;
        boton.className = "option";

        boton.addEventListener("click", function() {
            if (quizRespondido) return;

            quizRespondido = true;

            if (index === pregunta.correcta) {
                aciertos++;
                quizFeedback.textContent = "¡Respuesta correcta! 🌿";
            } else {
                quizFeedback.textContent =
                    "Respuesta incorrecta. " +
                    "La respuesta correcta es: " +
                    pregunta.opciones[pregunta.correcta];
            }

            Array.from(quizOptions.children).forEach(b => {
                b.disabled = true;
            });
        });

        quizOptions.appendChild(boton);
    });
}

quizNext.addEventListener("click", function() {
    if (preguntaActual >= preguntas.length) {
        preguntaActual = 0;
        aciertos = 0;
        mostrarPregunta();
        return;
    }

    if (!quizRespondido) {
        quizFeedback.textContent = "Selecciona una respuesta antes de continuar.";
        return;
    }

    preguntaActual++;
    mostrarPregunta();
});

mostrarPregunta();