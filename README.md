# **AI Plant Doctor**

AI Plant Doctor is a professional Progressive Web Application (PWA) that empowers farmers and gardeners to detect plant diseases instantly. By running Deep Learning models directly in the browser using TensorFlow.js, it offers privacy, zero latency, and offline capabilities.
![alt text](image.png)![alt text](image2.png)

## **Features**

**Intelligent Diagnosis:** Instantly detects 38 different plant diseases across 14 crop types using a custom MobileNetV3 model.

**Treatment & Prevention:** Acts as a true "Doctor" by providing actionable advice, treatment steps, and prevention tips for every detected disease.

**Privacy-First:** All analysis happens client-side (in the browser). No user photos are ever uploaded to a cloud server.

**High Performance:** Optimized for mobile devices with a lightweight model (~20MB) and WebGL acceleration.

**Adaptive UI:** Features a modern "Forest Green" glassmorphism interface that adapts to any screen size.

## **Tech Stack**

**Frontend** 

**React (v18):** Component-based UI architecture.

**Vite:** Lightning-fast build tool and dev server.

**TensorFlow.js:** Client-side machine learning engine.

**Lucide React:** Modern iconography.

 **AI & Training**

**Architecture:** MobileNetV3-Small (Transfer Learning).

**Dataset:** PlantVillage (54k+ images).

**Training:** Python/Keras on NVIDIA Tesla T4 GPU.

**Format:** TFJS Graph Model (model.json + Sharded Binaries).

## **Deployment**

**Docker:** Multi-stage build (Node.js builder → Nginx runner).

**Nginx:** High-performance static asset serving with gzip compression.

### **How to Run Locally**
---------------------------
Prerequisites

Node.js (v18+)

Docker (Optional, for production simulation)

**Option 1: Development Mode**

**Clone the repository:**
```
git clone [https://github.com/GughanS/ai-plant-doctor.git](https://github.com/GughanS/ai-plant-doctor.git)
cd ai-plant-doctor/webapp
```

**Install dependencies:**
```
npm install


Start the app:

npm run dev


Open http://localhost:5173 in your browser.
```
**Option 2: Production Mode (Docker)**

This runs the exact Nginx container used in deployment.

**From the root directory:**
```
docker compose up --build
```

**Access the app:**
```
Open http://localhost (Port 80).
```

## **Supported Crops**

The model is trained to recognize diseases in:

Apple, Cherry, Corn, Grape, Peach, Pepper (Bell), Potato, Strawberry, Tomato, and more which are included in PlantVillage dataset.

## **License**

This project is open-source and available under the MIT License.

