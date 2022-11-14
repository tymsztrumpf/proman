import mimetypes

import bcrypt
from dotenv import load_dotenv
from flask import Flask, redirect, render_template, request, session, url_for

import help_function
import queries
from util import json_response

mimetypes.add_type('application/javascript', '.js')
app = Flask(__name__)
load_dotenv()
app.secret_key = 'somesecretkeythatonlyishouldknow'


@app.route("/")
def index():
    return render_template('index.html')

@app.route("/api/boards/<string:Board_Title>", methods=['POST'])
@json_response
def create_board(Board_Title):
    queries.create_board(Board_Title)
    



@app.route("/api/boards/<int:board_id>/<int:card_id>/<string:status>", methods=['PUT'])
@json_response
def change_status_element(board_id: int, card_id: int, status:str):
    column = help_function.chenge_name_to_int(status)
    queries.update_status_element(card_id, board_id, column)


@app.route("/api/boards/<int:board_id>/<int:card_id>/title/<string:title>", methods=['PUT'])
@json_response
def change_text_element(board_id: int, card_id: int, title: str):
    queries.update_text_element(board_id, card_id, title)


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
                queries.insert_new_user(user_name, hashed_pass.decode('UTF-8'), email)
            elif is_name_free != []:
                print('login zajęty')
            else:
                print("Email zajęty")
        return redirect(url_for('index'))


@app.route('/login', methods= ["GET", "POST"])
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
                return render_template('login.html', message= message)
        else:
            message_login = 'Wrong login'
            return render_template('login.html', message= message_login)



@app.route('/logout')
def user_logout():
    session.clear()
    return redirect(url_for('index'))

@app.route("/api/boards/<int:board_id>/newcard", methods= ["POST"])
@json_response
def add_card(board_id: int,):
    return queries.Add_card_to_board(board_id)

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
