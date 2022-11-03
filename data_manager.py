import database_common


@database_common.connection_handler
def add_user(cursor, new_user):
    query = """
                INSERT INTO users
                (username, password)
                VALUES (%(username)s, %(password)s )
            """
    cursor.execute(query,
                   {'username': new_user['username'], 'password': new_user['password']})


@database_common.connection_handler
def get_user(cursor, username):
    cursor.execute("""
                        SELECT *
                        FROM users
                        WHERE username = %(username)s
                        """,
                   {'username': username})
    return cursor.fetchone()

