---
name: gsap-orchestrator
description: Creador avanzado de animaciones Awwwards-style, coreografías complejas del DOM y experiencias inmersivas basadas en scroll usando GSAP 3 y ScrollTrigger.
---

## How to use it

### 1. Preparación y Estructura
- Analiza la estructura HTML/DOM del usuario. Si la animación requiere "scroll-jacking", genera primero la estructura de contenedores necesaria (`.pin-container`, `.panel`, etc.) antes de escribir el script.

### 2. Reglas Estrictas de GSAP 3
- Usa EXCLUSIVAMENTE la sintaxis moderna (ej. `gsap.timeline()`, `gsap.to()`).
- NUNCA uses tweens (`gsap.to`) sueltos para secuencias. Orquesta TODO dentro de un `gsap.timeline()` para garantizar el control del tiempo.

### 3. Interacciones Avanzadas (ScrollTrigger)
- Al crear efectos de scroll profundo, configura meticulosamente los valores de `start` y `end`.
- Usa `scrub: 1` para suavizar la interpolación si la animación está atada a la rueda del ratón.
- Utiliza `pin: true` cuando necesites congelar una sección mientras sus elementos internos se animan.

### 4. Rendimiento (Hardware Acceleration)
- REGLA DE ORO: Para evitar el "layout thrashing", anima ÚNICAMENTE las propiedades que maneja la GPU: `x`, `y`, `scale`, `rotation`, y `opacity`. 
- NUNCA animes propiedades que recalculen el layout como `width`, `height`, `top`, `margin` o `left`.

### 5. Control Responsivo
- Toda coreografía compleja DEBE estar envuelta en `gsap.matchMedia()`. 
