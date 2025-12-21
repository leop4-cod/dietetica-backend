Dietetica Backend API
API RESTful desarrollada con NestJS para la gestion de un sistema de ventas de productos dieteticos. Este proyecto utiliza una Arquitectura hibrida de Bases de Datos, combinando la robustez relacional de PostgreSQL con la flexibilidad de MongoDB

Caracteristicas Principales
Autenticacion y Seguridad
JWT (JSON Web Tokens): Protección de endpoints.
Roles: admin, empleado, cliente.
Logs de Auditoría: Registro automático de inicios de sesión en MongoDB (auth_logs).
Gestión de Ventas (PostgreSQL + MongoDB)
Carrito de Compras (MongoDB): Persistente y flexible por usuario.
Flujo de Venta:
Agregar productos al carrito.
Crear Venta (POST /sales) -> Procesa el carrito, valida stock, aplica cupones, vacía el carrito y guarda la venta en PostgreSQL (sales, sale_details).
Inventario: Control estricto de stock antes de confirmar la venta.
Cupones: Descuentos aplicables al total de la venta.
Catálogo y Feedback
Productos y Categorías: Gestión estructurada en PostgreSQL.
Reseñas (MongoDB): Calificación y comentarios de productos.
Historial de Vistas (MongoDB): Registro de productos visitados por el usuario (view_history).
Nutrición: Planes nutricionales personalizados.
Notificaciones
Envío de Correos: Integración con Gmail (vía Nodemailer) para notificaciones.
Tecnologías
Framework: NestJS
Bases de Datos:
PostgreSQL (TypeORM): Datos relacionales (Usuarios, Productos, Ventas).
MongoDB (Mongoose): Datos semi-estructurados (Logs, Carrito, Historial).
Otros: class-validator, bcrypt, nodemailer.
Requisitos Previos
Node.js (v18 o superior).
PostgreSQL (corriendo en puerto 5432).
MongoDB (corriendo en puerto 27017).
Instalación y Configuración
Clonar el repositorio e instalar dependencias: npm install

Configurar Variables de Entorno: Crea un archivo .env en la raíz del proyecto basándote en este ejemplo:

--- Base de Datos PostgreSQL ---
DB_HOST=localhost DB_PORT=5432 DB_USER=postgres DB_PASS=tu_contraseña_postgres DB_NAME=dietetica_db

--- Base de Datos MongoDB ---
MONGO_URI=mongodb://localhost:27017/dietetica_db

--- Seguridad JWT ---
JWT_SECRET=tu_clave_secreta_super_segura

--- Correo (Gmail App Password) ---
MAIL_USER=tu_correo@gmail.com MAIL_PASS=tu_contraseña_de_aplicacion

Iniciar el Servidor:

Modo desarrollo (con hot-reload)
npm run start:dev

El servidor iniciara en: http://localhost:3000

Pruebas con Postman
En la raíz del proyecto encontrarás el archivo: Dietetica Backend API.postman_collection.json

Abre Postman.
Importa ese archivo.
Configura la variable de entorno baseUrl en Postman a http://localhost:3000.
Flujo Recomendado:
Usa el endpoint Auth > Login para obtener un Token.
Copia el token en la pestaña "Auth" de la colección (o en la variable token).
Prueba los endpoints de Products, Cart, y Sales.


Estructura de Datos

| Módulo | Base de Datos | Descripción |
| :--- | :--- | :--- |
| Users | PostgreSQL | Usuarios, roles y contraseñas. |
| Sales | PostgreSQL | Cabecera de ventas y detalles de productos vendidos. |
| Inventory | PostgreSQL | Stock de productos. |
| Functions | MongoDB | Carrito de compras (`cart`), Logs de Autenticación (`auth_logs`), Historial (`history`). |

---
Proyecto desarrollado para Programación III - Semestre 3