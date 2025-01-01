bind = "0.0.0.0:8000"
workers = 4
worker_class = "sync"
timeout = 30
accesslog = "-"
errorlog = "-"
loglevel = "debug"

# Static file serving
forwarded_allow_ips = '*'
secure_scheme_headers = {
    'X-FORWARDED-PROTOCOL': 'ssl',
    'X-FORWARDED-PROTO': 'https',
    'X-FORWARDED-SSL': 'on'
}
