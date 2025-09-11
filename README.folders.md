# Estructura de carpetas del proyecto

Este documento describe el propósito de cada carpeta principal en el repositorio.

- **apps/**: Contiene las aplicaciones principales del proyecto. Cada subcarpeta suele ser una aplicación independiente (por ejemplo, frontend, backend, etc.).
- **contexts/**: Incluye cada uno de los bounded contexts del dominio, encapsulando la lógica y las reglas específicas de cada contexto.
- **infra/**: Infraestructura y configuración relacionada con el despliegue, scripts de CI/CD, Docker, y otros recursos de infraestructura.
- **libs/**: Librerías reutilizables, utilidades y módulos compartidos entre aplicaciones.

Otros archivos y carpetas relevantes:

- `eslint.config.js`, `tsconfig.json`, etc.: Archivos de configuración para herramientas y compiladores.
- `vitest.config.ts`: Archivo de configuración para Vitest, el framework de pruebas.
- `package.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml`: Archivos de gestión de dependencias y workspaces.
