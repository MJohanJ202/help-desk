# 🎫 HelpDesk - Sistema de Gestión de Tickets de Soporte

Plataforma web moderna, rápida y segura para la administración y seguimiento integral de tickets de incidencias y soporte técnico. Diseñada con arquitectura basada en **Next.js (App Router)**, **Server Actions**, **TypeScript** y **Supabase**, ofreciendo una experiencia de usuario fluida, reactiva y optimizada para alto rendimiento.

---

## 🚀 ¿Qué hace este proyecto?

**HelpDesk** permite a colaboradores y equipos técnicos gestionar el ciclo de vida completo de solicitudes de soporte e incidencias de infraestructura o software:
- **Reportar incidencias** adjuntando capturas de pantalla o evidencias fotográficas.
- **Seguimiento en tiempo real** de estados (Abierto, En Proceso, Esperando Piezas, Resuelto, Cerrado) y niveles de prioridad (Baja, Media, Alta, Urgente/Crítica).
- **Consultar estadísticas y métricas clave** para supervisar la carga de trabajo del soporte técnico.
- **Explorar y localizar incidencias** mediante búsquedas inteligentes y filtros dinámicos optimizados para no saturar el ancho de banda.
- **Navegación fluida y ligera** gracias a paginación en el servidor con **Infinite Scroll** nativo.

---

## ✨ Funcionalidades Principales

### 1. 🔐 Autenticación y Perfil de Usuario
- Autenticación segura mediante **Supabase Auth** con cookies y sesiones de servidor (`@supabase/ssr`).
- Registro, inicio de sesión y flujo de recuperación de contraseña vía correo electrónico.
- Gestión de perfil: actualización de datos personales, teléfono con selector de código de país internacional y subida de avatar a Supabase Storage.

### 2. 📋 Gestión Integral de Tickets (CRUD)
- **Creación de tickets:** Formulario validado con **Zod** y **React Hook Form**. Permite definir título, descripción, prioridad, estado y adjuntar imágenes vía *drag & drop* o selector de archivos.
- **Actualización flexible:** Edición de datos y posibilidad de sustituir la imagen existente o conservarla, sincronizando automáticamente el almacenamiento en la nube.
- **Eliminación segura:** Modal de confirmación con borrado en cascada tanto del registro en la base de datos como de la imagen en el bucket de almacenamiento.
- **Vista detallada y Lightbox:** Modal expandido para revisar detalles y visor de imágenes en alta resolución.

### 3. 🔍 Búsqueda y Filtrado Inteligente con Debounce
- **Búsqueda por texto:** Filtra en tiempo real por título y descripción.
- **Optimización de ancho de banda:** Implementación de un hook personalizado **`useDebounce`** (400ms) en la barra de búsqueda para evitar peticiones innecesarias por cada pulsación de tecla.
- **Filtros por Estado y Prioridad:** Selección instantánea con contadores visuales de filtros activos.
- **Diseño Responsive:** Filtros directos en desktop y modal adaptado en dispositivos móviles.
- **Limpieza rápida:** Botón para restablecer filtros y estados vacíos (*Empty State*) personalizados.

### 4. ♾️ Infinite Scroll y Paginación en Servidor
- **Paginación eficiente:** Uso de `.range(from, to)` y `{ count: "exact" }` en Supabase para evitar transferencias de datos pesadas.
- **IntersectionObserver:** Detección automática del final del listado mediante un centinela para cargar la siguiente página de forma fluida.
- **Skeleton Loaders:** Animaciones de carga suaves (*shimmer / pulse*) durante la carga inicial y spinner progresivo durante el scroll.

### 5. 📊 Panel de Métricas (KPIs)
- Tarjetas con métricas visuales: Total de tickets, abiertos, en proceso y resueltos.

---

## ⚙️ Configuración y Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con tus credenciales de Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=tu-anon-key-de-supabase
```

### Configuración en Supabase:
1. **Base de Datos:** Tabla `tickets` con columnas `id`, `user_id`, `title`, `description`, `priority`, `status`, `image_url`, `created_at`, `updated_at`.
2. **Storage:**
   - Bucket `tickets-images` (Público o con políticas de acceso para imágenes de tickets).
   - Bucket `avatars` (Para fotos de perfil de usuario).

---

## 💻 Comandos del Proyecto

El proyecto está optimizado para ejecutarse con **Bun**:

### 1. Instalar dependencias
```bash
bun install
```

### 2. Iniciar el servidor de desarrollo
```bash
bun run dev
```
La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

### 3. Compilar para producción
```bash
bun run build
```

### 4. Ejecutar el bundle de producción
```bash
bun run start
```

### 5. Validación de tipos y linter
```bash
bun run lint
# Comprobación de tipos TypeScript:
bun x tsc --noEmit
```
