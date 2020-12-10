# run this seed script to generate 100 million comments and load them into the database

# Add comments to CSV files

echo 'Generating CSV data files...';

node /Users/hugo/hack-reactor/sdc/hugo-comments-service/seed/generate-csv.js

echo 'Creating database and table schemas...'

mysql -u root < /Users/hugo/hack-reactor/sdc/hugo-comments-service/seed/schema.sql

echo 'Loading CSV data into tables...'

mysql -u root < /Users/hugo/hack-reactor/sdc/hugo-comments-service/seed/load-data.sql

echo 'Creating indexes and foreign keys...'

mysql -u root < /Users/hugo/hack-reactor/sdc/hugo-comments-service/seed/indexes.sql