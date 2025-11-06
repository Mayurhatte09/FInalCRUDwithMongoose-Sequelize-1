
***
# Final CRUD Application - Jenkins CI/CD Automation
***

## 📖 Overview
FinalCRUD is a full-stack Node.js CRUD backend integrating both MongoDB (via Mongoose) and MySQL (via Sequelize).  
This project showcases an end-to-end automated CI/CD pipeline using Jenkins, Docker, and Kubernetes.

---

## 🧩 Architectural Flow

   ┌──────────────┐  ┌──────────────┐   ┌──────────────┐  ┌──────────────────┐
┌────────────┐     ┌─────────┐     ┌────────────┐     ┌────────────┐     ┌──────────────┐ 
│  Develope  │ →→→ │ GitHub  │ →→→ │  Jenkins   │ →→→ │  DockerHub │ →→→ │  Kubernetes  │ 
└────────────┘     └─────────┘     └────────────┘     └────────────┘     └──────────────┘
   └──────────────┘  └──────────────┘   └──────────────┘  └──────────────────┘ 

---

## 🧩 Tech Stack
- Node.js (Express.js)
- MongoDB (Mongoose)
- MySQL (Sequelize ORM)
- Docker
- Jenkins Pipeline
- Kubernetes
- Docker Hub Registry

---

## ⚙️ Prerequisites
| Requirement | Description |
|--------------|-------------|
| Jenkins | Installed on Linux or EC2 |
| Docker | Installed and configured |
| KubeCTL | Cluster configuration setup |
| Git | Installed |
| Node.js | Version 14 or above |
| Database | MongoDB + MySQL connections configured in `.env` |

---

## 🗂 Project Structure
```
FinalCRUDwithMongoose-Sequelize-1/
├── models/
├── routes/
├── config/
├── app.js
├── package.json
├── Dockerfile
├── finalcrud-deploy.yaml
└── Jenkinsfile
```

---

## 💡 Features
- Dual database integration (MongoDB and MySQL)
- RESTful CRUD endpoints
- Automatic container build and deploy pipeline
- Seamless Kubernetes rolling updates

---

## 🔧 Local Build and Run

### Step 1: Clone Repository
```
git clone https://github.com/Mayurhatte09/FinalCRUDwithMongoose-Sequelize-1.git
cd FinalCRUDwithMongoose-Sequelize-1
```

### Step 2: Install Dependencies
```
npm install
npm run dev
```

### Step 3: Dockerize (Optional)
```
docker build -t finalcrud-app:v1 .
docker run -p 3000:3000 finalcrud-app:v1
```

Visit the application at `http://localhost:3000`.

---

## ⚙️ Jenkins Pipeline Configuration

1. In Jenkins → **Manage Jenkins → Plugins**  
   Ensure:
   - Docker Pipeline
   - Git
   - Pipeline Utility Steps
   - Kubernetes CLI Plugin

2. Create Docker Hub Credential:
   - ID: `dockerhub-pass`
   - Type: Secret Text
   - Secret: Docker Hub password or access token

3. Add Jenkins to Docker group:
```
sudo usermod -aG docker jenkins
sudo systemctl restart jenkins
```

4. Verify Kube access:
```
kubectl get pods
```

---

## 🧱 Jenkinsfile Flow

| Stage | Description |
|--------|--------------|
| Checkout | Pull latest GitHub code |
| Install Dependencies | Installs packages |
| Docker Build | Builds image with new version |
| Push Image | Pushes image to Docker Hub |
| Update YAML | Updates image tag in deployment file |
| Apply to Cluster | Runs `kubectl apply` to redeploy |

---

## 🚀 Deploy to Kubernetes

1. In Jenkins → **New Item → Pipeline**
2. Name: `FinalCRUD-CI-CD`
3. Source Control: Git
4. Repository URL:  
   `https://github.com/Mayurhatte09/FinalCRUDwithMongoose-Sequelize-1.git`
5. Click **Build Now**

Jenkins will:
- Clone repo  
- Build Docker image  
- Push to Docker Hub  
- Update deploy YAML  
- Apply changes on Kubernetes

---

## 🧾 Post-Deployment Check
After pipeline success:
```
kubectl get pods -o wide
kubectl get deployments
kubectl get svc
```

Then test using NodePort or ingress endpoint.

---

## ⚙️ Troubleshooting
| Issue | Cause | Fix |
|--------|--------|-----|
| Image push failed | Credential error | Recheck `dockerhub-pass` ID |
| Pod crash | App dependency mismatch | Run `kubectl logs <pod>` |
| YAML not updating | sed command failed | Verify image tag pattern |

---

## 👨‍💻 Author
**Mayur Hatte**  
- GitHub: [Mayurhatte09](https://github.com/Mayurhatte09)  
- Docker Hub: [mayrhatte09](https://hub.docker.com/u/mayrhatte09)

---

### 🌐 Pipeline Flow Diagram
```
GitHub → Jenkins (Build) → Docker Hub (Push) → Kubernetes (Deploy)
```

This setup delivers complete automation from code commit to deployment with zero manual effort.


***
