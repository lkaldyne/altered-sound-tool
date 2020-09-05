FROM python:3

RUN mkdir /usr/src/app

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN pip install -r Requirements.txt

RUN mkdir /usr/src/app/uploads

EXPOSE 5000

CMD ["python", "app.py"]