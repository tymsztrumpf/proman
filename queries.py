import data_manager


def get_card_status(status_id):
    """
    Find the first status matching the given id
    :param status_id:
    :return: str
    """
    status = data_manager.execute_select(
        """
        SELECT * FROM statuses s
        WHERE s.id = %(status_id)s
        ;
        """
        , {"status_id": status_id})

    return status


def get_boards():
    """
    Gather all boards
    :return:
    """

    return data_manager.execute_select(
        """
        SELECT * FROM boards
        ;
        """
    )


def get_cards_for_board(board_id):

    matching_cards = data_manager.execute_select(
        """
        SELECT * FROM cards
        WHERE cards.board_id = %(board_id)s
        ;
        """
        , {"board_id": board_id})

    return matching_cards

def insert_new_user(user_name, password, email):
    data_manager.execute_insert("""
        INSERT INTO users (user_name, password, e_mail) VALUES (%(user_name)s, %(password)s, %(email)s)
    """, {'user_name': user_name, 'password': password, 'email': email})

def check_if_user_name_is_free(user_name):
    result = data_manager.execute_select("""
        SELECT 1 as result
        FROM users
        WHERE users.user_name = %(user_name)s
    """, {'user_name': user_name})
    return result

def chech_if_email_is_free(email):
    result = data_manager.execute_select("""
        SELECT 1 as result
        FROM users
        WHERE users.e_mail = %(email)s
    """, {'email': email})
    return result

def get_user_password(user_name):
    result = data_manager.execute_select("""
            SELECT password
            FROM users
            WHERE users.user_name = %(user_name)s
        """, {'user_name': user_name}, fetchall= False)
    return result