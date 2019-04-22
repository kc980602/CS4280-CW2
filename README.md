# CS4280-CW2

Music Store Web Site 
App name - Mue


#Submission 1 - Work Done 
Cheung Pui Lam
- Database design
- All route design
- All UI
- Login connect business method
- Setup project
- Setup database

MAK Kai Chung
- Login business logic (draft)
- Register business logic (draft)
- Album business logic (draft)
- User business login (draft)

CHEUNG Pak Lun
- NONE

#Submission 2 - Work Done
Cheung Pui Lam
- All UI
- Complete Cart and Checkout

MAK Kai Chung
- Complete Album
- Complete User

CHEUNG Pak Lun (Freerider not doing even anything)
- Complete Admin page

#Task Responsibility
MAK Kai Chung
    - Album management
    - Browse Profile collection
    - Browse Profile 
    - Login Authentication
    - Refund
    - Music Preview & Spliting
    - Profile

Cheung Pui Lam
    - Checkout
    - Cart
    - Checkout
    - Create order
	- Brose Album
	- Admin Product List
    - UI UX

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
-Index page - Cheung Pui Lam
- /

-Sign in / Sign out
- /login - Cheung Pui Lam
- /register - MAK Kai Chung

-My purchase - MAK Kai Chung
- /profile/collection
- /profile/purchase

-Shopping cart - Cheung Pui Lam
- /cart

-Checkout - Cheung Pui Lam
- /checkout

-Admin page
- /admin -> statistics of sales - Cheung Pui Lam
- /admin/product - Cheung Pui Lam
- /admin/product/add - MAK Kai Chung
- /admin/product/management/:album_id - MAK Kai Chung
- /admin/refund - MAK Kai Chung

-Browse albums, query from album DB
- /browse/albums - Cheung Pui Lam
- /browse/albums/:id - MAK Kai Chung

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