document.addEventListener('DOMContentLoaded', function() {
    const texts = document.querySelectorAll('.hero-text');
    let currentIndex = 0;
    const interval = 5000; // 5 segundos
    let isTransitioning = false;

    // Función para cambiar al siguiente texto
    function showNextText() {
        if (isTransitioning) return;
        isTransitioning = true;
        
        // Ocultar el texto actual
        const currentText = texts[currentIndex];
        currentText.classList.remove('active');
        
        // Calcular el índice del siguiente texto
        currentIndex = (currentIndex + 1) % texts.length;
        
        // Esperar a que termine la transición de salida antes de mostrar el siguiente
        setTimeout(() => {
            // Mostrar el siguiente texto
            const nextText = texts[currentIndex];
            nextText.classList.add('active');
            
            // Restablecer el estado de transición después de que termine la animación
            setTimeout(() => {
                isTransitioning = false;
            }, 1000); // Tiempo suficiente para que terminen las animaciones
            
        }, 800); // Tiempo de la transición de salida
    }

    // Iniciar el slider automáticamente después de que se cargue la página
    let slider;
    setTimeout(() => {
        slider = setInterval(showNextText, interval);
    }, 1000); // Pequeño retraso inicial

    // Pausar el slider cuando el mouse está sobre el área del texto
    const heroSection = document.querySelector('.video-hero');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', () => {
            clearInterval(slider);
        });

        heroSection.addEventListener('mouseleave', () => {
            clearInterval(slider);
            slider = setInterval(showNextText, interval);
        });
    }
    texts.forEach((text, index) => {
        text.addEventListener('click', () => {
            texts[currentIndex].classList.remove('active');
            currentIndex = index;
            texts[currentIndex].classList.add('active');
            
            // Reiniciar el intervalo
            clearInterval(slider);
            slider = setInterval(showNextText, interval);
        });
    });
});
