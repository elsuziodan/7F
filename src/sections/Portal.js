import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function initPortal() {
    const portalTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#experiences-portal",
        start: "top top",
        end: "+=200%",
        pin: true,
        scrub: 1,
      }
    });

    portalTl
      .to(".slide-medical", { clipPath: "inset(0% 0 0 0)", ease: "power2.inOut" })
      .to(".slide-medical", { duration: 0.2 }) 
      .to(".slide-industrial", { clipPath: "inset(0% 0 0 0)", ease: "power2.inOut" });
}
