# Sa·zón · Ecosistema Digital Gastronómico Grupo Nutresa

Plataforma inteligente de cocina, planificación de menús, gestión de despensa y descubrimiento de recetas con las marcas oficiales de **Grupo Nutresa** (Zenú, Doria, Pietrán, Noel, Chocolates Jet, Corona, etc.).

El proyecto está diseñado bajo una arquitectura modular desacoplada para el trabajo colaborativo y concurrente entre 8 células independientes mediante el flujo de trabajo **GitFlow**.

---

## 1. Guía de Inicio Rápido para Desarrolladores (Instrucciones de Trabajo)

Cada equipo de trabajo o célula tiene asignada una carpeta específica dentro de `src/`. Al realizar el **fork** o clonar el repositorio para comenzar a desarrollar:

1. **Ubica tu carpeta de célula:**
   * Cada equipo trabaja exclusivamente dentro de su directorio designado: `src/<nombre-celula>/`.
2. **Punto de partida obligatorio:**
   * Cada célula ya cuenta con su archivo `landing.html` preconfigurado e interconectado con el sistema.
3. **Desarrolla tus componentes dentro del contenedor principal:**
   * Abre `src/<nombre-celula>/landing.html` y construye la lógica e interfaz de tu módulo dentro de la sección `<section id="module-content">` (o dentro de `<main>`).
4. **Crea tus propios scripts y estilos locales:**
   * Si requieres archivos JavaScript o CSS adicionales para tu célula, créalos estrictamente dentro de tu propia carpeta (ejemplo: `src/<nombre-celula>/modulo.js`, `src/<nombre-celula>/styles.css`).
5. **No toques archivos externos:**
   * Todo tu trabajo debe permanecer 100% contenido en tu carpeta. Al enviar un Pull Request hacia la rama `develop`, únicamente deben registrarse cambios en `src/<nombre-celula>/`.

---

## 2. Reglas Obligatorias y Restricciones Técnicas

> [!CAUTION]
> ### REGLAS DE ORO DEL REPOSITORIO
> 
> 1. **PROHIBIDO MODIFICAR NADA FUERA DE TU CARPETA DE CÉLULA:**
>    * **Bajo ninguna circunstancia** se deben editar archivos en la raíz (`index.html`, `landing.html`, `README.md`), en la carpeta compartida (`src/assets/`), ni en las carpetas de otras células.
>    * Modificar recursos compartidos generará conflictos de fusión (*merge conflicts*) en GitFlow y provocará el rechazo inmediato del Pull Request.
> 
> 2. **PROHIBIDO RENOMBRAR EL ARCHIVO `landing.html` DE CADA CÉLULA:**
>    * Cada módulo debe conservar de forma estricta su archivo como `landing.html` (por ejemplo: `src/catalogo-productos/landing.html`).
>    * Todo el menú lateral (Sidebar), las migas de pan y la navegación intermodular están enlazados a ese archivo específico. Si se renombra a `index.html` u otro nombre, se romperá la navegación del ecosistema.
> 
> 3. **ESTRICTAMENTE 0 ETIQUETAS `<div>` (HTML5 Semántico Obligatorio):**
>    * Toda la interfaz debe estructurarse utilizando exclusivamente etiquetas semánticas de HTML5: `<main>`, `<article>`, `<section>`, `<header>`, `<nav>`, `<aside>`, `<figure>`, `<figcaption>`, `<form>`, `<label>`, `<input>`, `<textarea>`, `<button>`, `<span>`, `<p>`, `<output>`, `<time>`.
> 
> 4. **ESTRICTAMENTE 0 COMENTARIOS EN EL CÓDIGO:**
>    * No se permiten comentarios de bloque ni de línea (`<!-- -->`, `//`, `/* */`) en el código de producción. El código debe ser limpio, declarativo y autoexplicativo.

---

## 3. Arquitectura y Recursos Globales (`src/assets/`)

Los recursos globales están ubicados en `src/assets/` y son de **solo lectura / consumo para las células**. No deben modificarse, pero sí deben aprovecharse:

### 3.1 Estilos y Tipografías Globales (`src/assets/css/`)
* **`global.css`:** Contiene el reseteo institucional, personalización del scrollbar corporativo y variables visuales.
* **`fonts.css` y `src/assets/fonts/`:** Tipografías locales de alto rendimiento en formato `.woff2`:
  * **Poppins:** Para títulos, encabezados y nombres de marcas (`font-poppins` o `font-title`).
  * **Inter:** Para textos de lectura continua, párrafos y descripciones (`font-inter`).
  * **IBM Plex Mono:** Para badges, códigos, contadores, etiquetas y botones técnicos (`font-mono-tag`).

