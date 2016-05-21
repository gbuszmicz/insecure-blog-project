# Insecure Blog Project

This is an insecure Web application for training and testing Web security. It has multiple vulnerabilities for you to find.

<p align="center">
  <img src ="https://raw.githubusercontent.com/gbuszmicz/insecure-blog-project/master/public/images/screenshot.png" />
</p>


## Installation
#### Clone the repo
```shell
$ git clone https://github.com/gbuszmicz/insecure-blog-project.git myApp
$ cd myApp
$ npm install  # Install Node.js components listed in ./package.json
```

#### Create a db config file
Before you start you will need to create a database config file:
```shell
configs/db.json
```

The file has all the info about the MySQL database. Right now there is only one environment, production or development.

Here is an example of db.json:
```javascript
{
  "mysql": {
    "_comment": "MySQL database running in localhost for testing",
    "host": "localhost",
    "port": "3306",
    "user": "root",
    "password": "gonzalo",
    "database": "insecure_blog"
  }
}
```

#### Starting the app
The app use [foreman](https://github.com/strongloop/node-foreman). To start it just run:
```shell
$ foreman start
```

You can also start the app without foreman:
```shell
$ node index.js
```

## User guide
#### SQL injection (SQLi)

{ 
  work in progress.. 
  You will find here all info about SQLi
}

## Questions and issues
Feel free to contact me in [twitter](https://twitter.com/gbuszmicz) or [create an issue](https://github.com/gbuszmicz/insecure-blog-project/issues/new)
