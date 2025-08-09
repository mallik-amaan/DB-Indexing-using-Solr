
# DB Indexing using Solr

This project integrates Solr with postgres database and helps in Solr Indexing. It works by auto migrating the tables from postgres and then Indexing it in Solr.




## Demo

Insert gif or link to demo


## Installation

Install this project by cloning this repo using the following command

```bash
  git clone https://github.com/mallik-amaan/DB-Indexing-using-Solr.git
```
    
The main workind directory is `backend` so run the following command to go to `backend` dir:
```bash
cd project/backend
```

Run the server by using the following command:
```bash 
python3 run main.py
```

This will run the Flask app.

`Note: You need Solr to be running on Port 8983 for this project to work.`

Install Solr from their official website and create a new core by running Solr Cloud:

Go to `bin` directory of Solr:
```bash
cd solr-9.8.1/bin 
```

Run Solr by running following command:

```bash
./solr start -c
```

Now visit the following URL in your browser:
```bash
http://localhost:8983/solr/#/~cloud
```

This will open Solr Cloud Web Interface in your browser.

Now move the folder `Products` in this repo to the following location:
```bash
solr-9.8.1/server/solr/
```

Now move the `postgresql-42.7.5.jar` file to the following location:

```bash

solr-9.8.1/server/lib/

```

Now setup and create a sql database named `Products` having the following Schema

```
CREATE TABLE products (
    id SERIAL PRIMARY KEY,         -- unique product ID
    name TEXT NOT NULL,             -- product name
    category TEXT NOT NULL,         -- product category
    price NUMERIC(10, 2) NOT NULL,  -- price with 2 decimal places
    description TEXT                -- product description
);

```

Now, Insert these values in the database

```
INSERT INTO products (name, category, price, description)
VALUES
('Laptop', 'Electronics', 999.99, 'High performance laptop'),
('Chair', 'Furniture', 79.99, 'Comfortable office chair'),
('Wallet', 'Utility', 150.00, 'Wallet is a daily necessity');

```

Now run this command in the server folder in `solr` and add your database username and password in the `dataconfig` tag:

```bash
nano products/conf/db-data-config.xml
```


Now Restart your database and Solr and run the Flask app to run the porject.


## License

[MIT](https://choosealicense.com/licenses/mit/)


## Tech Stack

**Client:** Flask, Python

**Server:** Flask, Python