### 3.2 Lógica y Utilidades Compartidas (`src/assets/js/global.js`)
Cada `landing.html` ya incluye `<script src="../assets/js/global.js"></script>`, el cual proporciona automáticamente:
* **Tema Día / Noche (`switchTheme('light' | 'dark')`):**
  * Persiste la preferencia en `localStorage` (`sazon_theme`).
  * Inicialización síncrona anti-FOUC (sin parpadeos al navegar).
* **Control del Menú Lateral (`toggleSidebar()`):**
  * Abre y cierra el Drawer lateral con transición y bloqueo de scroll de fondo.
* **Notificaciones Flotantes (`showToast(mensaje)`):**
  * Muestra mensajes flotantes en el componente semántico `<output id="toast-msg">`.
* **Sincronización Automática de Sesión (`syncHeaderSession()`):**
  * Lee la sesión activa de `localStorage` (`sazon_sesion_activa`) y actualiza automáticamente el nombre (`#header-name`), rol (`#header-role`) y foto de perfil (`#header-avatar`) en el encabezado.
  * Si la célula se ejecuta de manera aislada sin haber pasado por el login, genera una sesión fallback de prueba para que la interfaz nunca se rompa.
* **Búsqueda Global (`handleGlobalSearch(event)`):**
  * Filtra elementos marcados con el atributo `data-searchable` o artículos en contenedor.

### 3.3 Banco de Datos de Usuarios (`src/assets/js/usuarios-db.js`)
* Contiene el mock inicial de usuarios con perfiles reales, fotos de alta resolución de Unsplash, roles (`administrador` y `creador de contenido`) y biografías culinarias.
* Se inicializa automáticamente en `localStorage` bajo la clave `sazon_usuarios`.

### 3.4 Utilidades de Almacenamiento (`src/assets/js/local-storage.js`)
* Funciones de utilidad `guardarStorage(clave, valor)` y `obtenerStorage(clave, fallback)` preparadas para importación como módulos ES6.

---

## 4. Mapa de Rutas y Módulos del Sistema

```text
sazon-integrador/
├── index.html                           # Portada pública cinematográfica (100vh con botón "Explora")
├── landing.html                         # Dashboard central post-login (NO EDITAR DIRECTAMENTE)
├── README.md                            # Guía técnica y de contribución
└── src/
    ├── assets/                          # RECURSOS GLOBALES (Solo lectura para células)
    │   ├── css/ (global.css, fonts.css)
    │   ├── fonts/ (*.woff2)
    │   ├── images/ (logos de marcas Nutresa: zenu, doria, jet, pietran, noel, etc.)
    │   └── js/ (global.js, local-storage.js, usuarios-db.js)
    │
    ├── auth-usuarios/                   # CÉLULA 0: Autenticación, Roles y Perfil de Usuario
    │   ├── login.html                   # Inicio de sesión con validación de credenciales
    │   ├── registro.html                # Registro público (asigna rol "creador de contenido")
    │   ├── perfil.html                  # Edición de información, biografía culinaria y logout
    │   └── auth.js                      # Controlador de sesiones y autenticación aislada
    │
    ├── catalogo-productos/              # CÉLULA 1: Catálogo oficial de productos y marcas Nutresa
    │   └── landing.html                 # Vista principal de la célula (NO RENOMBRAR)
    │
    ├── recetario-contenido/             # CÉLULA 2: Recetas digitales, pasos, videos y dificultad
    │   └── landing.html                 # Vista principal de la célula (NO RENOMBRAR)
    │
    ├── despensa-virtual/                # CÉLULA 3: Inventario de cocina y sugerencias "Cocina con lo que hay"
    │   └── landing.html                 # Vista principal de la célula (NO RENOMBRAR)
    │
    ├── nutricion-perfiles/              # CÉLULA 4: Semáforo nutricional, calorías, metas y alérgenos
    │   └── landing.html                 # Vista principal de la célula (NO RENOMBRAR)
    │
    ├── planificador-mercado/            # CÉLULA 5: Plan de comidas semanal y lista inteligente de compras
    │   └── landing.html                 # Vista principal de la célula (NO RENOMBRAR)
    │
    ├── comunidad-valoraciones/          # CÉLULA 6: Calificaciones, reseñas comunitarias y favoritos
    │   └── landing.html                 # Vista principal de la célula (NO RENOMBRAR)
    │
    └── mercadeo-campanas/               # CÉLULA 7: Retos culinarios, cupones y puntos de fidelización
        └── landing.html                 # Vista principal de la célula (NO RENOMBRAR)
```

