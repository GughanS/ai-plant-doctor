# Stage 1: Build the React Application
FROM node:18-alpine as builder

WORKDIR /app

# Copy package files first to leverage Docker cache
COPY package.json package-lock.json ./

# Install dependencies (ci is faster and cleaner than install)
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the app for production (creates /dist folder)
RUN npm run build

# Stage 2: Serve with Nginx (The Production Server)
FROM nginx:alpine

# Copy the build output from Stage 1 to Nginx's html folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy our custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 (Standard Web Port)
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]