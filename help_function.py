import queries


def change_name_to_int(name):
    statuses = queries.get_statuses()
    for status in statuses:
        if status.name == name:
            return status.id