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
def get_user_id(user_name):
    result = data_manager.execute_select("""
            SELECT users.id
            FROM users
            WHERE users.user_name = %(user_name)s
        """, {'user_name': user_name}, fetchall= False)
    return result


def create_board(board_title):
    data_manager.execute_insert(
        """
        INSERT INTO boards (title)
        VALUES (%(board_title)s)
        """
        , {"board_title": board_title})

def update_status_element(element_id,border_id,status):
    data_manager.execute_insert(
        """
        UPDATE cards
        SET status_id = %(status)s
        WHERE id = %(element_id)s AND board_id = %(border_id)s ;
        
        """
        , {"status": status,'element_id':element_id,'border_id':border_id})

def Add_card_to_board(board_id):
    data_manager.execute_insert(
        """
        INSERT INTO cards (board_id,status_id,title,card_order)
        VALUES (%(board_id)s,1,'',0)

        
        """
        , {"board_id": board_id})

def update_text_element(element_id,border_id,text):
    data_manager.execute_insert(
            """
        UPDATE cards
        SET title = %(text)s
        WHERE id = %(element_id)s AND board_id = %(border_id)s ;
        
        """
        , {"text": text,'element_id':element_id,'border_id':border_id})