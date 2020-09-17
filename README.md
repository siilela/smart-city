# SAP Leonardo Smart Driving Showcase

## Prerequirements
1.	Server and ipads need to be part of the same network


## Installation

1. 	Install [Node](https://nodejs.org) 8.4.0 (or newer)
	Make sure Node has been installed correctly and is running the correct version.
	Open terminal (Os X) or cmd (Windows), type `node -v` and press enter
	The console should state the version of node. Make sure it is 8.4.0 or higher.
	
2.	Download the zip file provided with the download link and unzip it on your server

3.	On your server, open the terminal (Os X) or cmd (Windows) and navigate to the unzipped folder.
	In order to do so, type the command `cd + /path to extracted zip.file content`, e.g..->  
	`cd /users/stefanie/Downloads/SmartCity-Showcase-2017_10_11-v01-2`
	and press enter

4.	Insert next command: `npm i` press enter.

5. 	Insert next command:`npm start` + press enter

6. 	Figure out the IP address of your device 
	(e.g. Mac > System Preferences > Network > Advanced > TCP/IP > IPv4 Address: xxxxxx)
	(e.g Windows: open cmd and type `ipconfig` and look for Ipv4-Address)

7.	There are two different ways to display the map. On a TV or a table. Chose accordingly. 

	7.1. TV version: open URL in Goggle Chrome `http://[IP of device]:8080/map/index-tv.html?token=vinoyiyuqu` (IMPORTANT: Use CHROME!)

	7.2. table version: open URL in Goggle Chrome `http://[IP of device]:8080/map/index-tv.html?token=vinoyiyuqu` (IMPORTANT: Use CHROME!)

8.	Open URL on iPad `http://[IP of device]:8080/controller/?clientid=1&token=vinoyiyuqu` 

	Important: Each iPad needs an individual cliendid e.g.: `/?clientid=2&token=vinoyiyuqu` or `/?clientid=3&token=vinoyiyuqu` there are 6 client ids available (between 1 and 6) 

	On your laptop you should see a map 
	On you iPad you will see the user interface

9.	Admin interface: `http://[IP of device]:8080/admin/?token=vinoyiyuqu`

10.	Once all ipads are connected, the map and the server are running, you should be able to see further information in your console about the connection states.