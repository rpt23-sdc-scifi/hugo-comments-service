# run this seed script to generate 100 million comments one by one

echo 'RUN generate-csv.js';

# Add X amount of comments to CSV
node /Users/hugo/hack-reactor/sdc/hugo-comments-service/seed/generate-csv.js

echo 'generate-csv.js script FINISHED';

# Then load comments into shell script
mysql -u root < /Users/hugo/hack-reactor/sdc/hugo-comments-service/seed/seed-comments.sql

# // add timeouts in this file
# // look at bash syntax for do loops