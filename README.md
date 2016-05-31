
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

#### Create a production environment file
If you are planning on running this app in production mode you have to create a file storing all the information about your db:
```shell
env/production.json
```

The *production.json* file has the same structure that env/development.json file:
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

## User guide / Challenges
#### SQL injection (SQLi)

**What is this vulnerability about**

A [SQL injection](https://www.owasp.org/index.php/SQL_Injection) attack consists of insertion or "injection" of a SQL query via the input data from the client to the application. A successful SQL injection exploit can read sensitive data from the database, modify database data (Insert/Update/Delete), execute administration operations on the database (such as shutdown the DBMS), recover the content of a given file present on the DBMS file system and in some cases issue commands to the operating system. SQL injection attacks are a type of injection attack, in which SQL commands are injected into data-plane input in order to effect the execution of predefined SQL commands.

**The challenge** 
> - **a.** **Test** the app for **SQLi vulnerabilities** {[answer here](challenges/SQLi/a.Testing_vulnerability.md)},
> - **b.** Try to get the **database version** and **name**. Also get the **user** {[answer here](challenges/SQLi/a.Get_database_version.md)},
> - **c.** Try to get the **password** for the **database** connector **user** (*mysql.user*),
> - **d.** Get **all the databases** in the server (database engine),
> - **e.** Get **all the tables** for the app database,
> - **f.** Get **all the columns** for the table storing the app users,
> - **g.** Get **user** and **password** of the app administrator,
> - **h.** Finally **login** into the app with the administrator credentials

**Tip for detecting the vulnerability**
```javascript
// controllers/ctlPost.js
// Check this code for function getPostById
// What is wrong with it?
var postId = req.params.postid;
var sql = "SELECT posts.id, title, body, date, tags, username, firstname, lastname, avatar "+
          "FROM posts INNER JOIN users ON posts.userId = users.id "+
          "WHERE posts.id = " +postId;
db.query(sql, function(err, post) { 
  ... 
}
```

**How to fix it**
```javascript
// controllers/ctlPost.js
// Just escape the input: db.escape(user input). This is from node-mysql
// var postId = req.params.postid;
var postId = db.escape(req.params.postid);
var sql = "SELECT posts.id, title, body, date, tags, username, firstname, lastname, avatar "+
          "FROM posts INNER JOIN users ON posts.userId = users.id "+
          "WHERE posts.id = " +postId;
db.query(sql, function(err, post) { 
  ... 
}
```


## Credits
This **README.md** was made with [Stackedit.io](https://stackedit.io/editor)

## Questions and issues
Feel free to contact me in [twitter](https://twitter.com/gbuszmicz) or [create an issue](https://github.com/gbuszmicz/insecure-blog-project/issues/new)