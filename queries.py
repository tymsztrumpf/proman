import data_manager
import database_common


def get_card_status(status_id):
    """
    Find the first status matching the given id
    :param status_id:
    :return: str
    """
    status = database_common.execute_select(
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

    return database_common.execute_select(
        """
        SELECT * FROM boards
        ;
        """
    )


def get_cards_for_board(board_id):

    matching_cards = database_common.execute_select(
        """
        SELECT * FROM cards
        WHERE cards.board_id = %(board_id)s
        ;
        """
        , {"board_id": board_id})

    return matching_cards


def create_new_board(board_title):
    database_common.execute_insert('''
    INSERT INTO boards (title)
    VALUES (%(title)s);
    ''', {'title': board_title})


def create_new_card(card_title, board_id, status_id):
    database_common.execute_insert('''
    INSERT INTO cards (title, status, board_id)
    VALUES
    (
        %(card_title)s,
        %(status_id)s,
        %(board_id)s
    );
    ''', {'card_title': card_title, 'board_id': board_id, 'status_id': status_id})

