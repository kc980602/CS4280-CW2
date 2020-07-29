# CS4280-CW2

Music Store Web Site 
App name - Mue


#Techniques used
 MVC architecture is used ✓
 static pages are used ✓
 URL query string extraction ✓
 request body query string and json extraction ✓
 file upload, e.g. document submission during account registration ✓
 database direct access (MySql must be used) ✓
 RESTful api implementation ✓
 server side template rendering with ejs ✓
 server side include with ejs ✓
 file download, e.g. train schedule, album price list or customer document review ✓
 session tracking with database session store ✓

#Test Account
username: admin
password: 123
username: admin2
password: 123
username: admin3
password: 123

#Route Design
-Index page
- /

-Sign in / Sign out
- /login
- /register

-My purchase
- /profile/collection
- /profile/purchase

-Shopping cart
- /cart

-Checkout
- /checkout

-Admin page
- /admin -> statistics of sales
- /admin/product
- /admin/product/add 
- /admin/product/management/:album_id
- /admin/refund

-Browse albums, query from album DB
- /browse/albums
- /browse/albums/:id

#Database design

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
