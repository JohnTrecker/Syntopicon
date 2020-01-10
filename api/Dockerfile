
FROM python:3
LABEL Name=Syntopicon Version=0.0.1
WORKDIR src
ADD setup.py .
RUN \
  apk add --no-cache python3 postgresql-libs && \
  apk add --no-cache --virtual .build-deps gcc python3-dev musl-dev postgresql-dev && \
  python3 -m pip install . --no-cache-dir && \
  apk --purge del .build-deps
ADD . .
CMD ["python", "syntopicon.py"]