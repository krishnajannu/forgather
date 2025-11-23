
# Deployment Guide for Gather

This guide outlines how to deploy the Gather application using two popular methods: Google Cloud Run and Vercel (via GitHub).

## Option 1: Deploying via Vercel (Recommended for Frontend)

Vercel is the easiest way to deploy React applications directly from your GitHub repository.

### Prerequisites
*   A GitHub account.
*   A Vercel account (sign up at [vercel.com](https://vercel.com)).
*   Your project pushed to a GitHub repository.

### Steps

1.  **Push Code to GitHub**:
    Ensure your latest code is committed and pushed to a repository on GitHub.

2.  **Import Project in Vercel**:
    *   Log in to your Vercel dashboard.
    *   Click **"Add New..."** -> **"Project"**.
    *   Connect your GitHub account if you haven't already.
    *   Find your `gather` repository and click **"Import"**.

3.  **Configure Project**:
    *   **Framework Preset**: Vercel usually detects `Create React App` or `Vite` automatically. If not, select **"Other"** or **"Vite"** (since this project uses ES modules and no build step in the source provided, ensuring the root directory is correct).
    *   **Root Directory**: Leave as `./` unless your app is in a subfolder.
    *   **Build Command**: If you are using a bundler (like Vite/Webpack), enter `npm run build`. **Note:** The provided project structure is a raw ES module React app without a `package.json` build script. Vercel requires a build step or static file configuration.
        *   *If using the raw files provided*: You might need to set the framework preset to **"Other"** and ensure the Output Directory is set to `.` (current directory) if you are serving raw files, though a build step (like Vite) is highly recommended for production.
    *   **Environment Variables**: Add any required environment variables (e.g., `API_KEY` if you are using one).

4.  **Deploy**:
    *   Click **"Deploy"**.
    *   Vercel will build your project and assign a domain (e.g., `gather-app.vercel.app`).

---

## Option 2: Deploying to Google Cloud Run

Cloud Run is a managed compute platform that lets you run containers directly on top of Google's scalable infrastructure.

### Prerequisites
*   A Google Cloud Platform (GCP) Project.
*   [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) installed and initialized.
*   Docker installed locally.

### 1. Create a Dockerfile

Create a file named `Dockerfile` in your project root with the following content. This uses Nginx to serve your static files.

```dockerfile
# Use a lightweight Nginx image
FROM nginx:alpine

# Copy your application files to the Nginx html directory
COPY . /usr/share/nginx/html

# Copy a custom nginx config if needed (optional, for SPA routing)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
```

### 2. Build and Push the Container Image

Run the following commands in your terminal:

```bash
# 1. Set your GCP project ID
gcloud config set project [YOUR_PROJECT_ID]

# 2. Enable required services
gcloud services enable run.googleapis.com containerregistry.googleapis.com

# 3. Build the image using Cloud Build (easiest method)
gcloud builds submit --tag gcr.io/[YOUR_PROJECT_ID]/gather-app
```

### 3. Deploy to Cloud Run

Once the image is built and stored in the Container Registry (GCR), deploy it:

```bash
gcloud run deploy gather-service \
  --image gcr.io/[YOUR_PROJECT_ID]/gather-app \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

*   `--region`: Choose a region close to your users (e.g., `asia-south1` for Mumbai).
*   `--allow-unauthenticated`: Makes the web app accessible to the public.

### 4. Access Your App

After the deployment finishes, the terminal will output a **Service URL** (e.g., `https://gather-service-uc.a.run.app`). Click this link to view your live application.
