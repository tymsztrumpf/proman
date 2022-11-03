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