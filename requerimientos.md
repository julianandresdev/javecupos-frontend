
# 📋 **PLAN DE REQUERIMIENTOS DEL FRONTEND - JAVECUPOS**


***

## **1. MÓDULO DE AUTENTICACIÓN** 🔐

### **Páginas**

- Login
- Registro
- Verificar email (con token del link)
- Olvidé mi contraseña
- Resetear contraseña
- Reenviar correo de verificación


### **Funcionalidades**

- Login con email y contraseña
- Registro de usuario nuevo
- Verificar cuenta desde email
- Recuperar contraseña por email
- Tokens automáticos (access + refresh)
- Cerrar sesión
- Mantener sesión activa
- Proteger rutas (solo usuarios logueados)
- Redirección según estado de cuenta


### **Estados de Usuario**

- **PENDING**: Recién registrado, esperando verificar email (no puede iniciar sesión)
- **ACTIVE**: Cuenta verificada, puede usar la app completa
- **INACTIVE**: Cuenta desactivada por admin o usuario

***

## **2. MÓDULO DE USUARIOS** 👥

### **Páginas**

- Mi perfil (ver mi info)
- Editar perfil
- Ver perfil de otro usuario (conductor o pasajero)
- Configuración de cuenta
- Lista de usuarios (solo admin)
- Detalle de usuario (solo admin)


### **Mi Perfil - Ver**

- Foto de perfil
- Nombre completo
- Email (no editable)
- Teléfono
- Edad
- Calificación promedio (estrellas)
- Mis estadísticas:
    - Cupos publicados totales
    - Reservas realizadas totales
    - Viajes completados
    - Tasa de cancelación
- Reseñas recibidas de otros usuarios
- Badge de verificación (si tiene email verificado)


### **Editar Perfil**

- Subir/cambiar foto de perfil (con preview)
- Actualizar nombre completo
- Actualizar teléfono (validación formato colombiano)
- Actualizar edad (validación +18 años)
- Campo de biografía/descripción personal
- Guardar cambios con confirmación


### **Configuración de Cuenta**

- Cambiar contraseña (con validación de contraseña actual)
- Preferencias de notificaciones:
    - Email (activar/desactivar)
    - Push del navegador (activar/desactivar)
    - In-app (activar/desactivar)
- Gestión de privacidad:
    - Mostrar teléfono a otros usuarios
    - Mostrar edad en perfil público
- Ver sesiones activas (dispositivos conectados)
- Cerrar sesión en todos los dispositivos
- Eliminar cuenta (con modal de confirmación doble)


### **Ver Perfil de Otro Usuario**

- Foto y nombre
- Calificación promedio con desglose
- Edad (si es pública)
- Teléfono (si es público y estás en su viaje)
- Biografía/descripción
- Estadísticas públicas:
    - Viajes completados
    - Miembro desde (fecha de registro)
- Lista de reseñas recibidas (paginada)
- Botón de reportar usuario
- Botón de contactar (si estás en su viaje)


### **Lista de Usuarios (Admin)**

- Tabla con todos los usuarios
- Columnas:
    - Foto y nombre
    - Email
    - Rol (USER, ADMIN)
    - Estado (ACTIVE, INACTIVE, PENDING)
    - Fecha de registro
    - Última actividad
    - Acciones
- Búsqueda por nombre o email
- Filtros:
    - Por rol (USER, ADMIN)
    - Por estado (ACTIVE, INACTIVE, PENDING)
    - Por fecha de registro
- Paginación
- Acciones rápidas:
    - Ver detalle
    - Activar/desactivar
    - Cambiar rol
    - Eliminar usuario


### **Detalle de Usuario (Admin)**

- Toda la información del perfil
- Historial de actividad:
    - Cupos creados
    - Reservas realizadas
    - Cancelaciones
- Reportes recibidos
- Acciones de moderación:
    - Cambiar estado (activar/desactivar)
    - Cambiar rol
    - Enviar notificación al usuario
    - Eliminar cuenta permanentemente


### **Roles de Usuario**

- **USER**: Usuario normal (crear cupos y reservar)
- **ADMIN**: Administrador (acceso total, moderación)

***

## **3. MÓDULO DE CUPOS** 🚗

### **Páginas**

- Explorar cupos (búsqueda y lista)
- Ver detalle de un cupo
- Crear nuevo cupo
- Mis cupos (los que yo publiqué)
- Editar mi cupo
- Ver reservas de mi cupo
- Cupos guardados/favoritos


### **Explorar Cupos**

- Barra de búsqueda principal (origen y destino)
- Lista de cupos disponibles en tarjetas
- Filtros laterales o colapsables:
    - Origen (texto o select)
    - Destino (texto o select)
    - Fecha de salida (date picker)
    - Rango de precio (slider)
    - Plazas mínimas disponibles
    - Calificación mínima del conductor
