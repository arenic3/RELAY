Hello and welcome to relay!,

Following this simple guide you will be able to set up your own communication hub. 

#1 Getting RELAY on a server
Once you have the source code for the RELAY app, you want to upload it to your server. Once it is on the hosting server you want to enter the apps directory and download the dependencies (> npm install) for the app to run. We also have to install forever (> npm install forever -g). 


#2 Getting the DATABASE running
Not done yet, now we have to set up the database, the app comes with an example database. To set your own databse up we have to enter the mysql command line (sudo mysql) and source the .sql scripts in the source code. Once you have it hooked up with your own data you can start running the app (> forever start node index.js)

#Voila!
Now you have RELAY up and running, your user profiles in the database will work and students as well as teachers will be able to log on to the service and start messaging.