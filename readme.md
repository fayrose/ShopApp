#How to run the website: 

Install dependencies, from terminal run:
	`npm install`

Install Bower to add front end dependencies, from terminal run:
	`sudo npm install bower -g`

Install front end dependencies by navigating to app folder:
	`cd app` (Folder location: eCommerce/shoppapp/app)
	
Then run:
	`bower install`

To start the server from root folder (go back a folder with `cd ..` to eCommerce/shoppapp) run :
	`node api/server.js`


Initialize Admin Account:
	either click `http://localhost:8080/api/init` or click the Sign-up button on the main page.


##Note: 
This application has been deployed to AWS, which can impact the ability to run this directly from one's computer. If there is trouble initializing or running the app, please post an `issue` and it will be resolved as soon as possible.
