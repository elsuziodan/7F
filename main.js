/* 
  7F - SEVEN FACTOR 
  Professional Rebuild | Scroll Engine Initializer 
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
    
    // Log de auditoría visual para confirmar que los cimientos están listos
    console.log('7F ENGINE INICIALIZADO - Estructura Awwwards Lista.')
  }

  initLenis() {
    // Configuración recomendada para experiencias de alto rendimiento
    this.lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false, // Desactivado para evitar fricción en móviles
      touchMultiplier: 2,
      infinite: false,
    })

    // Sincronizar ScrollTrigger con Lenis en cada scroll
    this.lenis.on('scroll', ScrollTrigger.update)
  }

  initGSAP() {
    // Vincular el ciclo de refresco (RAF) de Lenis al Ticker de GSAP
    // Esto es más eficiente que tener dos RAFs separados compitiendo
    gsap.ticker.add((time) => {
      this.lenis.raf(time * 1000)
    })

    // Optimización de la suavidad del Ticker
    gsap.ticker.lagSmoothing(0)
  }

  initEvents() {
    // Garbage Collection / Cleanup & Reflow management
    window.addEventListener('resize', () => {
      this.lenis.resize()
    })

    // Escucha global de errores de ScrollTrigger en entorno dev
    ScrollTrigger.addEventListener("refreshInit", () => {
      // Cualquier lógica de pre-cálculo aquí
    })
  }

  /**
   * Método de limpieza manual
   * Usar si el proyecto escala a una SPA con transiciones de página
   */
  destroy() {
    this.lenis.destroy()
    gsap.ticker.remove(this.lenis.raf)
    ScrollTrigger.getAll().forEach(st => st.kill())
  }
}

// Singleton: Una única instancia controla todo el flujo de scroll de la aplicación
const appInstance = new App()

export default appInstance
