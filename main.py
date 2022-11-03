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

# @app.route("/api/boards/<string:Board_Title>", methods=['POST'])
# @json_response
# def create_board(Board_Title):
#     queries.create_board(Board_Title)



# @app.route("/api/boards/<int:border_id>/<int:element_id>/<string:column_name>")
# @json_response
# def change_status_element(border_id: int,element_id: int, column_name:str):
#     column = help_function.chenge_name_to_int(column_name)
#     queries.update_status_element(element_id,border_id,column)
    

# @app.route("/api/text/boards/<int:border_id>/<int:element_id>/<string:text>")
# @json_response
# def change_text_element(border_id: int,element_id: int, text:str):
#     queries.update_text_element(element_id,border_id,text)


# @app.route("/api/add/card/<int:border_id>")
# @json_response
# def add_element(border_id: int,):
#     queries.Add_card_to_board(border_id)    

@app.route("/api/boards")
@json_response
def get_boards():
    return queries.get_boards()


@app.route("/api/boards/<int:board_id>/cards/")
@json_response
def get_cards_for_board(board_id: int):

    return queries.get_cards_for_board(board_id)


def main():

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    app.run(debug=True)
    main()
