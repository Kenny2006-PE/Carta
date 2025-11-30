// Importar GSAP
import { gsap } from 'gsap';

// Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎀 Carta Hello Kitty cargada');
    
    // Obtener elementos del DOM
    const envelope = document.getElementById('envelope');
    const letter = document.getElementById('letter');
    const closeButton = document.getElementById('closeButton');
    const envelopeFlap = document.querySelector('.envelope-flap');
    const kittyFace = document.querySelector('.kitty-face');
    const letterPaper = document.querySelector('.letter');
    
    // Variable para controlar si el sobre ya fue abierto
    let isOpened = false;
    
    // Inicializar Particles.js si está disponible
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 40,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ['#ff6fb5', '#ffb3d9', '#ff8dc7', '#ffc9e5']
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: 0.4,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 0.8,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 6,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 3,
                        size_min: 2,
                        sync: false
                    }
                },
                line_linked: {
                    enable: false
                },
                move: {
                    enable: true,
                    speed: 1.2,
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
                    resize: true
                },
                modes: {
                    bubble: {
                        distance: 120,
                        size: 10,
                        duration: 2,
                        opacity: 0.6
                    }
                }
            },
            retina_detect: true
        });
    }
    
    // Animación inicial del sobre con GSAP
    gsap.from(envelope, {
        duration: 1.3,
        scale: 0.7,
        opacity: 0,
        y: 80,
        ease: "elastic.out(1, 0.6)",
        delay: 0.2
    });
    
    // Animación de entrada de Hello Kitty
    gsap.from(kittyFace, {
        duration: 1.2,
        scale: 0,
        rotation: -360,
        ease: "back.out(2)",
        delay: 0.8
    });
    
    // Animación continua de los corazones
    gsap.to('.heart', {
        duration: 1.8,
        scale: 1.3,
        opacity: 0.7,
        ease: "power1.inOut",
        stagger: 0.25,
        repeat: -1,
        yoyo: true
    });
    
    // Evento click en el sobre
    envelope.addEventListener('click', function() {
        if (!isOpened) {
            console.log('📬 Abriendo sobre...');
            openEnvelope();
            isOpened = true;
        }
    });
    
    // Función para abrir el sobre con animaciones fluidas
    function openEnvelope() {
        // Timeline de GSAP para secuenciar las animaciones
        const tl = gsap.timeline();
        
        console.log('✨ Iniciando animación de apertura');
        
        // 1. Animación de temblor del sobre
        tl.to(envelope, {
            duration: 0.08,
            rotation: -4,
            repeat: 7,
            yoyo: true,
            ease: "power2.inOut"
        })
        
        // 2. Abrir la solapa del sobre
        .to(envelopeFlap, {
            duration: 1,
            rotationX: -180,
            transformOrigin: "top center",
            ease: "power2.inOut"
        }, "-=0.4")
        
        // 3. Hello Kitty salta de alegría
        .to(kittyFace, {
            duration: 0.5,
            y: -25,
            scale: 1.15,
            ease: "power2.out"
        }, "-=0.7")
        .to(kittyFace, {
            duration: 0.4,
            y: 0,
            scale: 1,
            ease: "bounce.out"
        })
        
        // 4. El sobre se hace más pequeño y desaparece
        .to(envelope, {
            duration: 0.8,
            scale: 0.2,
            opacity: 0,
            y: -120,
            rotation: 15,
            ease: "back.in(2)"
        }, "-=0.3")
        
        // 5. La carta aparece con efecto elástico
        .to(letter, {
            duration: 1.1,
            scale: 1,
            opacity: 1,
            y: 0,
            ease: "elastic.out(1, 0.7)",
            onStart: () => {
                letter.style.pointerEvents = 'all';
                console.log('💌 Carta visible');
            }
        }, "-=0.4")
        
        // 6. Animar el encabezado de la carta
        .from('.letter-header', {
            duration: 0.7,
            x: 60,
            opacity: 0,
            ease: "power3.out"
        }, "-=0.6")
        
        // 7. Título de la carta aparece
        .from('.letter-body h1', {
            duration: 0.8,
            y: 40,
            opacity: 0,
            scale: 0.8,
            ease: "back.out(2)"
        }, "-=0.5")
        
        // 8. Los párrafos aparecen uno por uno
        .from('.letter-body p', {
            duration: 0.6,
            y: 25,
            opacity: 0,
            stagger: 0.15,
            ease: "power2.out"
        }, "-=0.4")
        
        // 9. Firma aparece
        .from('.signature', {
            duration: 0.7,
            scale: 0,
            opacity: 0,
            rotation: -10,
            ease: "back.out(1.7)"
        }, "-=0.3")
        
        // 10. Corazones decorativos
        .from('.decoration-hearts span', {
            duration: 0.6,
            scale: 0,
            rotation: 720,
            stagger: 0.12,
            ease: "back.out(2)"
        }, "-=0.6")
        
        // 11. Botón de cerrar aparece girando
        .to(closeButton, {
            duration: 0.7,
            scale: 1,
            opacity: 1,
            rotation: 360,
            ease: "elastic.out(1, 0.6)",
            onStart: () => {
                closeButton.style.display = 'flex';
                console.log('❌ Botón cerrar visible');
            }
        }, "-=0.4");
    }
    
    // Evento click en el botón de cerrar
    closeButton.addEventListener('click', function() {
        console.log('🔙 Cerrando carta...');
        closeLetter();
    });
    
    // Función para cerrar la carta y volver al sobre
    function closeLetter() {
        const tl = gsap.timeline();
        
        // 1. Animar el botón de cerrar
        tl.to(closeButton, {
            duration: 0.4,
            scale: 0,
            rotation: -360,
            opacity: 0,
            ease: "back.in(2)",
            onComplete: () => {
                closeButton.style.display = 'none';
            }
        })
        
        // 2. Ocultar contenido de la carta
        .to('.letter-body p, .signature, .decoration-hearts span', {
            duration: 0.35,
            y: -25,
            opacity: 0,
            stagger: 0.04,
            ease: "power2.in"
        }, "-=0.2")
        
        // 3. Ocultar título
        .to('.letter-body h1', {
            duration: 0.4,
            scale: 0.7,
            opacity: 0,
            ease: "back.in(2)"
        }, "-=0.2")
        
        // 4. Ocultar la carta
        .to(letter, {
            duration: 0.7,
            scale: 0.2,
            opacity: 0,
            y: 70,
            rotation: -15,
            ease: "back.in(2)",
            onComplete: () => {
                letter.style.pointerEvents = 'none';
                // Resetear posiciones para la próxima apertura
                gsap.set(letter, { scale: 0.3, y: 50, rotation: 0 });
                gsap.set('.letter-body p, .signature, .decoration-hearts span, .letter-body h1, .letter-header', { 
                    clearProps: 'all' 
                });
            }
        }, "-=0.15")
        
        // 5. Restaurar el sobre
        .to(envelope, {
            duration: 1,
            scale: 1,
            opacity: 1,
            y: 0,
            rotation: 0,
            ease: "elastic.out(1, 0.7)",
            onComplete: () => {
                // Resetear el estado
                isOpened = false;
                gsap.set(envelopeFlap, { rotationX: 0 });
                gsap.set(kittyFace, { y: 0, scale: 1 });
                console.log('📬 Sobre restaurado');
            }
        }, "-=0.4")
        
        // 6. Hello Kitty reaparece
        .from(kittyFace, {
            duration: 0.8,
            scale: 0,
            rotation: 360,
            ease: "back.out(2)"
        }, "-=0.6");
    }
    
    // Animación de partículas de corazones flotantes
    function createFloatingHearts() {
        const hearts = ['💕', '💖', '💗', '💝', '💓', '💞'];
        const container = document.querySelector('.container');
        
        setInterval(() => {
            if (isOpened && letter.style.pointerEvents === 'all') {
                const heart = document.createElement('div');
                heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
                heart.className = 'floating-heart';
                heart.style.position = 'absolute';
                heart.style.left = (10 + Math.random() * 80) + '%';
                heart.style.bottom = '-60px';
                heart.style.fontSize = (18 + Math.random() * 30) + 'px';
                heart.style.pointerEvents = 'none';
                heart.style.zIndex = '1';
                heart.style.userSelect = 'none';
                
                container.appendChild(heart);
                
                // Animar con GSAP
                gsap.to(heart, {
                    duration: 3.5 + Math.random() * 2.5,
                    y: -(window.innerHeight + 150),
                    x: (Math.random() - 0.5) * 250,
                    rotation: (Math.random() - 0.5) * 720,
                    opacity: 0,
                    ease: "none",
                    onComplete: () => {
                        heart.remove();
                    }
                });
            }
        }, 700);
    }
    
    // Iniciar animación de corazones flotantes
    createFloatingHearts();
    
    // Animación del sello en la carta
    gsap.to('.hello-kitty-stamp', {
        duration: 2.5,
        rotation: "+=7",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
    });
    
    // Prevenir que el click en la carta cierre el sobre
    letter.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    console.log('✅ Todo inicializado correctamente');
});
