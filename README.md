# 🚀 Full Stack Microservices App

This is a full-stack web application using:

- 🌐 **Next.js** for the frontend
- ⚙️ **NestJS** for backend microservices architecture
- 🔗 **gRPC** for inter-service communication
- 📦 **Docker** for containerization
- 🐘 **PostgreSQL** for persistent data storage

---

## 🧱 Tech Stack

| Technology      | Description                          | Logo |
|----------------|--------------------------------------|------|
| **Next.js**     | React-based frontend framework       | ![Next.js](https://img.shields.io/badge/Next.js-000?logo=nextdotjs&logoColor=white) |
| **NestJS**      | Scalable Node.js server-side framework | ![NestJS](https://img.shields.io/badge/NestJS-E0234E?logo=nestjs&logoColor=white) |
| **gRPC**        | Protocol for efficient communication | ![gRPC](https://img.shields.io/badge/gRPC-448AFF?logo=grpc&logoColor=white) |
| **Docker**      | Container platform                   | ![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white) |
| **PostgreSQL**  | Relational database                  | ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?logo=postgresql&logoColor=white) |

---

## 📁 Project Structure

├── authentication # NestJS microservice for auth
├── product # NestJS microservice for products
├── gateway # NestJS API gateway (gRPC client)
├── frontend # Next.js frontend
├── docker-compose.yml
└── README.md

---

## ⚙️ How It Works

- `authentication` and `product` are **NestJS microservices** exposing **gRPC services**.
- `gateway` is a **NestJS gateway** that connects to the microservices using gRPC clients.
- `frontend` is a **Next.js app** that communicates with the `gateway` via REST.
- All services are orchestrated using **Docker Compose**.

---

## 🚀 Getting Started

### Prerequisites

- Docker & Docker Compose
- Node.js & npm (for local dev)

---

### 🔧 Run with Docker

```bash
# Build and start all services
docker compose up --build
Frontend will be available at: http://localhost:3000
Gateway (API): http://localhost:3001
[frontend] ───── REST ─────> [gateway (NestJS)] ─── gRPC ──┐
                                                           ├──> [authentication]
                                                           └──> [product]
