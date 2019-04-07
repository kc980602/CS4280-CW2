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
	id, username, email, password, point, status, created
-Cart
	id, album.id, user.id
-Order
	id, user.id, status, created
-OrderItem
	id, order.id,  album.id, track,id, price, refundable, status, 
-Album
	id, title, artist, label, release_date, price, quantity, status, created
-Track
	id, album.id, title, artist, length, file, file_preview, status, created