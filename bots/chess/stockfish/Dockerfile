FROM python:3.10.0
RUN apt-get -y update
RUN apt-get -y install stockfish
WORKDIR /app
COPY . .
RUN pip install -r requirements.txt
ENV STOCKFISH_PATH=/usr/games/stockfish
CMD ["python", "server.py"]
