# Notes API

A simple REST API built with Node.js and PostgreSQL, deployed using Jenkins CI/CD pipeline and Kubernetes.

## Tech Stack

- **App** → Node.js + Express
- **Database** → PostgreSQL
- **Containerization** → Docker
- **Orchestration** → Kubernetes
- **CI/CD** → Jenkins

## Project Structure

```
Notes-API/
├── src/                  → Application code
│   ├── index.js          → Entry point
│   ├── app.js            → Express setup
│   ├── routes.js         → API endpoints
│   ├── db.js             → Database connection
│   └── tests/            → Jest tests
├── k8s/                  → Kubernetes manifests
│   ├── notes-api.yaml    → App deployment + service
│   └── postgres.yaml     → Postgres deployment + service
├── Dockerfile            → Docker image build instructions
├── docker-compose.yml    → Local development setup
└── Jenkinsfile           → CI/CD pipeline definition
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /health | Health check |
| GET | /notes | Get all notes |
| GET | /notes/:id | Get a single note |
| POST | /notes | Create a note |
| DELETE | /notes/:id | Delete a note |

## CI/CD Pipeline

```
Push to GitHub
      ↓
Jenkins triggers
      ↓
Install dependencies
      ↓
Run tests
      ↓
Build Docker image
      ↓
Push to DockerHub
      ↓
Deploy to Kubernetes
```

## Local Development

```bash
# Clone the repo
git clone https://github.com/Chaitanyaa1211/Notes-API.git

# Copy env file
cp .env.example .env

# Run with Docker Compose
docker-compose up
```

## Run Tests

```bash
cd src
npm install
npm test
```

## Kubernetes Deployment

```bash
kubectl apply -f k8s/
kubectl get pods
```
