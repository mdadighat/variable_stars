import os

port = os.environ.get('PORT', '8000')
bind = f"0.0.0.0:{port}"

workers = 4
worker_class = "sync"
worker_connections = 1000
timeout = 120

# Logging
accesslog = "-"
errorlog = "-"
loglevel = "info"

# SSL/TLS Settings
forwarded_allow_ips = '*'
secure_scheme_headers = {
    'X-FORWARDED-PROTOCOL': 'ssl',
    'X-FORWARDED-PROTO': 'https',
    'X-FORWARDED-SSL': 'on'
}

def post_fork(server, worker):
    server.log.info(f"Worker spawned (pid: {worker.pid})")

def when_ready(server):
    server.log.info(f"Server is ready. Listening on: {bind}")
