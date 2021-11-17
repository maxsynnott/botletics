# ! This is temp code. Judgement is strictly prohibited

from stockfish import Stockfish
import flask
import os

app = flask.Flask(__name__)

@app.route("/", methods = ['POST'])
def move():
	fen = flask.request.json["payload"]["fen"]
	stockfish = Stockfish(os.getenv("STOCKFISH_PATH"))
	stockfish.set_fen_position(fen)
	elo = 2000
	stockfish.set_elo_rating(elo)
	best_move = stockfish.get_best_move()

	return {"move": formatMove(best_move)}

def formatMove(move):
	formatted_move = {"from": move[0:2], "to": move[2:4]}	
	if (len(move) == 5):
		formatted_move["promotion"] = move[4]
	return formatted_move

@app.route("/healthcheck", methods = ['GET'])
def healthCheck():
	return flask.Response(status=200)

app.run(host="0.0.0.0", port=10001)
