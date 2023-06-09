import mimetypes

import bcrypt
from dotenv import load_dotenv
from flask import Flask, redirect, render_template, request, session, url_for

import queries
from util import json_response

mimetypes.add_type('application/javascript', '.js')
app = Flask(__name__)
load_dotenv()
app.secret_key = 'somesecretkeythatonlyishouldknow'


@app.route("/")
def index():
    return render_template('index.html')


@app.route("/register", methods=['GET', 'POST'])
def user_register():
    if request.method == 'GET':
        return render_template('registration.html')
    elif request.method == 'POST':
        user_name = request.form['username']
        email = request.form['email']
        pass1 = request.form['password1']
        pass2 = request.form['password2']

        if pass1 == pass2:
            encoded_pass = pass1.encode(encoding='UTF-8')
            hashed_pass = bcrypt.hashpw(encoded_pass, bcrypt.gensalt())
            is_name_free = queries.check_if_user_name_is_free(user_name)
            is_email_free = queries.chech_if_email_is_free(email)
            print(is_name_free)
            if is_name_free == [] and is_email_free == []:
                queries.insert_new_user(
                    user_name, hashed_pass.decode('UTF-8'), email)
            elif is_name_free != []:
                print('login zajęty')
            else:
                print("Email zajęty")
        return redirect(url_for('index'))


@app.route('/login', methods=["GET", "POST"])
def user_login():
    if request.method == "GET":
        return render_template('login.html')
    elif request.method == 'POST':
        user_name = request.form['username']
        password = request.form['password'].encode(encoding='UTF-8')
        if queries.check_if_user_name_is_free(user_name) != []:
            print(queries.check_if_user_name_is_free(user_name))
            user_id = queries.get_user_id(user_name)
            user_id = user_id['id']
            db_password = queries.get_user_password(user_name)
            db_pass_encoded = db_password['password'].encode('UTF-8')
            if bcrypt.checkpw(password, db_pass_encoded) == True:
                session['username'] = user_name
                session['id'] = user_id
                print(session)
                return redirect(url_for('index', session=session))
            else:
                message = 'Wrong password'
                return render_template('login.html', message=message)
        else:
            message_login = 'Wrong login'
            return render_template('login.html', message=message_login)


@app.route('/logout')
def user_logout():
    session.clear()
    return redirect(url_for('index'))


@app.route("/api/boards")
@json_response
def get_boards():
    return queries.get_boards()


@app.route("/api/boards", methods=['POST'])
@json_response
def create_board():
    board = request.json()
    queries.create_board(board['title'])


@app.route("/api/boards/<int:boards_id>/statuses", methods=['GET'])
@json_response
def get_board_statuses(boards_id):
    return queries.get_board_statuses(boards_id)


@app.route("/api/boards/<int:board_id>/title", methods=['PUT'])
@json_response
def change_board_title(board_id: int):
    board = request.json
    queries.update_board_title(board_id, board['title'])


@app.route("/api/cards/<int:card_id>/status", methods=['PUT'])
@json_response
def change_status_card(card_id: int):
    card = request.json
    queries.update_status_card(card_id, card['status'])


@app.route("/api/cards/<int:card_id>/order",methods=['PUT'])
@json_response
def change_order_card(card_id: int):
    card = request.json
    print("id:",card_id,"order",card['order'])
    queries.update_order_card(card_id, card['order'])

@app.route("/api/cards/<int:card_id>/title", methods=['PUT'])
@json_response
def change_text_card(card_id: int):
    card = request.json
    queries.update_text_element(card_id, card['title'])


@app.route("/api/boards/<int:board_id>/cards")
@json_response
def get_cards_for_board(board_id: int):
    return queries.get_cards_for_board(board_id)


@app.route("/api/boards/<int:board_id>/cards", methods=["POST"])
@json_response
def add_card(board_id: int, ):
    card = request.json
    return queries.Add_card_to_board(board_id, card['status'], card['order'])

@app.route('/api/cards/<card_id>', methods=['DELETE'])
@json_response
def delete_card(card_id):
    queries.delete_card(card_id)


@app.route("/api/boards/<int:board_id>/columns",methods=["POST"])
@json_response
def create_column(board_id: int):
    column = request.json
    if not queries.check_if_column_title_is_free(column['title']):
        queries.create_column(board_id, column['title'])
    else:
        queries.create_column_without_status(board_id, column['title'])

@app.route("/api/columns/<int:column_id>/name", methods=['PUT'])
@json_response
def rename_column(column_id: int):
    column = request.json
    queries.rename_column(column_id, column['name'])

@app.route("/api/boards/<int:board_id>", methods=["DELETE"])
@json_response
def delete_board(board_id):
    queries.delete_board(board_id)
@app.route("/api/columns/<int:column_id>",methods=["DELETE"])
@json_response
def delete_column(column_id):
    queries.delete_column(column_id)


def main():
    # Serving the favicon
    with app.app_context():
        app.add_url_rule(
            '/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))



if __name__ == '__main__':
    app.run(debug=True)
    main()
