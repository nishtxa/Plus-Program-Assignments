## Question 1: Normalization
Book ID	Title	Author	Genre	Publisher	ISBN	Price
101	To Kill a Mockingbird	Harper Lee	Fiction	HarperCollins	978-0061120084	10.99
102	The Great Gatsby	F. Scott Fitzgerald	Fiction	Scribner	978-0743273565	12.50
103	Principles of Physics	Jearl Walker	Science	Wiley	978-0321976444	50.00

1.  For table to be in 1NF column it should contain atomic values and contain unique rows        only, Therefore the table is already in 1NF as it meets all the criteria: atomic values,    and unique rows.
2.  For table to be in 2NF Column it should be in 1NF and Partial Dependencies should be removed i.e. all non key attributes should be fully functionally dependent on primary key.  In this table we have already achieved 1NF and all non key attributes depends on BOOK ID only. So its already in 2NF.
3.  For table to be in 3NF it should be in 2NF and all transtive dependencies should be removed i.e. Non key attributes should not be dependent on other non key attributes. In this table we have already achieved 2NF and for transitive dependency we can consider the relation between Publisher and ISBN. Therefore we can seperate that out and resulting table will be: 

Book ID	Title	Author	Genre	Publisher	Price
101	To Kill a Mockingbird	Harper Lee	Fiction	HarperCollins	10.99
102	The Great Gatsby	F. Scott Fitzgerald	Fiction	Scribner	12.50
103	Principles of Physics	Jearl Walker	Science	Wiley	50.00

Publisher	ISBN
HarperCollins	978-0061120084
Scribner	978-0743273565
Wiley	978-0321976444


## Question 2: What are the primary keys and foreign keys in a relational database, and how do they establish relationships between tables?

Primary Key: A primary key is a column (or a set of columns) in a table that uniquely identifies each row in that table. No two rows can have the same primary key value, and a primary key cannot contain NULL values. The primary key ensures that each record in the table is unique.

Foreign Key: A foreign key is a column (or a set of columns) in one table that references the primary key of another table. The foreign key establishes a link between the data in two tables by pointing to the primary key in another table, thereby creating a relationship between the two tables.

There are 3 types of relationships established with the help of these keys in tables:
1. One to One Relationship:  A primary key in one table is associated with a foreign key in another table, and each primary key value relates to only one (or zero) record in the related table.
2. One to Many Relationship: A primary key in one table (the "one" side) is referenced by a foreign key in another table (the "many" side). For example, a single customer (one) can have multiple orders (many), but each order is made by only one customer.
3. Many to Many Relationship: This relationship is implemented using a junction table where two foreign keys create a link between two other tables. Each foreign key in the junction table points to the primary key in one of the other two tables, allowing for a many-to-many relationship. For example, a many-to-many relationship between Books and Authors tables would be represented by a BookAuthors junction table, where each book can have multiple authors and each author can write multiple books.



## Question 3: Explain the ACID properties in the context of database transactions.
ACID stands for Atomicity, Consistency, Isolation, and Durability.
1. Atomicity: Atomicity ensures that each transaction is treated as a single unit. It guarantees that if any part of the transaction fails, the entire transaction fails and the database state is left unchanged. Essentially, a transaction's changes to the database are atomic: either all occur, or none occur.
2. Consistency ensures that a transaction can only bring the database from one valid state to another, maintaining the integrity of the database. Before and after a transaction, all rules must be valid.
3. Isolation ensures that concurrent transactions occur separately from one another. The effects of an incomplete transaction are not visible to other transactions until that transaction is committed.
4. Durability guarantees that once a transaction has been committed, it will remain so, even in the event of power loss, crashes, or errors. This means that the changes made by the transaction are permanently recorded in the database's storage. 

## Question 4: Describe the concept of indexing in a database. How does indexing improve query performance?
Indexing in a database is a technique used to speed up the retrieval of records from a database table.It works similarly to an index in a book: instead of reading the entire book to find a particular topic, you can refer to the index, which lists topics alphabetically along with the pages they appear on. In the context of a database, an index allows the database management system (DBMS) to find and access rows in a table more quickly.

