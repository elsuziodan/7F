/* 
  7F - SEVEN FACTOR 
  GSAP Orchestration Script with Awwwards Polish
*/

gsap.registerPlugin(ScrollTrigger);

const initAnimations = () => {
    // 1. LENIS SMOOTH SCROLL
    const lenis = new Lenis({
        lerp: 0.1,
        smoothTouch: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // 2. SPLIT TYPE INITIALIZATION
    const splitTypes = document.querySelectorAll('#hero h1, #hero h2, .philosophy-text, .massive-title');
    splitTypes.forEach(char => {
        const text = new SplitType(char, { types: 'chars,lines' });
        // Wrap lines for clip-path effect
        text.lines.forEach(line => {
            const wrapper = document.createElement('div');
            wrapper.classList.add('line-mask');
            line.parentNode.insertBefore(wrapper, line);
            wrapper.appendChild(line);
        });
    });

    // 3. CUSTOM MAGNETIC CURSOR
    const cursor = document.querySelector('.custom-cursor');
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };
    const speed = 0.15;

    const xSet = gsap.quickTo(cursor, "x", { duration: 0.3, ease: "power3" });
    const ySet = gsap.quickTo(cursor, "y", { duration: 0.3, ease: "power3" });

    window.addEventListener("mousemove", e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        xSet(mouse.x - 10);
        ySet(mouse.y - 10);
    });

    // Magnetic Effect
    const magneticElements = document.querySelectorAll('.service-card, .showcase-item, .full-width-cta');
    magneticElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(cursor, { scale: 4, duration: 0.3 });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(cursor, { scale: 1, duration: 0.3 });
        });
    });

    let mm = gsap.matchMedia();

    // DESKTOP & TABLET (>768px)
    mm.add("(min-width: 769px)", () => {
        
        // 1. HERO Z-AXIS WALKTHROUGH + KINETIC TYPO
        const heroTl = gsap.timeline({
            scrollTrigger: {
                trigger: "#hero",
                start: "top top",
                end: "+=400%",
                pin: true,
                scrub: 2,
                anticipatePin: 1,
            }
        });

        heroTl
            .to("#logo-main .char", {
                scale: 100,
                opacity: 0,
                stagger: {
                    amount: 0.5,
                    from: "center"
                },
                duration: 3,
                ease: "power4.inOut"
            })
            .to("#hero h2 .char", {
                opacity: 0,
                yPercent: -100,
                stagger: 0.02,
                duration: 1.5,
                ease: "power2.in"
            }, 0)
            .from(".philosophy-text .char", {
                yPercent: 100,
                opacity: 0,
                stagger: 0.05,
                duration: 2,
                ease: "expo.out"
            }, 1.2);

        // 2. SERVICES STAGGERED ENTRANCE
        gsap.from(".service-card", {
            scrollTrigger: {
                trigger: "#services",
                start: "top 90%",
            },
            y: 150,
            opacity: 0,
            stagger: 0.1,
            duration: 1.5,
            ease: "power4.out"
        });

        // 3. SHOWCASE REVEAL & PARALLAX
        const showcaseItems = gsap.utils.toArray(".showcase-item");
        showcaseItems.forEach((item) => {
            const overlay = item.querySelector(".reveal-overlay");
            const img = item.querySelector(".parallax-img");
            const info = item.querySelector(".showcase-info");

            gsap.to(overlay, {
                scrollTrigger: {
                    trigger: item,
                    start: "top 90%",
                },
                scaleX: 0,
                duration: 1.5,
                ease: "power4.inOut"
            });

            gsap.to(img, {
                scrollTrigger: {
                    trigger: item,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                },
                y: "20%",
                ease: "none"
            });

            gsap.from(info, {
                scrollTrigger: {
                    trigger: item,
                    start: "top 80%",
                },
                opacity: 0,
                y: 30,
                duration: 1,
                delay: 0.5
            });
        });

        // 4. CONTACT SECTION REVEAL
        const contactTl = gsap.timeline({
            scrollTrigger: {
                trigger: "#contact",
                start: "top 80%",
            }
        });

        contactTl
            .from(".massive-title .char", {
                yPercent: 100,
                stagger: 0.02,
                duration: 1.5,
                ease: "power4.out"
            })
            .from(".form-group", {
                opacity: 0,
                y: 50,
                stagger: 0.2,
                duration: 1,
                ease: "power3.out"
            }, "-=1")
            .from(".full-width-cta", {
                y: 100,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            }, "-=0.5");

        // FLASH INTERACTION
        const contactForm = document.querySelector(".contact-form");
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const flash = gsap.timeline();
            flash.to("body", { backgroundColor: "#FFFFFF", duration: 0.05 })
                 .to("body", { backgroundColor: "#0B0B0C", duration: 0.5, ease: "power2.in" });
            
            const btnText = contactForm.querySelector(".full-width-cta .cta-text");
            btnText.innerText = "SEÑAL ENVIADA";
        });

        return () => {};
    });

    // MOBILE (<=768px)
    mm.add("(max-width: 768px)", () => {
        gsap.to(".philosophy-text .char", {
            scrollTrigger: {
                trigger: "#philosophy",
                start: "top 80%",
            },
            opacity: 1,
            yPercent: 0,
            stagger: 0.02,
            duration: 1
        });

        gsap.to(".service-card", {
            scrollTrigger: {
                trigger: "#services",
                start: "top 90%",
            },
            opacity: 1,
            y: 0,
            stagger: 0.2
        });

        gsap.utils.toArray(".showcase-item").forEach(item => {
            gsap.to(item.querySelector(".reveal-overlay"), {
                scrollTrigger: {
                    trigger: item,
                    start: "top 95%",
                },
                scaleX: 0,
                duration: 1
            });
        });
    });
};

// Start
window.addEventListener("load", initAnimations);
