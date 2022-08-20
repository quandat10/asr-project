FROM python:3.9

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt

RUN python -m pip install --upgrade pip

RUN python -m pip install uvicorn

RUN python -m pip install --no-cache-dir --upgrade -r /code/requirements.txt

EXPOSE 8000

COPY . /code/

CMD ["python","-m","uvicorn", "main:app"]