Indexing improves query performance by:
1. Faster Data Retrieval: The primary advantage of indexing is the faster retrieval of data. Indexes provide a quick way to access the data rows in a table directly without scanning the entire table.
2. Efficient Sorting and Filtering: Indexes improve the speed of data sorting and filtering by providing ordered access to rows in the database.
3. Optimized Join Operations: Indexes on columns that are used in join conditions can significantly improve the performance of join operations by quickly locating the joining keys.
4. Improved Aggregate Performance: Queries that involve aggregation functions (like SUM, COUNT, etc.) can benefit from indexes on the grouped or aggregated columns.


## Question 5: Explain the concept of concurrency control, deadlocks in a multi-user database environment.
### Concurrency control
Concurrency control is a database management technique used to ensure that transactions are executed in a safe manner and that the integrity of the database is maintained when multiple transactions are occurring at the same time. The goal of concurrency control is to allow multiple transactions to access the database concurrently without interfering with each other, thereby increasing the throughput and performance of the database system.
Common concurrency control methods include:

1. Locking: Locking mechanisms prevent multiple transactions from accessing the same data concurrently. Locking prevents conflicts but can lead to deadlocks.
2. Timestamp Ordering: Transactions are ordered based on their timestamps. This method ensures that older transactions are completed before newer ones, preventing conflicts.
3. Optimistic Concurrency Control: Assumes that conflicts are rare and checks for conflicts at transaction commit time. If a conflict is detected, the transaction is rolled back.
4. Multiversion Concurrency Control (MVCC): Keeps multiple versions of data items to allow readers to access the version that was current at the start of their transaction, thus avoiding write-read conflicts.

### Deadlocks
A deadlock occurs in a database system when two or more transactions are waiting indefinitely for one another to release locks. Each transaction in the deadlock situation holds a lock on a resource and waits for a lock on a resource held by another transaction. This creates a cycle of dependencies that prevents any of the involved transactions from proceeding.
Deadlocks can severely impact the performance of a database system by halting the progress of transactions and holding up system resources.

## Question 6: Read about Database sharding and explain couple of real time examples where, why, how it this concept is used.
Database sharding is a technique used to scale databases horizontally by breaking down a large database into smaller, more manageable pieces called shards. Each shard is a distinct database, and collectively, these shards make up the entire dataset.Sharding is particularly useful for handling very large datasets and high transaction volumes that a single database server might struggle to manage efficiently.

### Why Use Database Sharding?
1. Performance Improvement: By distributing the data across multiple servers, sharding can significantly reduce the load on any single server, improving the performance of read and write operations.
2. Scalability: Sharding allows a database to scale out horizontally. As the dataset grows, new shards can be added across additional servers to accommodate the growth, without the need for a more powerful (and expensive) single server.
3. High Availability: Distributing data across multiple shards can also increase the availability of the data. If one shard goes down, only a fraction of the database's data is affected, and the rest remains accessible.

### How is Database Sharding Implemented?
Sharding can be implemented based on different sharding strategies, such as:

1. Key-Based (or Hash-Based) Sharding: Data is partitioned based on a hash of a specific key. This ensures a uniform distribution of data across shards but can make certain operations, like range queries, more complex.
2. Range-Based Sharding: Data is partitioned based on ranges of a given key. This is useful for queries that retrieve data in a specific range but can lead to uneven data distribution if the ranges are not carefully chosen.
3. Geography-Based Sharding: Data is partitioned based on geographical criteria. This is particularly useful for services that are geographically distributed and where data locality can improve performance and user experience.


### Real-Time Examples of Database Sharding
1.  E-Commerce Platforms
Why: Large e-commerce platforms deal with millions of transactions and customer records. Handling such a vast amount of data and traffic on a single database can lead to performance bottlenecks and scalability issues.
How: E-commerce platforms often shard their databases based on customer geography or product categories. For instance, customers from different regions might be directed to different shards, or different product categories might be stored in different shards. This approach not only improves performance by distributing the load but also localizes data closer to the user, reducing latency.

2.  Social Media Networks
Why: Social media networks have billions of users generating a massive amount of data every day, including posts, messages, and user interactions. A single database would not be able to efficiently store and manage this data.
How: Social media companies use sharding to distribute user data across multiple databases. They might shard data based on user ID ranges or the geographical location of users. This allows the platform to maintain high performance and availability, even as the user base grows. For example, a social media platform might create separate shards for different regions (North America, Europe, Asia, etc.) or shard data based on user IDs, ensuring that data is evenly distributed and easily scalable.









