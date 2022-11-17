--
-- PostgreSQL database Proman
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

SET default_tablespace = '';

SET default_with_oids = false;

---
--- drop tables
---

DROP TABLE IF EXISTS statuses CASCADE;
DROP TABLE IF EXISTS boards CASCADE;
DROP TABLE IF EXISTS cards;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS boards_statuses;


---
--- create tables
---

CREATE TABLE statuses (
    id       SERIAL PRIMARY KEY     NOT NULL,
    title    VARCHAR(200)           NOT NULL
);

CREATE TABLE boards (
    id          SERIAL PRIMARY KEY  NOT NULL,
    title       VARCHAR(200)        NOT NULL
);

CREATE TABLE cards (
    id          SERIAL PRIMARY KEY  NOT NULL,
    board_id    INTEGER             NOT NULL,
    status_id   INTEGER             NOT NULL,
    title       VARCHAR (200)       NOT NULL,
    card_order  INTEGER             NOT NULL
);
CREATE TABLE boards_statuses (
    id          SERIAL PRIMARY KEY  NOT NULL,
    board_id    INTEGER             NOT NULL,
    status_id   INTEGER             NOT NULL,
    title       VARCHAR (200)       NOT NULL
);

CREATE TABLE users (
    id          SERIAL PRIMARY KEY  NOT NULL,
    user_name   text                NOT NULL,
    password    text                NOT NULL,
    e_mail      text                NOT NULL
);

---
--- insert data
---

INSERT INTO statuses(title) VALUES ('new');
INSERT INTO statuses(title) VALUES ('in progress');
INSERT INTO statuses(title) VALUES ('testing');
INSERT INTO statuses(title) VALUES ('done');

INSERT INTO boards(title) VALUES ('Board 1');
INSERT INTO boards(title) VALUES ('Board 2');

INSERT INTO boards_statuses(board_id,status_id,title) VALUES (1, 1,'new');
INSERT INTO boards_statuses(board_id,status_id,title) VALUES (1, 2,'in progress');
INSERT INTO boards_statuses(board_id,status_id,title) VALUES (1, 3,'testing');
INSERT INTO boards_statuses(board_id,status_id,title) VALUES (1, 4,'done');
INSERT INTO boards_statuses(board_id,status_id,title) VALUES (2, 1,'new');
INSERT INTO boards_statuses(board_id,status_id,title) VALUES (2, 2,'in progress');
INSERT INTO boards_statuses(board_id,status_id,title) VALUES (2, 3,'testing');
INSERT INTO boards_statuses(board_id,status_id,title) VALUES (2, 4,'done');


INSERT INTO cards VALUES (nextval('cards_id_seq'), 1, 1, 'new card 1', 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 1, 1, 'new card 2', 2);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 1, 2, 'in progress card', 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 1, 3, 'planning', 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 1, 4, 'done card 1', 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 1, 4, 'done card 1', 2);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 2, 1, 'new card 1', 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 2, 1, 'new card 2', 2);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 2, 2, 'in progress card', 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 2, 3, 'planning', 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 2, 4, 'done card 1', 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 2, 4, 'done card 1', 2);


INSERT INTO users (user_name, password, e_mail) VALUES ('admin', 'admin1', 'admin@wp.pl');



---
--- add constraints
---

ALTER TABLE ONLY cards
    ADD CONSTRAINT fk_cards_board_id FOREIGN KEY (board_id) REFERENCES boards(id);

ALTER TABLE ONLY cards
    ADD CONSTRAINT fk_cards_status_id FOREIGN KEY (status_id) REFERENCES statuses(id);

ALTER TABLE ONLY boards_statuses
    ADD CONSTRAINT fk_boards_statuses_board_id FOREIGN KEY (board_id) REFERENCES boards(id);

ALTER TABLE ONLY boards_statuses
    ADD CONSTRAINT fk_boards_statuses_status_id FOREIGN KEY (status_id) REFERENCES statuses(id);