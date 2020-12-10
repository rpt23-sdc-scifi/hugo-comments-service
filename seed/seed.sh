# run this seed script to generate 100 million comments and load them into the database

# Add comments to CSV files

echo 'RUN generate-csv.js';

node /Users/hugo/hack-reactor/sdc/hugo-comments-service/seed/generate-csv.js

echo 'generate-csv.js script FINISHED';

echo 'Creating schema...'

mysql -u root < /Users/hugo/hack-reactor/sdc/hugo-comments-service/seed/schema.sql

echo 'Creating comments table and loading in CSV data...'

echo 'Creating content table and loading in CSV data...'

echo 'Creating songs table and loading in CSV data...'

echo 'Creating users table and loading in CSV data...'

echo 'Creating indexes and foreign keys...'