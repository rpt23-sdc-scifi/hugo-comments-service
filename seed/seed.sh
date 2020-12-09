
echo 'RUN generate-csv.js';

# Add X amount of comments to CSV
node /Users/hugo/hack-reactor/sdc/hugo-comments-service/seed/generate-csv.js


echo 'generate-csv.js script FINISHED';

# After time interval, load comments into shell script
# mysql -u root < seed/seed-comments.sql

# // add timeouts in this file
# // look at bash syntax for do loops