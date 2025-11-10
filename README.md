# ⚓ FuelEU Maritime — Compliance Management Platform

### 🚀 Full-Stack Development Submission (FuelEU Maritime System)

This project delivers a **FuelEU Maritime Compliance Management Platform** built using **React + TypeScript + Node.js + PostgreSQL**, structured around **Hexagonal Architecture (Ports & Adapters)**.

It covers complete workflow support for:
- Voyage / Route data handling  
- GHG emissions comparison  
- Compliance Balance (CB) calculation  
- FuelEU Banking and Pooling operations  

---

## 🧭 Table of Contents
- [Overview](#overview)
- [Architecture](#architecture)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Database Model](#database-model)
- [API Endpoints](#api-endpoints)
- [Testing Guide](#testing-guide)
- [Project Layout](#project-layout)
- [Enhancements](#enhancements)
- [Author](#author)

---

## 🌍 Overview

**FuelEU Maritime** aims to evaluate and track **GHG intensity compliance** for maritime shipping activities.

The system provides:
- A backend API that performs calculations and stores compliance states.
- A user-facing dashboard (React) that visualizes emissions, comparisons, and CB data.

---

## 🏗️ Architecture

The codebase adheres to **Hexagonal (Clean) Architecture**, ensuring clear separation between:
- **Core business logic**
- **External frameworks and IO layers**

### 🧩 Backend Layout
```
src/
  core/                # Domain logic and entities
  adapters/
    inbound/http/      # Express controllers and routes
    outbound/postgres/ # Prisma repositories (DB layer)
  infrastructure/
    db/                # Prisma client and schema
    server/            # Express app setup
  shared/              # Constants and types
```


### 🎨 Frontend Layout

```
src/
  core/                # Hooks, domain data models
  adapters/
    ui/               # React views & components
    infrastructure/    # Axios API communication layer
  shared/              # Shared reusable definitions
```

This structure keeps logic maintainable and scalable.

---


---

## ⚙️ Features

### 🛳️ Route Dashboard
- Displays full route dataset (`/routes`)
- Fields include: vessel type, fuel, year, emissions, GHG intensity
- Allows selecting a **baseline route**

### ⚖️ Comparison Module
- Calls `/routes/comparison`
- Shows:
  - Baseline vs comparison intensities
  - Percentage deviation
  - Compliance state indicator (✅ / ❌)
- Includes **Recharts bar visualization**

### 💼 Banking (FuelEU Article 20)
- Tracks **Compliance Balance (CB) per vessel/year**
- Allows banking surplus CB for future use
- Automatically applies banked value to deficits

### 🤝 Pooling (FuelEU Article 21)
- Create pools of ships to share surplus/deficit
- Ensures:
  - Combined CB remains ≥ 0
  - Deficit vessels improve, not worsen
  - Surplus contributors never drop below zero

---

## 🧰 Tech Stack

| Layer | Technology |
|------|------------|
| **Frontend** | React, TypeScript, Vite, TailwindCSS, Recharts |
| **Backend** | Node.js, Express, TypeScript, Prisma |
| **Database** | PostgreSQL |
| **Architecture** | Hexagonal / Clean |
| **Development Tools** | ESLint, Prettier, GitHub, AI-assisted coding |

---

## ⚙️ Setup — Backend

### 1️⃣ Install Dependencies
```bash
cd Backend
npm install
```

### 2️⃣ Add Environment Variables
```env
DATABASE_URL="postgresql://postgres:<PASSWORD>@localhost:5432/fueleu?schema=public"
```

### 3️⃣ Run Database Migrations
```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 5️⃣ Start Server
```bash
npx ts-node prisma/seed.ts
```

### 5️⃣ Start Backend
```bash
npm run dev
```

Backend runs at 👉 **http://localhost:4000**

---

## ⚙️ Setup — Frontend

### 1️⃣ Install Dependencies
```bash
cd Frontend
npm install
```

### 2️⃣ Start Dev Server
```bash
npm run dev
```

Frontend runs at 👉 **http://localhost:5173**

Ensure backend is running.

---

## 🗄️ Database & Prisma

**Prisma Models**
- `routes` — Route data (id, routeId, vesselType, fuelType, year, ghgIntensity, etc.)
- `ship_compliance` — Ship-year CB records
- `bank_entries` — Banked surplus records
- `pools` — Pool registry
- `pool_members` — Pool participants with before/after CB

### Compliance Balance Formula
```
CB = (TargetIntensity - ActualIntensity) × (FuelConsumption × 41,000)
TargetIntensity(2025) = 89.3368 gCO₂e/MJ
```

---

## 📡 API Reference

| Method | Endpoint | Description |
|---------|-----------|-------------|
| `GET` | `/routes` | Fetch all routes |
| `POST` | `/routes/:id/baseline` | Set route as baseline |
| `GET` | `/routes/comparison` | Baseline vs comparison data |
| `GET` | `/compliance/cb?shipId&year` | Compute and return CB |
| `POST` | `/compliance/banking/bank` | Bank surplus CB |
| `POST` | `/compliance/banking/apply` | Apply banked surplus |
| `POST` | `/pools` | Create compliance pool |

---

## 🧪 Testing

### Backend
```bash
npm run test
```
*(Unit & integration tests recommended for core modules: CB calculation, Banking, Pooling)*

### Manual API Testing
Use **Postman** or browser to verify endpoints:
1. `/routes` — list routes  
2. `/routes/:id/baseline` — set baseline  
3. `/routes/comparison` — compare data  
4. `/compliance/cb?shipId&year` — check CB  
5. `/pools` — create pool  

---

## 🧩 Project Structure

```
FuelEU-Maritime/
 ├── Backend/
 │   ├── src/
 │   │   ├── core/
 │   │   ├── adapters/
 │   │   └── infrastructure/
 │   ├── prisma/
 │   ├── package.json
 │   └── .env
 ├── Frontend/
 │   ├── src/
 │   │   ├── adapters/ui/
 │   │   ├── adapters/infrastructure/
 │   │   └── core/
 │   ├── package.json
 │   └── vite.config.ts
 ├── README.md
 ├── AGENT_WORKFLOW.md
 └── REFLECTION.md
```

---

## 🚧 Future Improvements

- Add authentication (admin / ship operator roles)
- Add user-specific data filters and dashboards
- Deploy using Docker and CI/CD pipelines
- Add full Jest test coverage
- Add charts to Banking & Pooling tabs

---

## 👨‍💻 Author

**Ansh Rathore**  
🎓 MCA, MNNIT Allahabd , Prayagraj  
🌐 [GitHub](https://github.com/Ansh0226/Fuel-Eu_Maritime)  
📧 Email: anshrathore2604@gmail.com

---


