# Servicios del Hogar - Trabajador independiente

Aplicación web construida con **React + SASS (Vite)** para presentar los
servicios de un único trabajador independiente dedicado a reparaciones,
mantenimiento, instalaciones y mejoras del hogar.

La experiencia principal permite conocer al trabajador, revisar servicios,
explorar trabajos realizados por área con placeholders de videos y fotos, y
enviar una solicitud de contacto.

## Funcionalidades representadas

- Hero personal con el mensaje: "Soluciones confiables para reparaciones y mejoras del hogar".
- Sección "Sobre mí" con enfoque en responsabilidad, puntualidad y trabajo versátil.
- Servicios: carpintería, fontanería, pintura, electricidad, albañilería,
  limpieza, jardinería, cerrajería, aire acondicionado, vidriería, tapicería y
  remodelaciones.
- Portafolio personal organizado por áreas de trabajo.
- Bloques por área con placeholders `Información Video_1`, `Información Video_2`,
  `Información Foto_1` y `Información Foto_2`.
- Formulario de contacto con nombre, teléfono, correo, servicio requerido y
  descripción del problema.

## Getting started

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Project structure

```text
src/
  main.jsx
  App.jsx
  styles/
    _tokens.scss
    global.scss
  components/
    Navbar/
    Hero/
    About/
    Stats/
    Services/
    Projects/
    WorkerProfile/
    Guarantee/
    Faq/
    CTA/
    Footer/
```

## SASS setup

Cada componente usa CSS Modules con SASS (`*.module.scss`). Los tokens globales
de color, spacing, radius, sombras y mixins viven en `src/styles/_tokens.scss` y
se inyectan automáticamente desde `vite.config.js`.
