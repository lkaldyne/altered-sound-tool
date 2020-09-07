FROM python:3

RUN mkdir /usr/src/app

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN pip install -r Requirements.txt

RUN apt-get update

RUN apt-get install -y libsndfile1-dev

EXPOSE 5000

CMD ["python", "app.py"]