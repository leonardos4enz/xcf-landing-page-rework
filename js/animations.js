// Animaciones para la sección Nosotros
const animateNosotros = () => {
    const section = document.querySelector('#nosotros');
    const text = section.querySelector('.nosotros-text');
    const image = section.querySelector('.image-container');

    if (section && text && image) {
        // Animación del título y subtítulo
        gsap.from(text.querySelector('h2'), {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'top 20%',
                scrub: 1
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power4.out'
        });

        // Animación del párrafo
        gsap.from(text.querySelector('p'), {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'top 20%',
                scrub: 1
            },
            y: 50,
            opacity: 0,
            duration: 1,
            delay: 0.2,
            ease: 'power4.out'
        });

        // Animación de la imagen con efecto de rotación
        gsap.from(image, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'top 20%',
                scrub: 1
            },
            x: -50,
            opacity: 0,
            rotate: -5,
            duration: 1,
            delay: 0.3,
            ease: 'power4.out'
        });
    }
};

// Animaciones para la sección Visión
const animateVision = () => {
    const section = document.querySelector('#vision');
    const text = section.querySelector('.vision-text');
    const image = section.querySelector('.image-container');

    if (section && text && image) {
        // Animación del título y subtítulo
        gsap.from(text.querySelector('h2'), {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'top 20%',
                scrub: 1
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power4.out'
        });

        // Animación del párrafo
        gsap.from(text.querySelector('p'), {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'top 20%',
                scrub: 1
            },
            y: 50,
            opacity: 0,
            duration: 1,
            delay: 0.2,
            ease: 'power4.out'
        });

        // Animación de la imagen con efecto de rotación y escala
        gsap.from(image, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'top 20%',
                scrub: 1
            },
            x: 50,
            opacity: 0,
            scale: 0.9,
            rotate: 5,
            duration: 1,
            delay: 0.3,
            ease: 'power4.out'
        });
    }
};

// Animaciones para la sección Valores
const animateValores = () => {
    const section = document.querySelector('#valores');
    const items = section.querySelectorAll('.valor-item');
    const title = section.querySelector('h2');
    const subtitle = section.querySelector('p');

    if (section && items.length > 0) {
        // Animación del título y subtítulo
        gsap.from(title, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'top 20%',
                scrub: 1
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power4.out'
        });

        gsap.from(subtitle, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'top 20%',
                scrub: 1
            },
            y: 50,
            opacity: 0,
            duration: 1,
            delay: 0.2,
            ease: 'power4.out'
        });

        // Animación de los valores con efectos de rotación y escala
        items.forEach((item, index) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    end: 'top 20%',
                    scrub: 1
                },
                y: 50,
                opacity: 0,
                rotate: -5,
                scale: 0.95,
                duration: 1,
                delay: 0.3 + (index * 0.1),
                ease: 'power4.out'
            });

            // Animación del ícono
            const icon = item.querySelector('.valor-icono');
            gsap.from(icon, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    end: 'top 20%',
                    scrub: 1
                },
                scale: 0.8,
                duration: 1,
                delay: 0.3 + (index * 0.1) + 0.1,
                ease: 'power4.out'
            });
        });
    }
};

// Inicializar animaciones cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Esperar un momento después del DOMContentLoaded para asegurar que todos los elementos estén listos
    setTimeout(() => {
        // Animación de Nosotros
        gsap.from('#nosotros .section-content h2', {
            scrollTrigger: {
                trigger: '#nosotros',
                start: 'top 80%',
                end: 'top 20%',
                scrub: true
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power4.out'
        });

        gsap.from('#nosotros .section-content p', {
            scrollTrigger: {
                trigger: '#nosotros',
                start: 'top 80%',
                end: 'top 20%',
                scrub: true
            },
            y: 50,
            opacity: 0,
            duration: 1,
            delay: 0.2,
            ease: 'power4.out'
        });

        gsap.from('#nosotros .image-container', {
            scrollTrigger: {
                trigger: '#nosotros',
                start: 'top 80%',
                end: 'top 20%',
                scrub: true
            },
            x: -50,
            opacity: 0,
            rotate: -5,
            duration: 1,
            delay: 0.3,
            ease: 'power4.out'
        });

        // Animación de Visión
        gsap.from('#vision .section-content h2', {
            scrollTrigger: {
                trigger: '#vision',
                start: 'top 80%',
                end: 'top 20%',
                scrub: true
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power4.out'
        });

        gsap.from('#vision .section-content p', {
            scrollTrigger: {
                trigger: '#vision',
                start: 'top 80%',
                end: 'top 20%',
                scrub: true
            },
            y: 50,
            opacity: 0,
            duration: 1,
            delay: 0.2,
            ease: 'power4.out'
        });

        gsap.from('#vision .image-container', {
            scrollTrigger: {
                trigger: '#vision',
                start: 'top 80%',
                end: 'top 20%',
                scrub: true
            },
            x: 50,
            opacity: 0,
            scale: 0.9,
            rotate: 5,
            duration: 1,
            delay: 0.3,
            ease: 'power4.out'
        });

        // Animación de Valores
        // Animación del título y subtítulo
        gsap.from('#valores h2', {
            scrollTrigger: {
                trigger: '#valores',
                start: 'top 80%',
                end: 'top 20%',
                scrub: true
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power4.out'
        });

        gsap.from('#valores p', {
            scrollTrigger: {
                trigger: '#valores',
                start: 'top 80%',
                end: 'top 20%',
                scrub: true
            },
            y: 50,
            opacity: 0,
            duration: 1,
            delay: 0.2,
            ease: 'power4.out'
        });

        // Animación de los valores con efectos de rotación y escala
        // Primero animamos los íconos
        gsap.from('.valor-item .valor-icono', {
            scrollTrigger: {
                trigger: '#valores',
                start: 'top 80%',
                end: 'top 20%',
                scrub: true
            },
            scale: 0.8,
            duration: 1,
            ease: 'power4.out'
        });

        // Luego animamos los items con un delay
        gsap.from('.valor-item', {
            scrollTrigger: {
                trigger: '#valores',
                start: 'top 80%',
                end: 'top 20%',
                scrub: true
            },
            y: 50,
            opacity: 0,
            rotate: -5,
            scale: 0.95,
            duration: 1,
            delay: 0.3,
            ease: 'power4.out'
        });
    }, 100);
});
