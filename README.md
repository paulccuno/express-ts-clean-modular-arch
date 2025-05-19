# 🛠️ SABBI Challenge

Este proyecto es una API REST construida con **Express.js + TypeScript**, siguiendo principios de **Clean Architecture**, usando:

- 🔧 **Sequelize** con PostgreSQL
- 📚 **tsoa** para documentación Swagger y validación
- 🔄 **Inyección de dependencias** con `tsyringe`
- ✅ Validación de datos con `class-validator`
- 📦 Arquitectura modular basada en controladores, servicios y repositorios

---

Perfecto. A continuación te dejo el bloque completo para que lo agregues al inicio de tu `README.md` con las instrucciones para clonar e instalar el proyecto desde tu repositorio:

---

## 🧩 Arquitectura

```
src/
├── app.ts                    # Configuración principal de Express
├── server.ts                 # Arranque del servidor + bootstrap
├── bootstrap.ts              # Inicialización: DB, modelos, sync
├── config/                   # DB y entorno
├── models/                   # Sequelize models
├── dtos/                     # DTOs validados por class-validator
├── controllers/              # Controladores decorados con tsoa
├── services/                 # Lógica de negocio
├── repositories/             # Acceso a la base de datos
├── routes/                   # Rutas generadas por tsoa
├── middlewares/              # Manejo de errores, validaciones, etc.
└── docs/                     # swagger.json generado automáticamente
```

---

## 🚀 Endpoints principales

### 📦 Productos Individuales

| Método | Ruta                           | Descripción               |
| ------ | ------------------------------ | ------------------------- |
| GET    | `/productos-individuales`      | Lista todos los productos |
| GET    | `/productos-individuales/{id}` | Obtiene uno por ID        |
| POST   | `/productos-individuales`      | Crea uno nuevo            |
| PUT    | `/productos-individuales/{id}` | Actualiza uno             |
| DELETE | `/productos-individuales/{id}` | Elimina uno               |

### 🧩 Productos Compuestos

| Método | Ruta                         | Descripción                                      |
| ------ | ---------------------------- | ------------------------------------------------ |
| GET    | `/productos-compuestos`      | Lista todos los compuestos                       |
| GET    | `/productos-compuestos/{id}` | Obtiene un compuesto con sus subproductos        |
| POST   | `/productos-compuestos`      | Crea un compuesto con subproductos y porcentajes |
| PUT    | `/productos-compuestos/{id}` | Actualiza un compuesto                           |
| DELETE | `/productos-compuestos/{id}` | Elimina un producto compuesto                    |

---

## 📚 Documentación Swagger

Swagger se genera automáticamente con `tsoa` y está disponible en:

> [`http://localhost:3000/docs`](http://localhost:3000/docs)

---

## 🧱 Requisitos

- Node.js 18+
- PostgreSQL 13+
- yarn o npm

---

## ⚙️ Instalación

```bash
# Clona el proyecto
git clone https://github.com/tu-usuario/sabbi-challenge.git
cd sabbi-challenge

# Instala dependencias
npm install

# Crea el archivo de entorno
cp .env.example .env.{entorno}

# Ejecutar el proyecto
npm run dev
```

## 📦 Ejecución con Docker

```bash
docker-compose up --build
```

Esto hará lo siguiente:

- Levanta un contenedor de PostgreSQL
- Ejecuta la app con ts-node-dev
- Conecta ambos servicios internamente
