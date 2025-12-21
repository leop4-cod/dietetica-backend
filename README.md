# 🥗 Dietética Backend API

API RESTful desarrollada con **NestJS** para la gestión de un sistema de ventas de productos dietéticos. Este proyecto utiliza una **Arquitectura Híbrida de Bases de Datos**, combinando la robustez relacional de PostgreSQL con la flexibilidad de MongoDB.


## 🚀 Características Principales

### 🔐 Autenticación y Seguridad
*   **JWT (JSON Web Tokens)**: Protección de endpoints.
*   **Roles**: `admin`, `empleado`, `cliente`.
*   **Logs de Auditoría**: Registro automático de inicios de sesión en **MongoDB** (`auth_logs`).

### � Gestión de Ventas (PostgreSQL + MongoDB)
*   **Carrito de Compras (MongoDB)**: Persistente y flexible por usuario.
*   **Flujo de Venta**: 
    1.  Agregar productos al carrito.
    2.  Crear Venta (`POST /sales`) -> Procesa el carrito, valida stock, aplica cupones, vacía el carrito y guarda la venta en PostgreSQL (`sales`, `sale_details`).
*   **Inventario**: Control estricto de stock antes de confirmar la venta.
*   **Cupones**: Descuentos aplicables al total de la venta.

### 📦 Catálogo y Feedback
*   **Productos y Categorías**: Gestión estructurada en PostgreSQL.
*   **Reseñas (MongoDB)**: Calificación y comentarios de productos.
*   **Historial de Vistas (MongoDB)**: Registro de productos visitados por el usuario (`view_history`).
*   **Nutrición**: Planes nutricionales personalizados.

### 📧 Notificaciones
*   **Envío de Correos**: Integración con **Gmail** (vía `Nodemailer`) para notificaciones.


## 🛠️ Tecnologías

*   **Framework**: [NestJS](https://nestjs.com/)
*   **Bases de Datos**:
    *   **PostgreSQL** (TypeORM): Datos relacionales (Usuarios, Productos, Ventas).
    *   **MongoDB** (Mongoose): Datos semi-estructurados (Logs, Carrito, Historial).
*   **Otros**: `class-validator`, `bcrypt`, `nodemailer`.

---

## 📋 Requisitos Previos

1.  **Node.js** (v18 o superior).
2.  **PostgreSQL** (corriendo en puerto 5432).
3.  **MongoDB** (corriendo en puerto 27017).

---

## ⚙️ Instalación y Configuración

1.  **Clonar el repositorio** e instalar dependencias:
    npm install
    

2.  **Configurar Variables de Entorno**:
    Crea un archivo `.env` en la raíz del proyecto basándote en este ejemplo:

    # --- Base de Datos PostgreSQL ---
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=postgres
    DB_PASS=tu_contraseña_postgres
    DB_NAME=dietetica_db

    # --- Base de Datos MongoDB ---
    MONGO_URI=mongodb://localhost:27017/dietetica_db

    # --- Seguridad JWT ---
    JWT_SECRET=tu_clave_secreta_super_segura

    # --- Correo (Gmail App Password) ---
    MAIL_USER=tu_correo@gmail.com
    MAIL_PASS=tu_contraseña_de_aplicacion


3.  **Iniciar el Servidor**:
    # Modo desarrollo (con hot-reload)
    npm run start:dev

    El servidor iniciará en: `http://localhost:3000`



## 🧪 Pruebas con Postman

En la raíz del proyecto encontrarás el archivo:
📄 **`Dietetica Backend API.postman_collection.json`**

1.  Abre Postman.
2.  Importa ese archivo.
3.  Configura la variable de entorno `baseUrl` en Postman a `http://localhost:3000`.
4.  **Flujo Recomendado**:
    *   Usa el endpoint **Auth > Login** para obtener un Token.
    *   Copia el token en la pestaña "Auth" de la colección (o en la variable `token`).
    *   Prueba los endpoints de **Products**, **Cart**, y **Sales**.



## � Estructura de Datos

| Módulo | Base de Datos | Descripción |
| :--- | :--- | :--- |
| **Users** | PostgreSQL | Usuarios, roles y contraseñas. |
| **Sales** | PostgreSQL | Cabecera de ventas y detalles de productos vendidos. |
| **Inventory** | PostgreSQL | Stock de productos. |
| **Functions** | MongoDB | Carrito de compras (`cart`), Logs de Autenticación (`auth_logs`), Historial (`history`). |



*Proyecto desarrollado para Programación III - Semestre 3*