---

## 5. Convenciones de Persistencia (`localStorage`)

Para evitar colisiones entre células en el almacenamiento del navegador, cada equipo debe prefijar sus claves:

| Módulo / Célula | Prefijo Obligatorio | Ejemplos de Claves |
| :--- | :--- | :--- |
| **Sesión Global** | `sazon_sesion_` | `sazon_sesion_activa` |
| **Banco Usuarios** | `sazon_usuarios` | `sazon_usuarios` |
| **Célula 1 · Catálogo** | `sazon_catalogo_` | `sazon_catalogo_items`, `sazon_catalogo_marcas` |
| **Célula 2 · Recetario** | `sazon_recetas_` | `sazon_recetas_lista`, `sazon_recetas_favoritas` |
| **Célula 3 · Despensa** | `sazon_despensa_` | `sazon_despensa_ingredientes`, `sazon_despensa_vencimientos` |
| **Célula 4 · Nutrición** | `sazon_nutricion_` | `sazon_nutricion_perfil`, `sazon_nutricion_alergias` |
| **Célula 5 · Planificador**| `sazon_planificador_`| `sazon_planificador_menu`, `sazon_planificador_lista_compras` |
| **Célula 6 · Comunidad** | `sazon_comunidad_` | `sazon_comunidad_resenas`, `sazon_comunidad_calificaciones` |
| **Célula 7 · Mercadeo** | `sazon_mercadeo_` | `sazon_mercadeo_campanas`, `sazon_mercadeo_puntos` |

### Lineamientos Técnicos para `localStorage`:
1. **JSON estructurado:** Guarda siempre con `JSON.stringify()` y lee con `JSON.parse()`.
2. **Valores por defecto defensivos:** Al leer, prevé siempre un fallback (ej. `JSON.parse(localStorage.getItem('...') || '[]')`).
3. **PROHIBIDO USAR `localStorage.clear()`:** Nunca uses `clear()`, ya que borraría la sesión de usuario y los datos de las demás células. Para reiniciar datos de tu módulo, usa únicamente `localStorage.removeItem('sazon_<tu_modulo>_...')`.
4. **Manejo con `try / catch`:** Encapsula siempre las llamadas a `localStorage` para prevenir excepciones si el usuario navega en modo privado estricto.

---

## 6. Paleta de Colores Corporativos (Tailwind CSS)

Todas las clases personalizadas de Tailwind ya están registradas globalmente en `global.js`:

| Token | Color Hex | Uso Principal |
| :--- | :--- | :--- |
| `sazon-marfil` | `#F4F4E8` | Fondo principal en Modo Día |
| `sazon-verdeHoja` | `#3D8E33` | Botones de acción, acentos principales y badges activos |
| `sazon-verdeNutresa` | `#1B4332` | Fondo principal en Modo Noche y footer institucional |
| `sazon-verdeNutresaCard` | `#133326` | Fondo de tarjetas en Modo Noche |
| `sazon-verdeNeon` | `#66D149` | Textos de acento brillante e iconos destacados en Modo Noche |
| `sazon-cacao` | `#643B22` | Footer en Modo Día y elementos cálidos |
| `sazon-brandZenu` | `#D32F2F` | Marca Zenú |
| `sazon-brandDoria` | `#E65100` | Marca Doria |
| `sazon-brandPietran` | `#2E7D32` | Marca Pietrán |
| `sazon-brandNoel` | `#C2185B` | Marca Noel |

---

## 7. Flujo de Trabajo en Git (GitFlow)

1. Haz **Fork** del repositorio a tu cuenta o clona el repositorio del proyecto.
2. Crea tu rama de trabajo a partir de `develop`:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/celula-X-<nombre-modulo>
   ```
3. Trabaja **únicamente** en tu carpeta `src/<nombre-celula>/`.
4. Realiza commits claros siguiendo Conventional Commits (ejemplo: `feat(catalogo): listado interactivo de productos con filtros de marca`).
5. Abre un **Pull Request** apuntando hacia la rama `develop` de este repositorio para revisión e integración.
