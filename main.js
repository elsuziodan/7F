/* 7F - SEVEN FACTOR 
  Professional Rebuild | Scroll Engine & Choreography
*/

import './style.css'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

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

    // ESPERAR ESTRICTAMENTE A QUE LA FUENTE DESCARGUE ANTES DE ANIMAR
    document.fonts.ready.then(() => {
      this.initAnimations()
      console.log('7F ENGINE: Fuentes cargadas. Animaciones inyectadas con éxito.')
    })
  }

  initLenis() {
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
    this.lenis.on('scroll', ScrollTrigger.update)
  }

  initGSAP() {
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

  // --- COREOGRAFÍA VISUAL BLINDADA ---
  initAnimations() {
    // 1. Cortar el texto respetando los espacios entre palabras
    const splitText = new SplitType('.philosophy', { types: 'words, chars' })

    // 2. Hacer visible el contenedor ahora que ya está cortado correctamente
    gsap.set('.philosophy', { visibility: 'visible' })

    // 3. Ocultar físicamente las letras al inicio para evitar parpadeos
    gsap.set(splitText.chars, { opacity: 0 })

    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero-tunnel",
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: 1,
      }
    })

    heroTl
      // Paso 1: El logo "7F" viaja masivamente hacia la cámara
      .to("#massive-logo", {
        scale: 30,
        opacity: 0,
        filter: "blur(30px)",
        duration: 2.5, // Le damos más tiempo para que despeje la pantalla
        ease: "power3.inOut"
      })
      // Paso 2: Las letras entran en 3D (usando fromTo para asegurar el estado inicial)
      .fromTo(splitText.chars,
        {
          opacity: 0,
          scale: 0,
          rotationX: -90,
          z: -500,
        },
        {
          opacity: 1,
          scale: 1,
          rotationX: 0,
          z: 0,
          stagger: 0.05,
          duration: 1.5,
          ease: "back.out(1.5)"
        },
        "-=1.5" // Entra un poco más tarde para que el 7F ya no estorbe
      )
      // Paso 3: Salida del texto
      .to(splitText.chars, {
        opacity: 0,
        y: -100,
        rotationX: 90,
        stagger: 0.02,
        duration: 1,
        ease: "power2.in"
      }, "+=0.5")
  }

  destroy() {
    this.lenis.destroy()
    gsap.ticker.remove(this.lenis.raf)
    ScrollTrigger.getAll().forEach(st => st.kill())
  }
}

const appInstance = new App()
export default appInstance