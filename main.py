from flask import Flask, render_template, url_for, request, redirect, flash, session
from dotenv import load_dotenv
from util import json_response
from werkzeug.security import generate_password_hash, check_password_hash
import mimetypes
import queries
import data_manager

mimetypes.add_type('application/javascript', '.js')
app = Flask(__name__)
app.secret_key = '67823194fh9vytht8'
load_dotenv()


@app.route("/")
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    return render_template('index.html')


@app.route('/register')
def register():
    return render_template('register.html')


@app.route('/register', methods=['POST'])
def register_user():

    new_user = {}
    username = request.form['username']
    password = request.form['password']
    check_user_name = data_manager.get_user(username)

    if check_user_name is None:
        if len(username) >= 1 and len(password) >= 1:
            hashed_password = generate_password_hash(password)
            new_user['username'] = username
            new_user['password'] = hashed_password
            data_manager.add_user(new_user)
            flash('Successful registration. Log in to continue.')
            return redirect(url_for('login'))
        else:
            flash('Please, fill in both fields.', category='error')
        return render_template('register.html')
    else:
        flash('Username already exists, please choose another one!', category='error')
        return render_template('register.html')


@app.route('/login', methods=['POST', 'GET'])
def login():

    if request.method == 'GET':
        return render_template('login.html')

    elif request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        user = data_manager.get_user(username)
        print(user)
        if user and check_password_hash(user['password'], password):
            session['id'] = user['id']
            session['username'] = username
            return redirect(url_for('index'))
        else:
            flash('Wrong username or password.', category='error')
            return render_template('login.html')


@app.route('/logout')
def logout():
    session['username'] = None
    return redirect(url_for('index'))


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
