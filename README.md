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

### Django

Create a superuser:
```
python manage.py createsuperuser
```

Run migrations:
```
python manage.py migrate
```

Start the app:
```
python manage.py runserver
```

Set up OAuth:
1. Visit the admin site (`http://localhost:8000/console/`) and login as the super user created
2. Update the site section (`http://localhost:8000/console/sites/site/1/change/`) with the domain name `http://localhost:8000`
3. Create a new social app (`http://localhost:8000/console/socialaccount/socialapp/`) and add Google as a provider, fill in the relevant credentials

### Frontend
Run `npm run webpack` to kick off javascript build (this automatically kicks off watchman as well).
