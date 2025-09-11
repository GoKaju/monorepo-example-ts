# Payslips Generator

Este proyecto es una plataforma para la generación y gestión de recibos de sueldo (payslips) de manera automatizada y eficiente.

## Características principales

- Generación automática de recibos de sueldo en distintos formatos.
- Soporte para múltiples aplicaciones (frontend, backend, etc.) bajo la carpeta `apps/`.
- Arquitectura basada en bounded contexts bajo `contexts/` para una mejor organización del dominio.
- Librerías y utilidades compartidas en `libs/`.
- Configuración de infraestructura y despliegue en `infra/`.
- Uso de TypeScript, Vitest para pruebas y pnpm para la gestión de paquetes y workspaces.

## Estructura del proyecto

Consulta el archivo `README.folders.md` para una descripción detallada de cada carpeta principal.

## Instalación

1. Clona el repositorio.
2. Instala las dependencias usando pnpm:
   ```sh
   pnpm install
   ```

## Scripts útiles

- `pnpm build`: Compila los paquetes y aplicaciones.
- `pnpm test`: Ejecuta las pruebas con Vitest.
- `pnpm dev`: Inicia el entorno de desarrollo (según la app seleccionada).
- `pnpm add-new <type> <name>`: Crea la estructura básica de una nueva aplicación, contexto o librería. Reemplaza `<type>` por `app`, `context` o `lib` y `<name>` por el nombre deseado.

## Contribución

1. Crea un branch desde `main`.
2. Realiza tus cambios y agrega pruebas si es necesario.
3. Abre un Pull Request.

## Licencia

ISC
