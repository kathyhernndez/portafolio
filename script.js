document.addEventListener('DOMContentLoaded', function() {
    // ===== Menú Hamburguesa =====
const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('.nav-list');

if(hamburger && navList) {
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation(); // Evitar que el click se propague
        this.classList.toggle('active');
        navList.classList.toggle('active');
        
        if(navList.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Cerrar menú al hacer click en cualquier parte del documento
    document.addEventListener('click', function(e) {
        if(navList.classList.contains('active') && 
           !e.target.closest('.nav-list') && 
           !e.target.closest('.hamburger')) {
            hamburger.classList.remove('active');
            navList.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}
    // Cerrar menú al hacer clic en un enlace (mobile)
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if(window.innerWidth <= 768 && navList.classList.contains('active')) {
                hamburger.classList.remove('active');
                navList.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // ===== Efecto de Typing =====
    function initTypingEffect() {
        const typingText = document.querySelector('.typing-text');
        const cursor = document.querySelector('.typing-cursor');
        
        if(!typingText || !cursor) return;
        
        const words = ["Kexing", "Portafolio", "Desarrolladora", "Creadora", "Programadora"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isEnd = false;
        
        function type() {
            const currentWord = words[wordIndex];
            const currentChar = currentWord.substring(0, charIndex);
            
            typingText.textContent = currentChar;
            
            if(!isDeleting && charIndex < currentWord.length) {
                // Escribiendo
                charIndex++;
                setTimeout(type, 100);
            } else if(isDeleting && charIndex > 0) {
                // Borrando
                charIndex--;
                setTimeout(type, 50);
            } else {
                // Cambiando palabra
                isDeleting = !isDeleting;
                if(!isDeleting) wordIndex = (wordIndex + 1) % words.length;
                setTimeout(type, 1000);
            }
        }
        
        // Iniciar el efecto
        setTimeout(type, 1000);
        
        // Ocultar cursor cuando no está en uso
        document.addEventListener('click', () => {
            cursor.style.animation = 'none';
            setTimeout(() => {
                cursor.style.animation = '';
            }, 100);
        });
    }

    initTypingEffect();

    // ===== Dark Mode con LocalStorage =====
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    
    if(darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
        
        // Verificar preferencia al cargar
        if(localStorage.getItem('darkMode') === 'enabled') {
            document.body.classList.add('dark-mode');
            updateDarkModeIcon(true);
        }
    }

    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        
        updateDarkModeIcon(isDark);
        localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
    }

    function updateDarkModeIcon(isDark) {
        const icon = darkModeToggle.querySelector('i');
        if(icon) {
            icon.classList.toggle('fa-moon', !isDark);
            icon.classList.toggle('fa-sun', isDark);
        }
    }

    // ===== Sistema de Partículas =====
    if(document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#6c5ce7" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: { enable: true, distance: 150, color: "#6c5ce7", opacity: 0.4, width: 1 },
                move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out" }
            },
            interactivity: {
                events: {
                    onhover: { enable: true, mode: "grab" },
                    onclick: { enable: true, mode: "push" }
                }
            }
        });
    }

    // ===== Slider de Testimonios =====
    const initTestimonialSlider = () => {
        const testimonials = document.querySelectorAll('.testimonial-card');
        const dotsContainer = document.querySelector('.slider-dots');
        let currentIndex = 0;

        if(!testimonials.length || !dotsContainer) return;

        // Crear dots de navegación
        testimonials.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if(index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => showTestimonial(index));
            dotsContainer.appendChild(dot);
        });

        function showTestimonial(index) {
            testimonials.forEach(testimonial => testimonial.classList.remove('active'));
            document.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));
            
            testimonials[index].classList.add('active');
            document.querySelectorAll('.dot')[index].classList.add('active');
            currentIndex = index;
        }

        // Controles del slider
        document.querySelector('.slider-next')?.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        });

        document.querySelector('.slider-prev')?.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            showTestimonial(currentIndex);
        });

        // Auto-rotación cada 5 segundos
        setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        }, 5000);
    };

    initTestimonialSlider();

    // ===== Mini Juego (Easter Egg) =====
    const initMiniGame = () => {
    const gameTrigger = document.getElementById('game-trigger');
    const miniGame = document.querySelector('.mini-game');
    
    if(!gameTrigger || !miniGame) return;

    gameTrigger.addEventListener('click', (e) => {
        e.stopPropagation(); // Evitar que el click se propague
        miniGame.style.display = miniGame.style.display === 'block' ? 'none' : 'block';
        if(miniGame.style.display === 'block') startGame();
    });

    // Cerrar al hacer click fuera
    document.addEventListener('click', (e) => {
        if(miniGame.style.display === 'block' && 
           !e.target.closest('.mini-game') && 
           !e.target.closest('#game-trigger')) {
            miniGame.style.display = 'none';
        }
    });

        function startGame() {
            const gameArea = document.querySelector('.game-area');
            const gameScore = document.querySelector('.game-score span');
            let score = 0;
            
            gameArea.innerHTML = '';
            gameScore.textContent = score;

            function createTarget() {
                const target = document.createElement('div');
                target.className = 'game-target';
                target.innerHTML = '<i class="fab fa-js"></i>';
                
                // Posición aleatoria
                const maxX = gameArea.offsetWidth - 40;
                const maxY = gameArea.offsetHeight - 40;
                const x = Math.random() * maxX;
                const y = Math.random() * maxY;
                
                target.style.left = `${x}px`;
                target.style.top = `${y}px`;
                
                target.addEventListener('click', () => {
                    score++;
                    gameScore.textContent = score;
                    target.remove();
                    createTarget();
                });
                
                gameArea.appendChild(target);
            }
            
            // Crear objetivos iniciales
            for(let i = 0; i < 5; i++) {
                createTarget();
            }
        }
    };

    initMiniGame();

    // ===== Scroll Suave y Navegación Activa =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if(targetElement) {
            // Remover active de todos los enlaces primero
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            
            // Agregar active al enlace clickeado
            this.classList.add('active');
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });

    // ===== Carrusel de Habilidades =====