- Ordenar por:
    - Más recientes
    - Precio: menor a mayor
    - Precio: mayor a menor
    - Mejor calificación del conductor
    - Fecha más próxima
- Cada tarjeta de cupo muestra:
    - Origen → Destino
    - Fecha y hora de salida
    - Precio por persona
    - Plazas disponibles / plazas totales
    - Foto, nombre y calificación del conductor
    - Estado del cupo (badge de color)
    - Ícono de favorito (corazón)
- Paginación o scroll infinito
- Mensaje cuando no hay resultados
- Botón de "Limpiar filtros"


### **Detalle de Cupo**

- Información completa del viaje:
    - Origen y destino (texto grande)
    - Fecha y hora de salida
    - Precio por persona
    - Plazas disponibles / plazas totales
    - Descripción detallada del viaje
    - Punto de encuentro específico
    - Instrucciones adicionales
    - Tipo de vehículo (opcional)
    - Comodidades (aire acondicionado, música, etc.)
- Info del conductor:
    - Foto de perfil (clickeable)
    - Nombre completo
    - Calificación con estrellas
    - Número de viajes completados
    - Botón "Ver perfil completo"
- Mapa mostrando ruta (opcional pero recomendado)
- Estado del cupo con badge de color
- Botones principales:
    - **"Reservar"** (grande, solo si está Disponible y hay plazas)
    - **"Guardar"** (ícono de corazón)
    - **"Compartir"** (copiar link)
    - **"Reportar"** (texto pequeño)
- Si el cupo es tuyo:
    - Botón "Ver reservas"
    - Botón "Editar" (solo si no tiene reservas CONFIRMED)
    - Botón "Cancelar cupo"
    - Botón "Marcar como completado"
- Sección de comentarios/preguntas (opcional)


### **Crear Cupo**

- Formulario completo con:
    - **Origen**: Campo de texto (autocompletar ciudades)
    - **Destino**: Campo de texto (autocompletar ciudades)
    - **Fecha de salida**: Date picker (solo fechas futuras)
    - **Hora de salida**: Time picker
    - **Precio por persona**: Input numérico (con símbolo \$)
    - **Plazas totales**: Select (1-8)
    - **Descripción**: Textarea (opcional, 500 caracteres max)
    - **Punto de encuentro**: Campo de texto
    - **Instrucciones adicionales**: Textarea (opcional)
- Validaciones en tiempo real
- Indicador de campos obligatorios
- Preview del cupo antes de publicar
- Botones:
    - "Publicar cupo" (principal)
    - "Cancelar" (secundario)
- Mensaje de éxito al crear
- Redirección a "Mis cupos"


### **Mis Cupos**

- Tabs para filtrar:
    - Disponibles
    - En curso
    - Completados
    - Cancelados
- Lista de mis cupos en tarjetas
- Cada tarjeta muestra:
    - Origen → Destino
    - Fecha y hora
    - Precio y plazas
    - Estado (badge con color)
    - Número de reservas (PENDING, CONFIRMED)
    - Vista rápida de pasajeros (fotos)
- Botones en cada cupo:
    - Ver detalle
    - Ver reservas
    - Editar (solo si no tiene reservas CONFIRMED)
    - Cancelar (solo si está Disponible)
    - Marcar como completado (solo si está En curso)
- Mensaje cuando no hay cupos
- Botón flotante "Crear nuevo cupo"


### **Editar Cupo**

- Mismo formulario que crear cupo
- Pre-llenado con datos actuales
- Solo editable si no tiene reservas CONFIRMED
- Advertencia si hay reservas PENDING
- Botones:
    - "Guardar cambios"
    - "Cancelar"
- Confirmación de cambios guardados


### **Ver Reservas de Mi Cupo**

- Lista de todas las reservas de un cupo específico
- Tabs por estado:
    - Pendientes (PENDING)
    - Confirmadas (CONFIRMED)
    - Rechazadas (REJECTED)
    - Canceladas (CANCELLED)
    - Completadas (COMPLETED)
- Cada reserva muestra:
    - Foto y nombre del pasajero (clickeable)
    - Calificación del pasajero
    - Estado (badge con color)
    - Fecha de reserva
    - Número de plazas reservadas
- Acciones por reserva (según estado):
    - **PENDING**: Botones "Confirmar" y "Rechazar"
    - **CONFIRMED**: Botón "Contactar" y "Marcar no show"
    - **COMPLETED**: Ver calificación recibida
- Resumen en la parte superior:
    - Total de reservas
    - Plazas ocupadas vs totales
    - Ingresos estimados


### **Cupos Favoritos**

- Lista de cupos que guardé
- Misma vista que explorar cupos
- Botón para remover de favoritos
- Notificación si un cupo favorito se cancela


### **Estados de Cupo**

- **Disponible**: Tiene plazas libres, acepta reservas (verde)
- **En curso**: Viaje iniciado/en progreso (azul)
- **Completado**: Viaje terminado (gris)
- **Cancelado**: Cancelado por el conductor (rojo)

