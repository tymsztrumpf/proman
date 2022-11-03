from flask import Flask, render_template, url_for,redirect,request
from dotenv import load_dotenv
from util import json_response
import mimetypes
import queries
import help_function

mimetypes.add_type('application/javascript', '.js')
app = Flask(__name__)
load_dotenv()


@app.route("/")
def index():
    boards = queries.get_boards()
    return render_template('index.html',boards = boards)

@app.route("/add_board", methods=['POST'])
def Add_board():
    name_board = request.form['name_board']
    board = queries.Add_board(name_board)
    return render_template('body.html',board_id = board[0]['id'],name_board = name_board)


@app.route("/Show_board/<string:board_name>/<int:board_id>")
def Show_board(board_name,board_id):
    return render_template('body.html',board_id = board_id,name_board = board_name)


@app.route("/api/boards/<int:border_id>/<int:element_id>/<string:column_name>")
@json_response
def change_status_element(border_id: int,element_id: int, column_name:str):
    column = help_function.chenge_name_to_int(column_name)
    queries.update_status_element(element_id,border_id,column)
    

@app.route("/api/text/boards/<int:border_id>/<int:element_id>/<string:text>")
@json_response
def change_text_element(border_id: int,element_id: int, text:str):
    queries.update_text_element(element_id,border_id,text)


@app.route("/api/add/boards/<int:border_id>")
@json_response
def add_element(border_id: int,):
    queries.Add_element(border_id)    

@app.route("/api/boards")
@json_response
def get_boards():
    """
    All the boards
    """
    return queries.get_boards()


@app.route("/api/boards/<int:board_id>/cards/")
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return queries.get_cards_for_board(board_id)


def main():

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    app.run(debug=True)
    main()
