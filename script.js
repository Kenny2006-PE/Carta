// Importar GSAP
import { gsap } from 'gsap';

// Obtener elementos del DOM
const envelope = document.getElementById('envelope');
const letter = document.getElementById('letter');
const closeButton = document.getElementById('closeButton');
const envelopeFlap = document.querySelector('.envelope-flap');
const kittyFace = document.querySelector('.kitty-face');

// Variable para controlar si el sobre ya fue abierto
let isOpened = false;

// Inicializar Particles.js para efectos de fondo (usando CDN)
if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
    particles: {
        number: {
            value: 50,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: ['#ff6fb5', '#ffb3d9', '#ff8dc7', '#ffc9e5']
        },
        shape: {
            type: ['circle', 'heart'],
            stroke: {
                width: 0,
                color: '#000000'
            }
        },
        opacity: {
            value: 0.3,
            random: true,
            anim: {
                enable: true,
                speed: 0.5,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 8,
            random: true,
            anim: {
                enable: true,
                speed: 2,
                size_min: 3,
                sync: false
            }
        },
        line_linked: {
            enable: false
        },
        move: {
            enable: true,
            speed: 1.5,
            direction: 'top',
            random: true,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'bubble'
            },
            onclick: {
                enable: false
            },
            resize: true
        },
        modes: {
            bubble: {
                distance: 100,
                size: 12,
                duration: 2,
                opacity: 0.5,
                speed: 3
            }
        }
    },
    retina_detect: true
    });
}

// Animación inicial del sobre con GSAP
gsap.from(envelope, {
    duration: 1.2,
    scale: 0.8,
    opacity: 0,
    y: 50,
    ease: "elastic.out(1, 0.5)",
    delay: 0.3
});

// Animación de entrada de Hello Kitty
gsap.from(kittyFace, {
    duration: 1,
    scale: 0,
    rotation: -180,
    ease: "back.out(1.7)",
    delay: 1
});

// Animación continua de los corazones
gsap.to('.heart', {
    duration: 1.5,
    scale: 1.3,
    opacity: 0.8,
    ease: "power1.inOut",
    stagger: 0.2,
    repeat: -1,
    yoyo: true
});

// Evento click en el sobre
envelope.addEventListener('click', function() {
    if (!isOpened) {
        openEnvelope();
        isOpened = true;
    }
});

// Función para abrir el sobre con animaciones fluidas
function openEnvelope() {
    // Timeline de GSAP para secuenciar las animaciones
    const tl = gsap.timeline();
    
    // Animación de temblor del sobre
    tl.to(envelope, {
        duration: 0.1,
        rotation: -3,
        repeat: 5,
        yoyo: true,
        ease: "power1.inOut"
    })
    // Abrir la solapa
    .to(envelopeFlap, {
        duration: 0.8,
        rotationX: -180,
        transformOrigin: "top center",
        ease: "power2.inOut"
    }, "-=0.3")
    // Hacer que Hello Kitty salte
    .to(kittyFace, {
        duration: 0.4,
        y: -20,
        scale: 1.1,
        ease: "power2.out"
    }, "-=0.6")
    .to(kittyFace, {
        duration: 0.3,
        y: 0,
        scale: 1,
        ease: "bounce.out"
    })
    // Desvanecer el sobre
    .to(envelope, {
        duration: 0.6,
        scale: 0.3,
        opacity: 0,
        y: -80,
        rotation: 10,
        ease: "back.in(1.7)"
    }, "-=0.2")
    // Mostrar la carta
    .to(letter, {
        duration: 0.8,
        scale: 1,
        opacity: 1,
        y: 0,
        ease: "elastic.out(1, 0.6)",
        onStart: () => {
            letter.style.pointerEvents = 'all';
        }
    }, "-=0.3")
    // Animar el contenido de la carta
    .from('.letter-header', {
        duration: 0.6,
        x: 50,
        opacity: 0,
        ease: "power2.out"
    }, "-=0.4")
    .from('.letter-body h1', {
        duration: 0.6,
        y: 30,
        opacity: 0,
        ease: "back.out(1.7)"
    }, "-=0.4")
    .from('.letter-body p', {
        duration: 0.5,
        y: 20,
        opacity: 0,
        stagger: 0.1,
        ease: "power2.out"
    }, "-=0.3")
    .from('.decoration-hearts span', {
        duration: 0.5,
        scale: 0,
        rotation: 360,
        stagger: 0.1,
        ease: "back.out(1.7)"
    }, "-=0.5")
    // Mostrar botón de cerrar
    .to(closeButton, {
        duration: 0.5,
        scale: 1,
        opacity: 1,
        rotation: 360,
        ease: "elastic.out(1, 0.5)",
        onStart: () => {
            closeButton.style.display = 'flex';
        }
    }, "-=0.3");
}

