import gsap from 'gsap'

export function initHero() {
    // Animación de entrada de los textos y botón
    gsap.from(".hero-text h1, .hero-text p, .cta-button", {
      y: 50, 
      opacity: 0, 
      duration: 1.5, 
      stagger: 0.2, 
      ease: "power3.out", 
      delay: 0.4
    });
    
    // Animación del Navbar
    gsap.from("#navbar", {
      y: -50, 
      opacity: 0, 
      duration: 1, 
      ease: "power3.out", 
      delay: 1
    });

    // Animación del gráfico 7F (Difuminado)
    gsap.fromTo(".hero-graphic", 
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 0.85, duration: 3, ease: "power2.out" }
    );
}