**Reglas de Estado:**

- Solo **Disponible** acepta nuevas reservas
- Pasa a **En curso** cuando llega la fecha/hora o manualmente
- Pasa a **Completado** manualmente por el conductor
- Puede cancelarse solo si está **Disponible**

***

## **4. MÓDULO DE RESERVAS (BOOKINGS)** 📅

### **Páginas**

- Mis reservas (las que yo hice como pasajero)
- Detalle de mi reserva
- Modal de confirmación de reserva
- Página de calificación post-viaje
- Historial de reservas


### **Hacer Reserva**

- Desde el detalle de cupo, botón "Reservar"
- Modal de confirmación con:
    - Resumen del viaje:
        - Origen → Destino
        - Fecha y hora
        - Conductor (nombre y foto)
    - Selector de número de plazas (1 hasta las disponibles)
    - Precio por persona
    - **Precio total** (calculado automáticamente)
    - Checkbox de términos y condiciones
    - Notas adicionales (opcional)
- Botones:
    - "Confirmar reserva" (deshabilitado hasta aceptar términos)
    - "Cancelar"
- Mensaje de éxito con:
    - Código de reserva
    - Estado inicial: PENDING
    - "Tu reserva está pendiente de confirmación del conductor"
- Redirección a "Mis reservas"


### **Mis Reservas**

- Tabs por estado:
    - Pendientes (PENDING) - con badge de cantidad
    - Confirmadas (CONFIRMED)
    - Completadas (COMPLETED)
    - Canceladas (CANCELLED)
    - Rechazadas (REJECTED)
- Vista principal: próximas reservas (PENDING + CONFIRMED)
- Lista de reservas en tarjetas
- Cada tarjeta muestra:
    - Origen → Destino
    - Fecha y hora de salida
    - Estado con badge de color
    - Foto y nombre del conductor
    - Calificación del conductor
    - Precio total pagado
    - Número de plazas reservadas
    - Código de reserva
- Botones según estado:
    - **PENDING**: "Ver detalle", "Cancelar"
    - **CONFIRMED**: "Ver detalle", "Cancelar" (con advertencia), "Contactar conductor"
    - **COMPLETED**: "Ver detalle", "Calificar" (si no ha calificado)
    - **REJECTED**: "Ver detalle", "Ver motivo"
    - **CANCELLED**: "Ver detalle"
- Filtros adicionales:
    - Por rango de fechas
    - Por conductor
- Búsqueda por origen, destino o código
- Mensaje cuando no hay reservas


### **Detalle de Reserva**

- Información completa del viaje
- Timeline visual del estado:
    - PENDING → CONFIRMED → COMPLETED
    - Mostrar en qué paso está
    - Fecha/hora de cada cambio de estado
- Datos del viaje:
    - Origen → Destino
    - Fecha y hora de salida
    - Punto de encuentro
    - Descripción del viaje
    - Instrucciones del conductor
- Datos de la reserva:
    - Código de reserva (copiable)
    - Estado actual (badge grande)
    - Fecha de reserva
    - Plazas reservadas
    - Precio total
- Información del conductor:
    - Foto, nombre, calificación
    - Teléfono (si está CONFIRMED)
    - Botón "Ver perfil completo"
    - Botón "Contactar" (si está CONFIRMED)
- Botones según estado:
    - **PENDING**: "Cancelar reserva"
    - **CONFIRMED**: "Cancelar reserva" (con advertencia fuerte), "Contactar"
    - **COMPLETED**: "Calificar conductor" (si no ha calificado), "Ver mi calificación"
    - **REJECTED**: Ver mensaje del conductor con motivo
- Botón secundario: "Reportar problema"
- Si está próximo (menos de 24h), mostrar recordatorio destacado


### **Cancelar Reserva**

- Modal de confirmación con advertencia
- Información sobre política de cancelación
- Selector de motivo:
    - Cambio de planes
    - Encontré otra opción
    - Problema con el conductor
    - Otro (especificar)
- Campo de comentarios adicionales (opcional)
- Checkbox de "Estoy seguro"
- Botones:
    - "Sí, cancelar reserva" (rojo, principal)
    - "No, mantener reserva" (secundario)
- Confirmación de cancelación exitosa


### **Calificar Viaje**

- Modal o página dedicada
- Solo disponible cuando el estado es COMPLETED
- Formulario de calificación:
    - **Calificación general**: Estrellas (1-5) grandes
    - Aspectos específicos (opcional):
        - Puntualidad (estrellas)
        - Conducción (estrellas)
        - Vehículo/limpieza (estrellas)
        - Trato/amabilidad (estrellas)
    - **Comentario**: Textarea (opcional, 500 caracteres)
    - Opción de reportar problema (checkbox)
- Botones:
    - "Enviar calificación"
    - "Omitir por ahora"
- Mensaje de agradecimiento al enviar
- No se puede editar una vez enviada


### **Historial de Reservas**

- Vista de todas las reservas históricas
- Filtros por:
    - Año
    - Mes
    - Estado final
- Estadísticas personales:
    - Total de viajes realizados
    - Dinero gastado total
    - Conductores diferentes
    - Calificación promedio dada
- Exportar historial (CSV o PDF)


### **Estados de Reserva**

- **PENDIENTE**: Esperando confirmación del conductor (amarillo)
- **CONFIRMADO**: Conductor aceptó la reserva (verde)
- **RECHAZADO**: Conductor rechazó la reserva (rojo)
- **CANCELADO**: Cancelada por pasajero o conductor (naranja)
- **COMPLETADO**: Viaje finalizado exitosamente (azul)

**Reglas de Estado:**

- Inicia en **PENDIENTE**
- Conductor puede mover a **CONFIRMADO** o **RECHAZADO**
- Solo **PENDIENTE** y **CONFIRMADO** se pueden cancelar
- Pasa a **COMPLETADO** cuando el cupo se completa
- **RECHAZADO** es final (no se puede revertir)
- **CANCELADO** es final (no se puede revertir)

***

## **5. MÓDULO DE NOTIFICACIONES** 🔔

### **Páginas**

- Centro de notificaciones (página completa)
- Panel lateral de notificaciones (dropdown)
- Configuración de notificaciones


### **Ícono de Notificaciones (Navbar)**

- Badge con número de notificaciones no leídas
- Click abre dropdown con últimas 5 notificaciones
- Link "Ver todas" que lleva al centro de notificaciones
- Animación cuando llega notificación nueva


### **Centro de Notificaciones**

- Lista completa de todas las notificaciones
- Tabs:
    - Todas
    - No leídas
    - Reservas
    - Cupos
    - Sistema
- Cada notificación muestra:
    - Ícono según tipo
    - Título de la notificación
    - Mensaje corto
    - Tiempo relativo (hace 2h, hace 3 días)
    - Indicador de leída/no leída
    - Click en notificación lleva a la página relacionada
- Filtros:
    - Por tipo
    - Por rango de fechas
- Acciones:
    - Marcar como leída (ojo)
    - Eliminar (basura)
    - Marcar todas como leídas (botón arriba)
    - Eliminar todas leídas (botón arriba)
- Paginación
- Mensaje cuando no hay notificaciones


### **Tipos de Notificaciones**

**Relacionadas con Reservas (como conductor):**

- Nueva reserva en tu cupo (PENDING)
- Reserva cancelada por pasajero
- Pasajero calificó tu viaje

**Relacionadas con Reservas (como pasajero):**

- Tu reserva fue confirmada (CONFIRMADO)
- Tu reserva fue rechazada (RECHAZADO)
- Conductor canceló tu reserva
- Recordatorio de viaje (24h antes)
- Recordatorio de viaje (2h antes)
- Tu viaje está próximo (30min antes)
- Califica tu viaje completado

**Relacionadas con Cupos:**

- Tu cupo está por completarse (pocas plazas)
- Tu cupo se completó (todas las plazas ocupadas)
- Cupo guardado modificado
- Cupo guardado cancelado
- Nuevo cupo en tu ruta favorita (opcional)

**Sistema:**

- Email verificado exitosamente
- Contraseña cambiada
- Perfil actualizado
- Nueva funcionalidad disponible
- Actualización de términos

**Admin:**

- Nuevo reporte recibido
- Usuario registrado nuevo
- Actividad sospechosa detectada


### **Notificaciones en Tiempo Real**

- Toast/Snackbar para notificaciones urgentes:
    - Nueva reserva
    - Reserva confirmada/rechazada
    - Cupo cancelado
    - Recordatorio próximo
- Posición: esquina superior derecha
- Duración: 5 segundos (con opción de cerrar)
- Sonido sutil (opcional, configurable)
- Click en toast lleva a la página relacionada
- Actualización del badge sin recargar página
- Conexión WebSocket/Socket.io para tiempo real


### **Notificaciones Push del Navegador**

- Solicitar permiso en primera sesión
- Notificaciones cuando el navegador está minimizado
- Mismos tipos que las notificaciones in-app
- Click en push abre la app en la página relacionada
- Configurables individualmente


### **Configuración de Notificaciones**

- Tabla con todos los tipos de notificación
- Columnas:
    - Tipo de notificación
    - Email (toggle)
    - Push (toggle)
    - In-app (toggle)
- Switches rápidos arriba:
    - Activar/desactivar todo email
    - Activar/desactivar todo push
    - Activar/desactivar todo in-app
- Configuración adicional:
    - Sonido en notificaciones (sí/no)
    - Notificaciones de marketing (opt-in)
    - Resumen diario por email (sí/no)
    - Horario de no molestar (de-hasta)
- Botón "Guardar preferencias"

***

## **6. COMPONENTES COMUNES** 🎨

### **Navegación Principal**

