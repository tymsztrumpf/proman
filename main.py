from flask import Flask, render_template, url_for, request, redirect, session
from dotenv import load_dotenv
import data_manager
from util import json_response
import mimetypes
import queries
import help_function
import bcrypt
from flask_session import Session

mimetypes.add_type('application/javascript', '.js')
app = Flask(__name__)
load_dotenv()
app.secret_key = 'somesecretkeythatonlyishouldknow'


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
