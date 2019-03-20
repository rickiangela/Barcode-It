USE barcode_it_db;

INSERT INTO Users
(id, email, password, createdAt, updatedAt) VALUES (1, 'gamer1980@gmail.com', 'MarioBros64', '2019-03-17 21:40:00', '2019-03-17 21:40:00');

INSERT INTO Barcodes (barcode_num, title, description, photo_url, createdAt, updatedAt) VALUES ('238745123412', 'Box 1', 'Christmas Decorations', NULL, '2019-03-17 21:40:00', '2019-03-17 21:40:00', 1), ('517263498723', 'Box 2', 'Random Pop Funkos', NULL, '2019-03-17 21:40:00', '2019-03-17 21:40:00', 1), ('812345678230', 'Keepsakes', 'Stuff from Grandmas Closet', NULL, '2019-03-17 21:40:00', '2019-03-17 21:40:00', 1);

INSERT INTO Items (item_name, description, photo_url, createdAt, updatedAt, UserId) VALUES ('Christmas Lights', NULL, NULL, '2019-03-17 21:40:00', '2019-03-17 21:40:00', 1), ('Tree Topper', NULL, NULL, '2019-03-17 21:40:00', '2019-03-17 21:40:00', 1), ('Harry Potter', 'Pop Funko', '2019-03-17 21:40:00', '2019-03-17 21:40:00', 1), ('Small Fish Bowl', NULL, '2019-03-17 21:40:00', '2019-03-17 21:40:00', 1), ('Christmas Lights', NULL, NULL, '2019-03-17 21:40:00', '2019-03-17 21:40:00', 1), ('Serving Tray', NULL, NULL, '2019-03-17 21:40:00', '2019-03-17 21:40:00', 1);