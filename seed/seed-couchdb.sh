echo "start script: seeding records into couchDB"

# Command to create database
# curl -X PUT "http://admin:password@127.0.0.1:5984/demo"

# Command to add JSON data to database
# curl -H 'Content-Type: application/json' \
#             -X POST http://admin:password@127.0.0.1:5984/demo \
#             -d '{"company": "Example, Inc."}'

# curl -X POST http://admin:password@127.0.0.1:5984/demo \
#             -d '{"company": "Example, Inc."}'

# curl -H 'Content-Type: application/json' \
#   -X POST http://admin:password@127.0.0.1:5984/demo \
#   cat /Users/hugo/hack-reactor/sdc/hugo-comments-service/seed/demo.csv | couchimport --delimiter ","

# export COUCH_URL="http://admin:password@127.0.0.1:5984/"
# export COUCH_DATABASE="demo2"
# export COUCH_DELIMITER=","
# curl -H 'Content-Type: application/json' \
#   -X PUT http://admin:password@127.0.0.1:5984/demo2 \
#   -d cat /Users/hugo/hack-reactor/sdc/hugo-comments-service/seed/demo.csv | couchimport


export COUCH_URL="http://admin:password@127.0.0.1:5984/"
export COUCH_DATABASE="comments"
export COUCH_DELIMITER=","

# write data in multiple parallel HTTP requests -- speed up large data imports
export COUCH_PARALLELISM=100

# using "ccurl" as a utility wrapper around curl
ccurl -X PUT /comments
cat /Users/hugo/hack-reactor/sdc/hugo-comments-service/seed/data.csv | couchimport

echo "end script: seeding records into couchDB"