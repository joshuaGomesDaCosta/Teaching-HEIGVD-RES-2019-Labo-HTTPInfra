# Teaching-HEIGVD-RES-2018-Labo-HTTPInfra

## Objectives

The first objective of this lab is to get familiar with software tools that will allow us to build a **complete web infrastructure**. By that, we mean that we will build an environment that will allow us to serve **static and dynamic content** to web browsers. To do that, we will see that the **apache httpd server** can act both as a **HTTP server** and as a **reverse proxy**. We will also see that **express.js** is a JavaScript framework that makes it very easy to write dynamic web apps.

The second objective is to implement a simple, yet complete, **dynamic web application**. We will create **HTML**, **CSS** and **JavaScript** assets that will be served to the browsers and presented to the users. The JavaScript code executed in the browser will issue asynchronous HTTP requests to our web infrastructure (**AJAX requests**) and fetch content generated dynamically.

The third objective is to practice our usage of **Docker**. All the components of the web infrastructure will be packaged in custom Docker images (we will create at least 3 different images).

## How to try this 


## Step 1: Static HTTP server with apache httpd

### The configuration used
The path to the configuration is "docker-images/apache-php-image".
The Dockerfile for this container use the image from php:5.6-apache and copy "content/" to "/var/www/html/".
The folder "content" contains a website page using the framework "W3.css".

### How To test that the configuration is correct:
1) use the right branch: git checkout fb-apache-static
2) build a image(from the root of this repo): docker build -t res/apache_php docker-images/apache-php-image/
3) run a container with port mapping to test out of Docker: docker run -d -p 8080:80 res/apache_php
4) check the response sent by the server with telnet or a browser with your Docker address (192.168.99.100:8080 or localhost:8080)

  
## Step 2: Dynamic HTTP server with express.js

### The configuration used
The path to the configuration is "docker-images/express-image".
The Dockerfile for this container tells to use the image from node:4.4, copy "src/" to "/opt/app/" and then run "node /opt/app/index.js".
The folder "src" contains a javascript script (index.js) and a json file who describe dependencies for a node application. This appliaction need the node_modules folder (not provided on this repo).

### How To test that the configuration is correct:
1) use the right branch: git checkout fb-express-dynamic
2) build a image(from the root of this repo): docker build -t res/express_zoo docker-images/express_image
3) run a container with port mapping to test out of Docker: docker run -d -p 8080:3000 res/express_zoo
4) check many times(to see different results) the response sent by the server with telnet or a browser with your Docker address.


## Step 3: Reverse proxy with apache (static configuration)

### The configuration used
The path to the configuration is "docker-images/apache-reverse-proxy-image".
The Dockerfile for this container tells to use the image from php:5.6-apache, copy "conf/" to "/etc/apache2/" and then run "a3enmod proxy proxy_http" and "a2ensite 000-* 001-*".

The folder "conf/sites-available" contains two site configuration:
  000-default.conf who just specify a virtual host listen to port 80
  001-reverse-proxy.conf who specify a virtual host listen to port 80, a serverName (Labo.res.ch), 2 proxy pass and proxy pass reverse
  with static get request and static adress.

### How To test that the configuration is correct:
1) use the right branch: git checkout fb-reverse-proxy
2) build a image(from the root of this repo): docker build -t res/reverse_proxy docker-images/apache-reverse-proxy-image
3) build a dynamic server's image: docker build -t res/express_zoo docker-images/express_image
4) build a static server's image: docker build -t res/apache_php docker-images/apache-php-image
5) run a container with a static server: docker run -d res/apache_php
6) run a container with a dynamic server: docker run -d res/express_zoo
7) run a container with a reverse proxy server: docker run -d -p 8080:80 res/reverse_proxy
8) if not done, add "192.168.99.100 Labo.res.ch" to your Hosts file (windows C:\WINDOWS\system32\drivers\etc\hosts, linux /etc/hosts)
9) check the response sent by the static server with a browser with the server name (labo.res.ch:8080)
10) check many times(to see different results) the response sent by the server with a browser with the server name (labo.res.ch:8080/api/zoo)


## Step 4: AJAX requests with JQuery

### The configuration used
the Dockerfile for the 3 previous images are updated to run the installation of vim.
The website on the static server is updated to use a ajax query (use the dynamic server to get a zoo json data to change the text of the large nav bar every 2 second), to do that:
  a "js" folderwas added to content with the Jqeury librairie and a script named zoo.js.
  we include the script in index.html and we modify the nav bar for large screen (adding id to use them in the script).