- Navbar fijo arriba
- Logo de JaveCupos (clickeable, va a inicio)
- Links principales:
    - Explorar cupos
    - Mis cupos
    - Mis reservas
- Ícono de notificaciones con badge
- Avatar del usuario (dropdown menu):
    - Mi perfil
    - Configuración
    - Si admin: Panel admin
    - Cerrar sesión
- En móvil: menú hamburguesa


### **Footer**

- Links a páginas informativas
- Redes sociales
- Copyright
- Versión de la app


### **Loading States**

- Spinner cuando carga página completa
- Skeleton loaders para listas:
    - Lista de cupos
    - Lista de reservas
    - Perfil de usuario
- Progress bar lineal para operaciones largas
- Botones con estado de carga (spinner + texto "Cargando...")


### **Mensajes de Feedback**

- **Toast de éxito** (verde):
    - "Cupo creado exitosamente"
    - "Reserva confirmada"
    - "Perfil actualizado"
- **Toast de error** (rojo):
    - "Error al crear cupo"
    - "No se pudo confirmar reserva"
    - "Error de conexión"
- **Toast de advertencia** (amarillo):
    - "Sesión por expirar"
    - "Campos incompletos"
- **Toast de información** (azul):
    - "Cambios guardados"
    - "Email enviado"
- Posición: parte superior central
- Duración: 3-5 segundos
- Botón de cerrar (X)
- Posibilidad de apilar varios


### **Modales**

- Modal de confirmación genérico:
    - Título
    - Mensaje
    - Botón "Confirmar" (principal)
    - Botón "Cancelar" (secundario)
- Modal de confirmación destructiva:
    - Título en rojo
    - Mensaje de advertencia
    - Checkbox "Estoy seguro"
    - Botón rojo "Confirmar"
    - Botón "Cancelar"
- Cerrar con X o click fuera
- Animación de entrada/salida


### **Formularios**

- Validación en tiempo real
- Mensajes de error bajo cada campo
- Campos obligatorios con asterisco (*)
- Placeholders descriptivos
- Botón submit deshabilitado mientras carga
- Indicador de campos completos/incompletos
- Auto-focus en primer campo
- Enter para submit (donde aplique)


### **Estados Vacíos (Empty States)**

- Cuando no hay cupos: "No hay cupos disponibles con estos filtros"
- Cuando no hay reservas: "Aún no has hecho ninguna reserva"
- Cuando no hay notificaciones: "No tienes notificaciones"
- Con ilustración o ícono
- Botón de acción sugerida
- Mensaje amigable


### **Badges de Estado**

- Colores consistentes:
    - **Verde**: Disponible, Confirmado, Activo
    - **Azul**: En curso, Completado
    - **Amarillo**: Pendiente, Esperando
    - **Rojo**: Cancelado, Rechazado, Inactivo
    - **Gris**: Completado (histórico)
- Texto en mayúsculas
- Esquinas redondeadas
- Contraste adecuado


### **Avatares**

- Redondos
- Inicial del nombre si no hay foto
- Borde sutil
- Hover muestra nombre completo (tooltip)
- Click lleva al perfil


### **Calificaciones (Estrellas)**

- 5 estrellas
- Medias estrellas para promedios
- Color dorado para llenas
- Color gris para vacías
- Número al lado (ej: 4.5)
- Interactivas en formularios de calificación


### **Botones**

- **Primarios**: Color principal (verde), para acciones principales
- **Secundarios**: Borde, fondo blanco, para acciones secundarias
- **Destructivos**: Rojo, para acciones peligrosas
- **Deshabilitados**: Gris, cursor not-allowed
- **Con ícono**: Ícono a la izquierda o derecha del texto
- Estados: normal, hover, active, disabled, loading


### **Responsive Design**

- Mobile-first
- Breakpoints:
    - Móvil: < 640px
    - Tablet: 640px - 1024px
    - Desktop: > 1024px
- En móvil:
    - Menú hamburguesa
    - Filtros en modal/drawer
    - Tarjetas de cupo a full width
    - Formularios apilados verticalmente
- Touch-friendly (botones grandes, tap targets > 44px)


### **Accesibilidad**

- Contraste de colores WCAG AA
- Textos alternativos en imágenes
- Etiquetas ARIA
- Navegación por teclado (Tab, Enter, Esc)
- Focus visible
- Tamaños de fuente legibles

***

## **7. FUNCIONALIDADES TRANSVERSALES**

### **Búsqueda**

- Barra de búsqueda global en navbar
- Búsqueda de cupos por origen/destino
- Autocompletar sugerencias mientras escribes
- Historial de búsquedas recientes (local)
- Limpiar historial


### **Favoritos/Guardar Cupos**

- Ícono de corazón en cada cupo
- Click guarda/quita de favoritos
- Animación al guardar
- Página de cupos guardados
- Notificación si cupo guardado cambia o se cancela


### **Sistema de Reportes**

