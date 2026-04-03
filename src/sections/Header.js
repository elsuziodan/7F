import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function initHeader() {
    // 1. Animación de entrada sutil (pasa desapercibido al inicio)
    gsap.fromTo("#timeline-header", 
        { opacity: 0, y: -20 },
        { opacity: 0.3, y: 0, duration: 2, delay: 1, ease: "power2.out" }
    );

    // 2. Al empezar a bajar, el header se vuelve más visible
    ScrollTrigger.create({
        trigger: "body",
        start: "top -100", // Cuando el usuario baja 100px
        onEnter: () => gsap.to("#timeline-header", { opacity: 1, duration: 0.5 }),
        onLeaveBack: () => gsap.to("#timeline-header", { opacity: 0.3, duration: 0.5 })
    });

    // 3. La línea roja y el porcentaje avanzan con el scroll
    gsap.to(".progress-bar", {
        width: "100%",
        ease: "none",
        scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom", // Calcula el total de la página automáticamente
            scrub: 0.1, // Suaviza el avance
            onUpdate: (self) => {
                // Actualiza el texto con el porcentaje real de scroll
                const percentage = Math.round(self.progress * 100);
                document.querySelector('.section-indicator').innerText = `[ ${percentage < 10 ? '0'+percentage : percentage}% ]`;
            }
        }
    });
}