// Evento click en el botón de cerrar
closeButton.addEventListener('click', function() {
    closeLetter();
});

// Función para cerrar la carta y volver al sobre
function closeLetter() {
    const tl = gsap.timeline();
    
    // Animar el botón de cerrar
    tl.to(closeButton, {
        duration: 0.3,
        scale: 0,
        rotation: -180,
        opacity: 0,
        ease: "back.in(1.7)",
        onComplete: () => {
            closeButton.style.display = 'none';
        }
    })
    // Ocultar el contenido de la carta
    .to('.letter-body p', {
        duration: 0.3,
        y: -20,
        opacity: 0,
        stagger: 0.05,
        ease: "power2.in"
    }, "-=0.2")
    // Ocultar la carta
    .to(letter, {
        duration: 0.6,
        scale: 0.3,
        opacity: 0,
        y: 50,
        rotation: -10,
        ease: "back.in(1.7)",
        onComplete: () => {
            letter.style.pointerEvents = 'none';
            // Resetear posiciones
            gsap.set(letter, { scale: 0.3, y: 50, rotation: 0 });
            gsap.set('.letter-body p', { y: 0, opacity: 1 });
        }
    }, "-=0.1")
    // Restaurar el sobre
    .to(envelope, {
        duration: 0.8,
        scale: 1,
        opacity: 1,
        y: 0,
        rotation: 0,
        ease: "elastic.out(1, 0.6)",
        onComplete: () => {
            // Resetear el estado
            isOpened = false;
            gsap.set(envelopeFlap, { rotationX: 0 });
            gsap.set(kittyFace, { y: 0, scale: 1 });
        }
    }, "-=0.3")
    // Hello Kitty reaparece
    .from(kittyFace, {
        duration: 0.6,
        scale: 0,
        rotation: 180,
        ease: "back.out(1.7)"
    }, "-=0.5");
}

// Animación de partículas de corazones flotantes con GSAP
function createFloatingHearts() {
    const hearts = ['💕', '💖', '💗', '💝', '💓'];
    const container = document.querySelector('.container');
    
    setInterval(() => {
        if (isOpened && letter.style.pointerEvents === 'all') {
            const heart = document.createElement('div');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.className = 'floating-heart';
            heart.style.position = 'absolute';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.bottom = '-50px';
            heart.style.fontSize = Math.random() * 25 + 15 + 'px';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '1';
            
            container.appendChild(heart);
            
            // Animar con GSAP
            gsap.to(heart, {
                duration: 3 + Math.random() * 2,
                y: -window.innerHeight - 100,
                x: (Math.random() - 0.5) * 200,
                rotation: Math.random() * 360,
                opacity: 0,
                ease: "power1.out",
                onComplete: () => {
                    heart.remove();
                }
            });
        }
    }, 600);
}

// Iniciar animación de corazones flotantes
createFloatingHearts();

// Animación del sello en la carta
gsap.to('.hello-kitty-stamp', {
    duration: 2,
    rotation: "+=5",
    ease: "power1.inOut",
    repeat: -1,
    yoyo: true
});

// Prevenir que el click en la carta cierre el sobre
letter.addEventListener('click', function(e) {
    e.stopPropagation();
});

// Efecto de sonido (opcional - comentado por defecto)
// Puedes descomentar esto y agregar archivos de audio si lo deseas
/*
function playSound(soundFile) {
    const audio = new Audio(soundFile);
    audio.play();
}

// Usar en la función openEnvelope:
// playSound('open-sound.mp3');
*/