- Reportar cupo:
    - Información falsa
    - Conductor sospechoso
    - Precio abusivo
    - Contenido inapropiado
    - Otro (especificar)
- Reportar usuario:
    - Comportamiento inapropiado
    - Spam
    - Suplantación de identidad
    - Otro (especificar)
- Reportar problema técnico:
    - Error en la app
    - Reserva no procesada
    - Notificación no recibida
    - Otro (especificar)
- Formulario de reporte:
    - Selección de motivo (dropdown)
    - Descripción detallada (textarea)
    - Captura de pantalla (opcional, subir)
    - Checkbox "Entiendo que el reporte será revisado"
    - Botón "Enviar reporte"
- Confirmación de reporte enviado
- Tracking de estado del reporte (para el usuario)


### **Compartir**

- Botón compartir en detalle de cupo
- Opciones:
    - Copiar link (clipboard)
    - WhatsApp
    - Facebook
    - Twitter
    - Email
- Toast "Link copiado" al copiar


### **Filtros Avanzados**

- Panel lateral u horizontal
- Filtros disponibles:
    - Origen (autocomplete)
    - Destino (autocomplete)
    - Fecha de salida (date picker)
    - Rango de precio (slider con min/max)
    - Plazas mínimas (número)
    - Calificación mínima conductor (estrellas)
- Botón "Aplicar filtros"
- Botón "Limpiar filtros"
- Contador de filtros activos (badge)
- Persistir filtros en URL (compartible)


### **Ordenamiento**

- Dropdown de ordenar:
    - Más recientes
    - Más antiguos
    - Precio: menor a mayor
    - Precio: mayor a menor
    - Mejor calificación
    - Fecha de salida: próximos primero
    - Fecha de salida: lejanos primero
- Persistir en URL

***

## **8. PÁGINAS INFORMATIVAS**

### **Landing Page (Inicio)**

- Hero section:
    - Título llamativo
    - Descripción breve
    - Barra de búsqueda grande (origen → destino)
    - Botón "Buscar cupos"
    - Imagen/ilustración
- Sección "Cómo funciona" (3-4 pasos)
- Sección de beneficios
- Testimonios de usuarios
- Estadísticas (usuarios, viajes, ciudades)
- Call-to-action "Regístrate gratis"
- Footer con links


### **Cómo Funciona**

- Explicación paso a paso:
    - Regístrate
    - Busca o publica un cupo
    - Reserva o acepta reservas
    - Viaja y califica
- Con ilustraciones
- FAQ básico
- Botón "Comenzar ahora"


### **Términos y Condiciones**

- Texto legal completo
- Secciones colapsables
- Fecha de última actualización
- Contacto para dudas


### **Política de Privacidad**

- Qué datos recopilamos
- Cómo usamos los datos
- Protección de datos
- Derechos del usuario
- Cookies


### **Política de Cancelación**

- Reglas de cancelación para pasajeros
- Reglas de cancelación para conductores
- Tiempos límite
- Penalizaciones (si aplica)


### **Contacto**

- Formulario de contacto:
    - Nombre
    - Email
    - Asunto
    - Mensaje
    - Botón "Enviar"
- Email directo
- Redes sociales
- Horario de atención


### **Preguntas Frecuentes (FAQ)**

- Categorías:
    - Registro y cuenta
    - Crear cupos
    - Reservar cupos
    - Pagos (si aplica)
    - Seguridad
    - Problemas técnicos
- Búsqueda de preguntas
- Acordeón para respuestas
- Botón "¿No encuentras tu respuesta? Contáctanos"


### **Sobre Nosotros**

- Historia del proyecto
- Misión y visión
- Equipo (opcional)
- Contacto

***

## **9. PÁGINAS DE ERROR**

### **Error 404**

- Ilustración divertida
- "Página no encontrada"
- Mensaje amigable
- Botón "Volver al inicio"
- Búsqueda rápida


### **Error 500**

- "Algo salió mal"
- Mensaje disculpándose
- Código de error (para soporte)
- Botón "Reintentar"
- Botón "Reportar problema"


### **Sin Conexión**

- "Sin conexión a internet"
- Instrucciones para reconectar
- Botón "Reintentar"
- Se oculta automáticamente al reconectar


### **Sesión Expirada**

- "Tu sesión ha expirado"
- Botón "Iniciar sesión nuevamente"
- Redirección a login


### **Acceso Denegado**

- "No tienes permisos"
- Mensaje explicativo
- Botón "Volver"

***

## **10. PANEL DE ADMINISTRACIÓN** 👨‍💼

### **Dashboard Principal**

- Resumen general con cards:
    - Total usuarios (número + gráfico de tendencia)
    - Usuarios activos hoy
    - Total cupos activos
    - Total reservas hoy
    - Reservas pendientes (badge rojo)
    - Reportes sin resolver (badge rojo)
- Gráficos:
    - Usuarios nuevos por mes (línea)
    - Cupos creados por mes (barras)
    - Reservas por estado (pie chart)
    - Actividad por hora del día (heatmap)
