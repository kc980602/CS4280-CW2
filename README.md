# CS4280-CW2

Music Store Web Site 
App name - Mue

Route Design

-Documentation static page
/my-design

-Index page
/ 
-Sign in / Sign out
/login
/register

-My purchase
/profile
/profile/collection
/profile/purchase

-Shopping cart
/cart

-Checkout
/checkout

-Admin page
/admin -> statistics of sales
/admin/product
/admin/product/add
/admin/product/album
/admin/product/track
/admin/refund

-Browse albums, query from album DB
/browse redirect /browse/albums
/browse/albums
-Browse tracks, query from track DB
/browse/tracks

Database design

A track must belong to a album

-User
	id, username, password, point, status, created
-Cart
	id, album.id, track_id, user.id, status, created
-Order
	id, user.id, status, created
-OrderItem
	id, order.id,  album.id, track,id, price, refundable, status, 
-Album
	id, title, artist, label, release_date, status, created
-Track
	id, album.id, title, artist, length, price, quantity, file, file_preview, status, created

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
	`id` INT(10) NOT NULL AUTO_INCREMENT,
	`username` VARCHAR(20) NOT NULL,
	`password` VARCHAR(200) NOT NULL,
	`point`  INT DEFAULT '0',
	`role` VARCHAR(10) DEFAULT '',
	`status` INT(3) DEFAULT 0,
	`created` TIMESTAMP  DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`)
);
ALTER TABLE `user` ADD UNIQUE(username);

DROP TABLE IF EXISTS `album`;
CREATE TABLE `album` (
	`id` INT(10) NOT NULL AUTO_INCREMENT,
	`title` VARCHAR(100) NOT NULL,
	`artist` VARCHAR(100) NOT NULL,
	`label` VARCHAR(100) DEFAULT '',
	`release_date` DATE NOT NULL,
	`status` INT(3) DEFAULT 0,
	`created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `track`;
CREATE TABLE `track` (
	`id` INT(10) NOT NULL AUTO_INCREMENT,
	`album_id` INT(10) NOT NULL,
	`title` VARCHAR(100) NOT NULL,
	`artist` VARCHAR(100) NOT NULL,
	`length` INT(6) NOT NULL,
	`price` INT(6) NOT NULL,
	`quantity` INT(6) NOT NULL,
	`file` VARCHAR(200) NOT NULL,
	`file_preview` VARCHAR(200) NOT NULL,
	`status` INT(3) DEFAULT 0,
	`created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`)
);
ALTER TABLE `track`
ADD CONSTRAINT fk_track_album_id FOREIGN KEY (album_id) REFERENCES album(id);

DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart` (
	`id` INT(10) NOT NULL AUTO_INCREMENT,
	`user_id` INT(10) NOT NULL,
	`album_id` INT(10) NOT NULL,
	`track_id` INT(10) NOT NULL,
	`created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`)
);
ALTER TABLE `cart`
ADD CONSTRAINT fk_cart_user_id FOREIGN KEY (user_id) REFERENCES user(id),
ADD CONSTRAINT fk_cart_album_id FOREIGN KEY (album_id) REFERENCES album(id),
ADD CONSTRAINT fk_cart_track_id FOREIGN KEY (track_id) REFERENCES track(id);

DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
	`id` INT(10) NOT NULL AUTO_INCREMENT,
	`user_id` INT(10) NOT NULL,
	`status` INT(3) DEFAULT 0,
	`created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`)
);
ALTER TABLE `order`
ADD CONSTRAINT fk_order_user_id FOREIGN KEY (user_id) REFERENCES user(id);

DROP TABLE IF EXISTS `order_item`;
CREATE TABLE `order_item` (
	`id` INT(10) NOT NULL AUTO_INCREMENT,
	`order_id` INT(10) NOT NULL,
	`album_id` INT(10) NOT NULL,
	`track_id` INT(10) NOT NULL,
	`price` INT(6) NOT NULL,
	`refundable` BOOLEAN  DEFAULT 1,
	`status` INT(3) DEFAULT 0,
	PRIMARY KEY (`id`)
);
ALTER TABLE `order_item`
ADD CONSTRAINT fk_order_item_order_id FOREIGN KEY (order_id) REFERENCES `order`(id),
ADD CONSTRAINT fk_order_item_album_id FOREIGN KEY (album_id) REFERENCES `album`(id),
ADD CONSTRA``INT fk_order_item_track_id FOREIGN KEY (track_id) REFERENCES `track`(id);
