# Base image for Python
FROM python:3.9-slim as backend

# Set working directory
WORKDIR /app

# Install dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend/ .

# Collect static files
RUN python manage.py collectstatic --noinput

# Base image for Node.js
FROM node:16-alpine as frontend

# Set working directory
WORKDIR /app

# Install dependencies
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install

# Copy frontend code
COPY frontend/ .

# Build the frontend
RUN npm run build

# Final image to combine both frontend and backend
FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Copy backend from the backend stage
COPY --from=backend /app /app

# Copy frontend build from the frontend stage
COPY --from=frontend /app/build /app/frontend/build

# Expose the port for the backend
EXPOSE 8000

# Command to run the backend server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