- Actividad reciente (últimos 20 registros):
    - Usuario registrado
    - Cupo creado
    - Reserva realizada
    - Reporte enviado
- Alertas importantes:
    - Reportes urgentes
    - Usuarios con comportamiento sospechoso
    - Errores del sistema
- Accesos rápidos:
    - Ver todos los usuarios
    - Ver reportes pendientes
    - Ver cupos activos
    - Configuración del sistema


### **Gestión de Usuarios**

- Tabla completa con columnas:
    - ID
    - Foto + Nombre
    - Email
    - Teléfono
    - Rol (USER, ADMIN)
    - Estado (PENDING, ACTIVE, INACTIVE)
    - Fecha registro
    - Último acceso
    - Cupos creados
    - Reservas hechas
    - Calificación promedio
    - Reportes recibidos
    - Acciones
- Búsqueda por nombre, email, teléfono
- Filtros:
    - Por rol
    - Por estado
    - Por rango de fechas de registro
    - Por calificación
    - Por número de reportes
- Ordenar por cualquier columna
- Paginación (20, 50, 100 por página)
- Acciones rápidas:
    - Ver detalle (ojo)
    - Editar (lápiz)
    - Activar/Desactivar (toggle)
    - Eliminar (basura con confirmación)
- Acciones masivas:
    - Seleccionar múltiples
    - Activar/Desactivar seleccionados
    - Enviar notificación a seleccionados
    - Exportar seleccionados (CSV)
- Botón "Crear nuevo usuario" (manual)


### **Detalle de Usuario (Admin)**

- Tabs:
    - **Información general**:
        - Todos los datos del perfil
        - Fecha de registro
        - Último acceso
        - IP de registro
        - Dispositivos usados
    - **Actividad**:
        - Timeline de todas las acciones
        - Cupos creados (lista)
        - Reservas realizadas (lista)
        - Calificaciones dadas y recibidas
    - **Reportes**:
        - Reportes recibidos
        - Reportes enviados por este usuario
    - **Moderación**:
        - Cambiar estado (PENDING, ACTIVE, INACTIVE)
        - Cambiar rol (USER, ADMIN)
        - Enviar notificación personalizada
        - Resetear contraseña
        - Verificar email manualmente
        - Eliminar cuenta permanentemente
        - Log de acciones de moderación
- Botón "Volver a lista"


### **Gestión de Cupos**

- Tabla con columnas:
    - ID
    - Conductor (foto + nombre)
    - Origen → Destino
    - Fecha salida
    - Precio
    - Plazas ocupadas/totales
    - Estado
    - Reservas
    - Reportes
    - Fecha creación
    - Acciones
- Búsqueda por origen, destino, conductor
- Filtros:
    - Por estado (Disponible, En curso, Completado, Cancelado)
    - Por rango de fechas
    - Por conductor
    - Con reportes
- Ordenar por cualquier columna
- Paginación
- Acciones:
    - Ver detalle
    - Ver reservas
    - Marcar como completado
    - Cancelar (con motivo)
    - Eliminar (con confirmación doble)
- Ver cupos reportados con prioridad


### **Gestión de Reservas**

- Tabla con columnas:
    - ID
    - Código
    - Pasajero (foto + nombre)
    - Cupo (origen → destino)
    - Conductor
    - Estado
    - Plazas
    - Precio total
    - Fecha reserva
    - Fecha viaje
    - Acciones
- Búsqueda por código, pasajero, conductor
- Filtros:
    - Por estado (todos los estados)
    - Por rango de fechas de viaje
    - Por rango de fechas de reserva
    - Por conductor o pasajero
- Ordenar por cualquier columna
- Paginación
- Acciones:
    - Ver detalle completo
    - Cambiar estado manualmente
    - Cancelar con motivo
    - Resolver disputa
    - Reembolsar (si aplica)


### **Gestión de Reportes**

- Tabs por tipo:
    - Cupos reportados
    - Usuarios reportados
    - Problemas técnicos
    - Todos
- Filtros:
    - Estado: Pendiente, En revisión, Resuelto, Descartado
    - Prioridad: Alta, Media, Baja
    - Por fecha
- Cada reporte muestra:
    - ID del reporte
    - Tipo y motivo
    - Reportado por (usuario)
    - Reportado (cupo/usuario/otro)
    - Descripción
    - Fecha
    - Estado
    - Asignado a (admin)
    - Acciones
- Detalle del reporte:
    - Toda la información
    - Capturas de pantalla adjuntas
    - Historial de cambios
    - Notas internas
    - Acciones de moderación:
        - Cambiar estado
        - Asignar a admin
        - Agregar nota interna
        - Tomar acción (desactivar usuario, eliminar cupo)
        - Contactar usuario
        - Resolver/Descartar
- Notificaciones para nuevos reportes


### **Estadísticas y Reportes**

