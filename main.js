/* 7F - SEVEN FACTOR 
  Professional Rebuild | Scroll Engine & Choreography
*/

import './style.css'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Registro global de plugins GSAP
gsap.registerPlugin(ScrollTrigger)

class App {
  constructor() {
    this.lenis = null
    this.init()
  }

  init() {
    this.initLenis()
    this.initGSAP()
    this.initEvents()
    this.initAnimations()
    
    // Log de auditoría visual para confirmar en consola
    console.log('7F ENGINE INICIALIZADO - Motor de Scroll y Animaciones Listos.')
  }

  initLenis() {
    // Configuración Awwwards para experiencias de alto rendimiento
    this.lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false, 
      touchMultiplier: 2,
      infinite: false,
    })

    // Sincronizar ScrollTrigger con Lenis en cada scroll
    this.lenis.on('scroll', ScrollTrigger.update)
  }

  initGSAP() {
    // Vincular el ciclo de refresco (RAF) de Lenis al Ticker de GSAP
    gsap.ticker.add((time) => {
      this.lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)
  }

  initEvents() {
    window.addEventListener('resize', () => {
      this.lenis.resize()
    })
  }

  // --- COREOGRAFÍA VISUAL ---
  initAnimations() {
    // Timeline del Hero Tunnel (Z-Axis)
    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero-tunnel",
        start: "top top",
        end: "+=250%", // Controla la duración del viaje por el túnel
        pin: true,     // Fija la pantalla mientras ocurre la animación
        scrub: 1,      // Suavidad de interpolación atada al scroll
      }
    })

    heroTl
      // Paso 1: El logo hace zoom masivo hacia la cámara y se desenfoca
      .to("#massive-logo", {
        scale: 20, 
        opacity: 0,
        filter: "blur(20px)",
        duration: 2,
        ease: "power2.inOut"
      })
      // Paso 2: La filosofía aparece desde el "fondo" del túnel
      .to(".philosophy", {
        opacity: 1,
        scale: 1,
        stagger: 0.3,
        duration: 1.5,
        ease: "power2.out"
      }, "-=1.2") // Inicia antes de que el logo desaparezca por completo
      // Paso 3: El texto también se desvanece al continuar bajando
      .to(".philosophy", {
        opacity: 0,
        y: -50,
        duration: 1
      }, "+=0.5")
  }

  destroy() {
    this.lenis.destroy()
    gsap.ticker.remove(this.lenis.raf)
    ScrollTrigger.getAll().forEach(st => st.kill())
  }
}

// Singleton: Una única instancia controla todo
const appInstance = new App()
export default appInstance