# CCEP MACH Microservice Exercise


## Candidate Name

**Candidate Name:** Rohit SHRIVASTAVA

---

A simple **Node.js + TypeScript** microservice built with **Express**, demonstrating **MACH principles**:

## 🚀 Features

- CRUD APIs for managing health goals
- Input validation using **Zod**
- Structured logging with **Winston**
- Centralized error handling
- Async wrapper to simplify controller code
- In-memory repository (replaceable with DB)


## 🧩 Error flow

```bash
Controller/Service/Repo
      throw error
         ↓
     wrapAsync
         ↓
   errorMiddleware
         ↓
      Response
```


## ⚡️ API Endpoints

### Health Goals
- `POST   /health-goals` → Create a new goal  
- `GET    /health-goals` → List all goals  
- `GET    /health-goals/:id` → Get goal by ID  
- `PUT    /health-goals/:id` → Update a goal  
- `DELETE /health-goals/:id` → Delete a goal  


## 🛠️ Tech Stack

- **Node.js + TypeScript**
- **Express**
- **Zod** (validation)
- **Winston** (logging)
- **Jest + Supertest** → testing


## 🚦 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run in dev mode
```bash
npm run dev
```


### 3. Build and start
```bash
npm run build
npm start
```

### 4. Run tests
```bash
npm run test
```

## 🧪 Testing

- Unit tests written with Jest and Supertest.
- Covers controllers and endpoints.
- Run `npm test  to execute all tests with coverage.

## 📌 Notes

- This service currently uses **in-memory storage** to keep health goals.  
- All data will be lost when the server restarts

## 🧭 Mapping to MACH Principles

- Microservices → Independent service handling only Health Goals, easily deployable as a container.
- API-first → All functionality exposed via REST APIs (/health-goals endpoints), contract-driven design.
- Cloud-native → Stateless, lightweight Node.js service, can run in Docker/Kubernetes, supports scaling.
- Headless → No UI, purely backend APIs — can be consumed by any frontend (web, mobile, or partner system).

## 🖼️ Architecture diagram
![Architecture diagram](https://ik.imagekit.io/906eypkoy87/Architecture%20diagram/diagram-export-09-09-2025-12_52_44_vEO6DjIBj.svg "Architecture diagram")


## 🌐 CI/CD & PR Validation
- PR Validation Workflow
- Runs automatically for every PR to main
- Performs linting, tests, TypeScript build, and Docker image validation
- Fails PR merge if any step fails
- Uses cache for node_modules for faster builds
- GitHub Actions annotations for lint & test errors

## Deployment Workflow
- Triggered automatically when PR is merged into main
- Builds and pushes Docker image to DockerHub
- Deploys to Kubernetes cluster via kubectl