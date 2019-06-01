# Teaching-HEIGVD-RES-2018-Labo-HTTPInfra

## Objectives

The first objective of this lab is to get familiar with software tools that will allow us to build a **complete web infrastructure**. By that, we mean that we will build an environment that will allow us to serve **static and dynamic content** to web browsers. To do that, we will see that the **apache httpd server** can act both as a **HTTP server** and as a **reverse proxy**. We will also see that **express.js** is a JavaScript framework that makes it very easy to write dynamic web apps.

The second objective is to implement a simple, yet complete, **dynamic web application**. We will create **HTML**, **CSS** and **JavaScript** assets that will be served to the browsers and presented to the users. The JavaScript code executed in the browser will issue asynchronous HTTP requests to our web infrastructure (**AJAX requests**) and fetch content generated dynamically.

The third objective is to practice our usage of **Docker**. All the components of the web infrastructure will be packaged in custom Docker images (we will create at least 3 different images).

## General instructions

* This is a **BIG** lab and you will need a lot of time to complete it. This is the last lab of the semester (but it will keep us busy for a few weeks!).
* We have prepared webcasts for a big portion of the lab (**what can get you the "base" grade of 4.5**).
* To get **additional points**, you will need to do research in the documentation by yourself (we are here to help, but we will not give you step-by-step instructions!). To get the extra points, you will also need to be creative (do not expect complete guidelines).
* The lab can be done in **groups of 2 students**. You will learn very important skills and tools, which you will need to next year's courses. You cannot afford to skip this content if you want to survive next year.
* Read carefully all the **acceptance criteria**.
* We will request demos as needed. When you do your **demo**, be prepared to that you can go through the procedure quickly (there are a lot of solutions to evaluate!)
* **You have to write a report. Please do that directly in the repo, in one or more markdown files. Start in the README.md file at the root of your directory.**
* The report must contain the procedure that you have followed to prove that your configuration is correct (what you would do if you were doing a demo)


## Step 1: Static HTTP server with apache httpd

To prove that the configuration is correct:
1) got to the right branch: git checkout -b fb-apache-static
2) build a image(from the root of this repo): docker build -t res/apache_php docker-images/apache-php-image/
3) run a container with port mapping to test out of Docker: docker run -d -p 8080:80 res/apache_php
4) check the response sent by the server with telnet or a browser with the Docker address (192.168.99.100:8080)

  
## Step 2: Dynamic HTTP server with express.js

To prove that the configuration is correct:
1) got to the right branch: git checkout -b fb-express-dynamic
2) build a image(from the root of this repo): docker build -t res/express_zoo docker-images/express_image
3) run a container with port mapping to test out of Docker: docker run -d -p 8080:3000 res/express_zoo
4) check many times(to see different results) the response sent by the server with telnet or a browser with the Docker address (192.168.99.100:8080)


## Step 3: Reverse proxy with apache (static configuration)

To prove that the configuration is correct:
1) got to the right branch: git checkout -b fb-reverse-proxy
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

To prove that the configuration is correct:
1) got to the right branch: git checkout -b fb-ajax-jquery
2) build a image(from the root of this repo): docker build -t res/reverse_proxy docker-images/apache-reverse-proxy-image
3) build a dynamic server's image: docker build -t res/express_zoo docker-images/express_image
4) build a static server's image: docker build -t res/apache_php docker-images/apache-php-image
5) run a container with a static server: docker run -d res/apache_php
6) run a container with a dynamic server: docker run -d res/express_zoo
7) run a container with a reverse proxy server: docker run -d -p 8080:80 res/reverse_proxy
8) if not done, add "192.168.99.100 Labo.res.ch" to your Hosts file (windows C:\WINDOWS\system32\drivers\etc\hosts, linux /etc/hosts)
9) check the response sent by the static server with a browser with the server name (labo.res.ch:8080)
(the nav bar links should change every 2 seconds in large screen)
10) check many times(to see different results) the response sent by the server with a browser with the server name (labo.res.ch:8080/api/zoo)


## Step 5: Dynamic reverse proxy configuration

To prove that the configuration is correct:
1) got to the right branch: git checkout -b fb-dyn-conf
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
8) if not done, add "192.168.99.100 Labo.res.ch" to your Hosts file (windows C:\WINDOWS\system32\drivers\etc\hosts, linux /etc/hosts)
9) check the response sent by the static server with a browser with the server name (labo.res.ch:8080)
(the navbar link's should change every 2 seconds in large screen) (same as step 4)
10) check many times(to see different results) the response sent by the server with a browser with the server name (labo.res.ch:8080/api/zoo) (same as step 3)


## Additional steps to get extra points on top of the "base" grade

### Load balancing: multiple server nodes (0.5pt)

* You extend the reverse proxy configuration to support **load balancing**. 
* You show that you can have **multiple static server nodes** and **multiple dynamic server nodes**. 
* You prove that the **load balancer** can distribute HTTP requests between these nodes.
* You have **documented** your configuration and your validation procedure in your report.

### Load balancing: round-robin vs sticky sessions (0.5 pt)

* You do a setup to demonstrate the notion of sticky session.
* You prove that your load balancer can distribute HTTP requests in a round-robin fashion to the dynamic server nodes (because there is no state).
* You prove that your load balancer can handle sticky sessions when forwarding HTTP requests to the static server nodes.
* You have documented your configuration and your validation procedure in your report.

### Dynamic cluster management (0.5 pt)

* You develop a solution, where the server nodes (static and dynamic) can appear or disappear at any time.
* You show that the load balancer is dynamically updated to reflect the state of the cluster.
* You describe your approach (are you implementing a discovery protocol based on UDP multicast? are you using a tool such as serf?)
* You have documented your configuration and your validation procedure in your report.

### Management UI (0.5 pt)

* You develop a web app (e.g. with express.js) that administrators can use to monitor and update your web infrastructure.
* You find a way to control your Docker environment (list containers, start/stop containers, etc.) from the web app. For instance, you use the Dockerode npm module (or another Docker client library, in any of the supported languages).
* You have documented your configuration and your validation procedure in your report.