function initSkillsCarousel() {
    const skillsTrack = document.querySelector('.skills-track');
    
    if(!skillsTrack) return;
    
    // Pausar animación al hacer hover
    skillsTrack.addEventListener('mouseenter', () => {
        skillsTrack.style.animationPlayState = 'paused';
    });
    
    skillsTrack.addEventListener('mouseleave', () => {
        skillsTrack.style.animationPlayState = 'running';
    });
    
    // Touch events para móviles
    let touchStartX = 0;
    let touchEndX = 0;
    
    skillsTrack.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        skillsTrack.style.animationPlayState = 'paused';
    }, {passive: true});
    
    skillsTrack.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        skillsTrack.style.animationPlayState = 'running';
    }, {passive: true});
    
    function handleSwipe() {
        const threshold = 50;
        if (touchStartX - touchEndX > threshold) {
            // Swipe izquierda
        } else if (touchEndX - touchStartX > threshold) {
            // Swipe derecha
        }
    }
}

// Llamar la función al cargar
document.addEventListener('DOMContentLoaded', initSkillsCarousel);
});

// Actualizar navegación activa al hacer scroll
window.addEventListener('scroll', updateActiveNav);

function updateActiveNav() {
    const scrollPosition = window.scrollY + 100; // Ajuste para mejor detección
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if(scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Remover active de todos los enlaces
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            
            // Agregar active al enlace correspondiente
            if(navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

    // ===== Formulario de Contacto =====
    const contactForm = document.getElementById('contact-form');
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simular envío
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            
            setTimeout(() => {
                submitBtn.textContent = '¡Enviado!';
                this.reset();
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }, 1500);
        });
    }

    // ===== Año actual en el footer =====
    const yearElement = document.getElementById('year');
    if(yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});



