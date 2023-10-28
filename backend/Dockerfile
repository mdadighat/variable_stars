FROM python:3.11-slim

RUN useradd core

WORKDIR /usr/src/app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY core core
COPY base.py ./
COPY vsxdata.db ./core

ENV FLASK_APP base.py

RUN chown -R core:core ./
USER core

EXPOSE 8000

CMD [ "gunicorn", "-b",x "--access-logfile", "-", "base:app", "--workers=4"]