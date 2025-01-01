# Frontend build stage
FROM node:16 AS frontend-build
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy source files
COPY public ./public
COPY src ./src
COPY index.html .
COPY vite.config.js .

# Build the app
RUN npm run build

FROM python:3.11-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

# Create and set working directory
WORKDIR /app

# Copy Python requirements and install dependencies
COPY backend/requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code maintaining structure
COPY backend/core ./core
COPY backend/base.py .
COPY backend/vsxdata.db ./core/

# Copy built frontend from previous stage
COPY --from=frontend-build /app/build /app/core/build

# Copy gunicorn configuration
COPY gunicorn.conf.py .

# Set environment variables
ENV FLASK_APP=base.py
ENV FLASK_DEBUG=1
ENV PYTHONPATH=/app
ENV PORT=8000

# Run the application
CMD ["gunicorn", "--config=gunicorn.conf.py", "base:app"]

# Copy compressed SQL dump
COPY backend/vsxdata.sql.gz ./core/

# Install sqlite3
RUN apt-get update && apt-get install -y sqlite3

# Decompress and restore database
RUN gunzip ./core/vsxdata.sql.gz && \
    sqlite3 ./core/vsxdata.db < ./core/vsxdata.sql && \
    rm ./core/vsxdata.sql