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

---


## Objective
Design and implement a simple microservice that adheres to **MACH architecture principles**:
- **Microservices**: Independently deployable services.
- **API-first**: All functionality exposed via APIs.
- **Cloud-native**: Designed for cloud environments.
- **Headless**: Decoupled frontend and backend.

The microservice should expose a RESTful API to manage a resource (for example, a **health goal** for consumers).

---

## Requirements


### 1. Design the Microservice
- Define the resource your service will manage (e.g., health goals, user profiles, tasks). For example, you may choose to manage a `health goal` resource.
- Create a **brief architectural diagram** showing how your service fits into a MACH ecosystem and potential interactions with other services.  
  > You may use Mermaid.js, draw.io, or any tool of your choice. Include the diagram (or link) in your repo, preferably in a `/docs` folder or directly in the README.


### 2. Implement the Microservice
- Choose a programming language and framework:
  - **Java** (Spring Boot)
  - **Python** (Flask or FastAPI)
  - **JavaScript/TypeScript** (Node.js with Express or NestJS)
- Implement a RESTful API with endpoints for:
  - `POST /resource` → Create a new resource
  - `GET /resource` → Retrieve all resources
  - `PUT /resource/{id}` → Update a resource
  - `DELETE /resource/{id}` → Delete a resource
- Include:
  - Input validation
  - Error handling


### 3. Documentation
Add clear documentation in your repo that explains:
- How to set up and run the service locally (use code blocks for commands).
- The design choices you made, including any assumptions.
- How your service adheres to MACH principles.

**Recommended Documentation Structure:**
- Setup
- Usage
- Design Decisions
- MACH Principles
- API Reference
- Testing


### 4. Testing
- Write **unit tests** for your API endpoints.  
- Provide instructions on how to run the tests.  


### 5. Optional Enhancements 
- Cloud deployment instructions (AWS, Azure, GCP).  
- Simple frontend interface (e.g., React) to interact with the API. 
- Infrastructure as Code (Terraform) for provisioning.
- Briefly describe your approach to automated testing and deployment (CI/CD).


## Deliverables
- Working microservice in your chosen language/framework.  
- README documenting design and setup.  
- Unit tests.  
- Optional: diagrams, deployment/config files, frontend.  

---


## Getting Started
- [ ] Fork this repository (`ccep-mach-microservice-exercise`) into your own GitHub account
- [ ] Fill in your name at the top of this README under *Candidate Name*
- [ ] Implement your solution in the forked repository
- [ ] Update the README with your instructions and design notes
- [ ] Share the link to your completed repository

---


## Candidate Note on Evaluation
Submissions will be evaluated on correctness, code quality, documentation clarity, adherence to MACH principles, and test coverage.
