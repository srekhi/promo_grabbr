# PromoGrabber

## Setup

### Requirements

* Python 3.6.4
* Django 2
* PostgreSQL 9

In a virtual environment:
```
pip install -r requirements.txt
```

### Database

Log into Postgres:
```
sudo -u postgres psql
```

Create the database:
```sql
CREATE DATABASE promograbber;
```

Create the user:
```sql
CREATE USER promograbber_user WITH PASSWORD 'promograbber_user';
```

Set default configurations:
```sql
ALTER ROLE promograbber_user SET client_encoding TO 'utf8';
ALTER ROLE promograbber_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE promograbber_user SET timezone TO 'UTC';
```

Give user all access to database:
```sql
GRANT ALL PRIVILEGES ON DATABASE promograbber TO promograbber_user;
```
