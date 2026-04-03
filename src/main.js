import './style.css'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// 1. IMPORTAMOS TUS MÓDULOS AISLADOS
import { initHero } from './sections/Hero.js'
import { initPortal } from './sections/Portal.js'
import { initHeader } from './sections/Header.js'

gsap.registerPlugin(ScrollTrigger)

class App {
  constructor() {
    this.lenis = null
    this.init()
  }

  init() {
    // Inicializar Motor Principal
    this.initLenis()
    this.initGSAP()
    this.initEvents()
    
    // 2. EJECUTAR MÓDULOS DE SECCIONES
    // Si una sección falla, las demás siguen funcionando
    try { initHeader() } catch(e) { console.error("Error en Header:", e) }
    try { initHero() } catch(e) { console.error("Error en Hero:", e) }
    try { initPortal() } catch(e) { console.error("Error en Portal:", e) }
    
    console.log('7F ENGINE: Arquitectura Modular Lista.')
  }

  initLenis() {
    this.lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
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
}

const appInstance = new App()
export default appInstance