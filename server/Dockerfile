
FROM python:3
WORKDIR src
ADD setup.py .
RUN pip install .
ADD . .

CMD python syntopicon.py
