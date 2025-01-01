# Use multi-stage build
FROM node:16 AS frontend-build
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . ./
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