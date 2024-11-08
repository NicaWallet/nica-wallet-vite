# NicaWallet - Personal Finance Management App

## Descripción

NicaWallet es una aplicación web para la gestión financiera personal que permite a los usuarios visualizar transferencias, gastos, ingresos, ajustar presupuestos y obtener proyecciones de movimientos financieros futuros.

## Features principales:

- Gestión de transacciones y presupuestos.
- Creación de cuentas personalizadas.
- Recomendaciones financieras.
- Roles de usuario con diferentes permisos.
- Interfaz multi-idioma.

## Tecnologías principales:

- **Frontend**: React, TypeScript, MUI, Vite.
- **Backend**: NestJS, Prisma ORM, PostgreSQL.
- **Estado**: React Hook Form, yup para validación de formularios.
- **Traducciones**: i18n para el soporte multi-idioma.

## Estructura del Proyecto

```
src/
├── api/                # Configuración de API (axios, etc.)
├── components/         # Componentes generales y reutilizables
├── config/             # Configuración general (API keys, rutas)
├── forms/              # Formularios complejos como Login y Register
├── hooks/              # Hooks personalizados como usePasswordStrength
├── locales/            # Archivos de traducción
├── pages/              # Páginas principales de la aplicación
├── schemas/            # Schemas de validación con Yup
├── types/              # Tipos de TypeScript usados en toda la app
└── utils/              # Utilidades como helpers, parsers, etc.
```

## Componentes principales

1. **Register Form**:

   - **Descripción**: Formulario para registro de usuarios, con validación mediante React Hook Form y Yup, incluyendo cálculo de fuerza de contraseñas.
   - **Archivo**: `src/pages/Register/index.tsx`
   - **Hooks**: `usePasswordStrength` para el manejo de la fortaleza de la contraseña.
   - **Traducciones**: Manejado por `i18n` en `locales/es` y `locales/en`.

2. **Loader**:

   - **Descripción**: Indicador de carga reutilizable que aparece mientras se realiza alguna acción.
   - **Archivo**: `src/components/Loader/index.tsx`

3. **ErrorSnackbar**:

   - **Descripción**: Componente de alerta para manejar errores en pantalla.
   - **Archivo**: `src/components/ErrorSnackbar/index.tsx`

4. **PasswordStrengthMeter**:

   - **Descripción**: Visualiza la fuerza de la contraseña en un registro o cambio de contraseña.
   - **Archivo**: `src/components/PasswordStrengthMeter/index.tsx`

5. **LanguageSwitcher**:
   - **Descripción**: Componente para cambiar entre idiomas.
   - **Archivo**: `src/components/LanguageSwitcher/index.tsx`

## Hooks personalizados

- **usePasswordStrength**: Calcula la fortaleza de la contraseña y controla la visibilidad del indicador.
  - **Archivo**: `src/hooks/usePasswordStrength.ts`

## Cómo empezar

1. **Instalación**:
   Clona el repositorio y ejecuta los siguientes comandos:

   ```bash
   npm install
   npm run dev
   ```

2. **Variables de entorno**:
   Asegúrate de configurar las variables de entorno necesarias en `.env`.

3. **Testeo**:
   Los tests unitarios se ejecutan con:
   ```bash
   npm run test
   ```