- Sección de analytics:
    - Usuarios:
        - Crecimiento de usuarios
        - Retención mensual
        - Usuarios activos vs inactivos
        - Distribución por edad
        - Usuarios por ciudad (top 10)
    - Cupos:
        - Cupos creados por período
        - Rutas más populares
        - Precios promedio por ruta
        - Tasa de ocupación
        - Distribución por estado
    - Reservas:
        - Reservas por período
        - Tasa de conversión (visita → reserva)
        - Tasa de confirmación
        - Tasa de cancelación
        - Distribución por estado
    - Calificaciones:
        - Calificación promedio general
        - Distribución de calificaciones
        - Usuarios mejor calificados
        - Usuarios peor calificados
- Rango de fechas seleccionable
- Exportar reportes (PDF, CSV, Excel)
- Programar reportes periódicos por email


### **Configuración del Sistema**

- General:
    - Nombre de la aplicación
    - Logo
    - Colores del tema
    - Email de contacto
    - Redes sociales
- Parámetros:
    - Plazas máximas por cupo
    - Tiempo mínimo antes de salida para reservar
    - Tiempo máximo para confirmar reserva
    - Días de anticipación máxima para crear cupo
- Notificaciones:
    - Configurar servidor de email (SMTP)
    - Plantillas de emails
    - Configurar notificaciones push
- Mantenimiento:
    - Modo mantenimiento (activar/desactivar)
    - Mensaje de mantenimiento
    - Limpiar caché
    - Ver logs del sistema
    - Backup de base de datos
- Moderación:
    - Palabras prohibidas
    - Límites de rate (reservas por hora, etc)
    - Auto-moderación (reglas)

***

## **11. OPTIMIZACIONES TÉCNICAS**

### **Performance**

- Lazy loading de imágenes (carga cuando aparece en viewport)
- Code splitting por rutas (solo carga código de la página actual)
- Comprimir imágenes automáticamente
- Caché de datos frecuentes (cupos, perfil de usuario)
- Prefetch de rutas probables (cuando haces hover)
- Service Workers para PWA (funciona offline parcialmente)
- Virtualización de listas largas (solo renderiza lo visible)


### **SEO (Opcional)**

- Meta tags dinámicos por página
- Open Graph para redes sociales (vista previa al compartir)
- Sitemap XML automático
- URLs amigables (slug-readable)
- Server-side rendering (SSR) o Static Site Generation (SSG)


### **Analytics**

- Google Analytics 4 integrado
- Tracking de eventos clave:
    - Registro completado
    - Cupo creado
    - Reserva realizada
    - Reserva confirmada
    - Viaje completado
    - Calificación enviada
- Funnels de conversión:
    - Vista de cupo → Reserva → Confirmación → Completado
- Heatmaps (opcional, Hotjar o similar)
- Session recording (opcional, para debugging UX)

***

## **12. GESTIÓN DE ERRORES**

### **Manejo de Errores HTTP**

- Interceptor global de errores
- 401 Unauthorized → Refresh token automático o redirect a login
- 403 Forbidden → Mostrar "No tienes permisos"
- 404 Not Found → Mostrar página de error 404
- 500 Server Error → Mostrar "Algo salió mal, intenta de nuevo"
- Timeout → Mostrar "La operación tardó mucho, intenta de nuevo"
- Network Error → Mostrar "Sin conexión a internet"


### **Error Boundaries**

- Catch errores de React que no se capturaron
- Mostrar UI de fallback amigable
- Log del error (enviar a servidor para debugging)
- Botón "Recargar página"


### **Retry Automático**

- Reintentar peticiones fallidas (máximo 3 veces)
- Backoff exponencial (esperar más entre intentos)
- Solo para operaciones GET (no destructivas)


### **Logging**

- Log de errores en consola (desarrollo)
- Enviar errores críticos a servidor (producción)
- No mostrar stack traces al usuario
- Incluir contexto: usuario, página, acción realizada

## **14. ESTADOS FINALES CONSOLIDADOS**

### **Estados de Usuario**

- **PENDING**: Esperando verificar email (no puede hacer login)
- **ACTIVE**: Cuenta activa, acceso completo
- **INACTIVE**: Cuenta desactivada


### **Estados de Cupo**

- **Disponible**: Acepta reservas, tiene plazas (verde)
- **En curso**: Viaje en progreso (azul)
- **Completado**: Viaje terminado (gris)
- **Cancelado**: Cancelado por conductor (rojo)


### **Estados de Reserva**

- **PENDIENTE**: Esperando confirmación del conductor (amarillo)
- **CONFIRMADO**: Conductor aceptó (verde)
- **RECHAZADO**: Conductor rechazó (rojo)
- **CANCELADO**: Cancelada por pasajero o conductor (naranja)
- **COMPLETADO**: Viaje finalizado (azul)

***

¿Te parece completo ahora? ¿Quieres que profundice en alguna sección específica? 🚀

