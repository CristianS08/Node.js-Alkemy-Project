# Node.js-Alkemy-Project

This project is a personal project, made with Node.js, Express.js and Sequelize. 

Data Models contains 5 models: 

* User

* Film

* Character

* Genre

* Storage

Each with respective routes and controllers.

The Associations are:

* Film (n) --> Character (n)

* Film (1) --> Storage (1)

* Film (n) --> Genre (1)

* Character (n) --> Film (n)

* Character (1) --> Storage (1)

* Genre (1) --> Storage (1)


Is contemplated:

* Auth Controller: 

It is responsible for registering and authenticating users in the system.

It uses the JWT schema with a standard Authorization "bearer" header.

Each user has a list of permissions associated, there are 2 generic permissions "user" and "admin". The users that register are all "user".
Many processes need an "admin" user to be able to work, therefore you have to edit the schema in MongoDB to set the admin permission to some user.

* Film Controller: 

Contains the CRUD of the Films, where is managed the relationship with the Storage, Characters and Genre. 

* Character Controller: 

Contains the CRUD of the Characters, where is managed the relationship with the Storage and Film. 

* Genre Controller: 

Contains the CRUD of the Genres, where is managed the relationship with the Storage. 

* Storage Controller:

This controller manages the uploaded files. These files are saved locally.



* The API documentation can also be consulted from the home. That once the server is up, you can navigate to localhost:3001. (It not complete yet)
