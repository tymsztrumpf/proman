
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


# @app.route("/api/add/card/<int:border_id>")
# @json_response
# def add_element(border_id: int,):
#     queries.Add_card_to_board(border_id)    