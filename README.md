
# Insecure Blog Project
This is an insecure Web application for training and testing Web security. It has multiple vulnerabilities for you to find.

<p align="center">
  <img src ="https://raw.githubusercontent.com/gbuszmicz/insecure-blog-project/master/public/images/screenshot.png" />
</p>
## Demo
Check it out the [demo](http://insecureblog.herokuapp.com/) online. Have fun playing around. And please don't break anything!

We will be uploading new vulnerabilities all weeks. We will try to cover all [OWASP Top 10 Common Vulnerabilities](https://www.owasp.org/index.php/Top_10_2013-Top_10), or at least most of them.

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

##### What is this vulnerability about

A [SQL injection](https://www.owasp.org/index.php/SQL_Injection) attack consists of insertion or "injection" of a SQL query via the input data from the client to the application. A successful SQL injection exploit can read sensitive data from the database, modify database data (Insert/Update/Delete), execute administration operations on the database (such as shutdown the DBMS), recover the content of a given file present on the DBMS file system and in some cases issue commands to the operating system. SQL injection attacks are a type of injection attack, in which SQL commands are injected into data-plane input in order to effect the execution of predefined SQL commands.

**The challenge** 
> - **a.** **Test** the app for **SQLi vulnerabilities** {[answer here](challenges/SQLi/a.Testing_vulnerability.md)},
> - **b.** Try to get the **database version** and **name**. Also get the **user** {[answer here](challenges/SQLi/b.Get_database_version.md)},
> - **c.** Try to get the **password** for the **database** connector **user** (*mysql.user*) {[answer here](challenges/SQLi/c.Password_database_user.md)},
> - **d.** Get **all the databases** in the server (database engine) {[answer here](challenges/SQLi/d.Get_all_databases.md)},
> - **e.** Get **all the tables** for the app database {[answer here](challenges/SQLi/e.Get_all_tables.md)},
> - **f.** Get **all the columns** for the table storing the app users {[answer here](challenges/SQLi/f.Get_users_columns.md)},
> - **g.** Get **username** and **password** of the app administrator {[answer here](challenges/SQLi/g.Get_app_administrator.md)},
> - **h.** Finally **login** into the app with the administrator credentials

##### How to fix it

To fix this vulnerability you have to **escape** the user input **before** pass it to the database. Most database's clients have some sort of **escape function** to accomplish this. 
You can also do it yourself, you only need to know what type of value you are getting from the view or any untrusted source. 
[Underscore.js](http://underscorejs.org/) is a good library for this.

```javascript
// This code is from controllers/ctlPost.js
// Just escape the input: db.escape(user input). This is from node-mysql
// db is the mysql connection instance. Check helpers/mysql.js file for more details
// var postId = req.params.postid; // => Old unescape var!!
var postId = db.escape(req.params.postid); // New and beautiful escaped var!!
var sql = "SELECT posts.id, title, body, date, tags, username, firstname, lastname, avatar "+
          "FROM posts INNER JOIN users ON posts.userId = users.id "+
          "WHERE posts.id = " +postId;
db.query(sql, function(err, post) { 
  ... 
}
```

##### More about MySQL Injection

- [OWASP - SQL injection](https://www.owasp.org/index.php/SQL_Injection)
- [W3School - SQL Injection](http://www.w3schools.com/sql/sql_injection.asp)
- [Acunetix- SQL Injection (SQLi)](http://www.acunetix.com/websitesecurity/sql-injection/)
- [Pentestmonkey - MySQL SQL Injection Cheat Sheet](http://pentestmonkey.net/cheat-sheet/sql-injection/mysql-sql-injection-cheat-sheet)
- [Pentestmonkey - MSSQL Injection Cheat Sheet](http://pentestmonkey.net/cheat-sheet/sql-injection/mssql-sql-injection-cheat-sheet)
- [Pentestmonkey - Postgres SQL Injection Cheat Sheet](http://pentestmonkey.net/cheat-sheet/sql-injection/postgres-sql-injection-cheat-sheet)


## Credits
This **README.md** was made with [Stackedit.io](https://stackedit.io/editor)

## Questions and issues
Feel free to contact me in [twitter](https://twitter.com/gbuszmicz) or [create an issue](https://github.com/gbuszmicz/insecure-blog-project/issues/new)