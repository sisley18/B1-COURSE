---
description: Auto-push changes to GitHub for the B1 COURSE project
---

# B1 Course Deployment Workflow

**IMPORTANTE: Siempre hacer deploy automáticamente después de cualquier cambio.**

Cuando se hacen cambios al proyecto B1 COURSE:

1. Después de hacer CUALQUIER cambio de código, automáticamente hacer commit y push a GitHub
2. Usar mensajes de commit descriptivos que resuman los cambios
3. Push a la rama main de origin
4. Netlify desplegará automáticamente los cambios

## Comandos a ejecutar después de los cambios:
// turbo-all
```
git add -A
```
```
git commit -m "[mensaje descriptivo]"
```
```
git push origin main
```

## Sitio en producción:
- **URL:** https://stmaryslanguagecourse.netlify.app
- **Autor:** Cecilia Chiappero
- **Repositorio:** github.com/sisley18/B1-COURSE

Los estudiantes siempre obtienen la última versión cuando refrescan la página.