### How To test that the configuration is correct:
1) use the right branch: git checkout fb-ajax-jquery
2) build a image(from the root of this repo): docker build -t res/reverse_proxy docker-images/apache-reverse-proxy-image
3) build a dynamic server's image: docker build -t res/express_zoo docker-images/express_image
4) build a static server's image: docker build -t res/apache_php docker-images/apache-php-image
5) run a container with a static server: docker run -d res/apache_php
6) run a container with a dynamic server: docker run -d res/express_zoo
7) run a container with a reverse proxy server: docker run -d -p 8080:80 res/reverse_proxy
8) if not done, add "192.168.99.100 (or localhost) Labo.res.ch" to your Hosts file (windows C:\WINDOWS\system32\drivers\etc\hosts, linux /etc/hosts)
9) check the response sent by the static server with a browser with the server name (labo.res.ch:8080)
(the nav bar links should change every 2 seconds in large screen)
10) check many times(to see different results) the response sent by the server with a browser with the server name (labo.res.ch:8080/api/zoo)


## Step 5: Dynamic reverse proxy configuration

### The configuration used
The path to the configuration is "docker-images/apache-reverse-proxy-image".
Now the Dockerfile tells to copy too the file apache2-foreground to "usr/local/bin/" and templates/ to "/var/apache2/templates".
the apache2-foreground file is used by the original image to set up the server we want to use our version of this file who set the use of environment variables and run php with the file in "/var/apache2/templates" to generate the "001-reverse-proxy.conf" with the environment variables.

### How To test that the configuration is correct:
1) use the right branch: git checkout fb-dyn-conf
2) build a image(from the root of this repo): docker build -t res/express_zoo docker-images/apache-reverse-proxy-image
3) build a dynamic server's image: docker build -t res/express_zoo docker-images/express_image
4) build a static server's image: docker build -t res/express_zoo docker-images/apache-php-image
5) run a few containers with a static server: docker run -d res/apache_php
5) run a container with a static server named (to distinguish it easily): docker run -d --name staticres/apache_php
6) run a few containers with a dynamic server: docker run -d res/express_zoo
5) run a container with a dynamic server named (to distinguish it easily): docker run -d --name dyn res/apache_php
6) search ip adress of the named static server : docker inspect static |grep -i ipad
7) search ip adress of the named dynamic server: docker inspect dyn |grep -i ipad
7) run a container with a reverse proxy server named or not with 2 environnements variables: docker run -d -p 8080:80 -e STATIC_APP=<ip_static>:80 -e DYNAMIC_APP=<ip_dyn>:3000 --name reverse_proxy res/reverse_proxy
8) if not done, add "192.168.99.100 (or localhost) Labo.res.ch" to your Hosts file (windows C:\WINDOWS\system32\drivers\etc\hosts, linux /etc/hosts)
9) check the response sent by the static server with a browser with the server name (labo.res.ch:8080)
(the navbar link's should change every 2 seconds in large screen) (same as step 4)
10) check many times(to see different results) the response sent by the server with a browser with the server name (labo.res.ch:8080/api/zoo) (same as step 3)


### Step 6: Management UI
Video that help us to find a gui interface:
https://www.youtube.com/watch?v=GNG6PDFxQyQ

We can use portainer with this command
docker run -it -d —name portainer -v /var/run/docker.sock:/var/run/docker.sock -p 9000:9000 portainer/portainer


### Step 7: Load balancing, multiple server nodes

### The configuration used
The path to the configuration is "docker-images/apache-reverse-proxy-image".
Now the Dockerfile tells the reverse proxy server to add the apache module "proxy_balancer". This will activate the option of load balancing. Some modifications are made in the "001-reverse-proxy.conf" to add the servers to the clusters. We create a cluster for the "static" servers and a cluster for the "dynamic" ones.

### How To test that the configuration is correct:
1) use the right branch: git checkout fb-load-balancing
2) build a image of the reverse proxy server (from the root of this repo): docker build -t res/reverse_proxy docker-images/apache-reverse-proxy-image
3) build a dynamic server's image: docker build -t res/express_zoo docker-images/express_image
4) build a static server's image: docker build -t res/apache_php docker-images/apache-php-image
5) run 3 containers with a static server: docker run -d res/apache_php
6) run 3 containers with a dynamic server: docker run -d res/express_zoo
7) run a reverse proxy server: docker run -d -p 8080:80 res/reverse_proxy

For the static and dynamic servers container you need a new command-line interface. This will help to see when the load balancing work. Normally you will see new connections and HTTP requests through all the servers. 
But for this, you will need to open multiple tabs in your Web Browser (at least 4) at the site labo.res.ch:8080/


### Step 8: Load balancing, round-robin vs sticky sessions

### The configuration used


### How To test that the configuration is correct:



### Step 9: Dynamic cluster management

### The configuration used


### How To test that the configuration is correct:

