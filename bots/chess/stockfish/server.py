from stockfish import Stockfish
from flask import Flask, request
import os

app = Flask(__name__)

@app.route("/<elo>", methods = ['POST'])
def move(elo):
	fen = request.json["payload"]["fen"]
	stockfish = Stockfish(os.getenv("STOCKFISH_PATH"))
	stockfish.set_fen_position(fen)
	stockfish.set_elo_rating(int(elo))
	best_move = stockfish.get_best_move()

	return {"move": formatMove(best_move)}

def formatMove(move):
	formatted_move = {"from": move[0:2], "to": move[2:4]}	
	if (len(move) == 5):
		formatted_move["promotion"] = move[4]
	return formatted_move

	

app.run(host="0.0.0.0", port=10001)