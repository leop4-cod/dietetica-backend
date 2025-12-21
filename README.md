# Dietetica Backend API

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

API RESTful desarrollada con NestJS para la gestión de un sistema de ventas de productos dietéticos. Este proyecto utiliza una Arquitectura híbrida de Bases de Datos, combinando la robustez relacional de PostgreSQL con la flexibilidad de MongoDB.

## Características Principales

### Autenticación y Seguridad
* **JWT (JSON Web Tokens)**: Protección de endpoints.
* **Roles**: `admin`, `empleado`, `cliente`.
* **Logs de Auditoría**: Registro automático de inicios de sesión en **MongoDB** (`auth_logs`).

### Gestión de Ventas (PostgreSQL + MongoDB)
* **Carrito de Compras (MongoDB)**: Persistente y flexible por usuario.
* **Flujo de Venta**: 
    1. Agregar productos al carrito.
    2. Crear Venta (`POST /sales`) -> Procesa el carrito, valida stock, aplica cupones, vacía el carrito y guarda la venta en PostgreSQL (`sales`, `sale_details`).
* **Inventario**: Control estricto de stock antes de confirmar la venta.
* **Cupones**: Descuentos aplicables al total de la venta.

### Catálogo y Feedback
* **Productos y Categorías**: Gestión estructurada en PostgreSQL.
* **Reseñas (MongoDB)**: Calificación y comentarios de productos.
* **Historial de Vistas (MongoDB)**: Registro de productos visitados por el usuario (`view_history`).
* **Nutrición**: Planes nutricionales personalizados.

### Notificaciones
* **Envío de Correos**: Integración con **Gmail** (vía `Nodemailer`) para notificaciones.

## Instalación y Configuración

```bash
$ npm install