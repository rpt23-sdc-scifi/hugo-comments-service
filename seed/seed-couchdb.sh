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

# using "ccurl" as a utility wrapper around curl
export COUCH_URL="http://admin:password@127.0.0.1:5984/"
export COUCH_DATABASE="wtf"
export COUCH_DELIMITER=","
ccurl -X POST /wtf
cat /Users/hugo/hack-reactor/sdc/hugo-comments-service/seed/demo.csv | couchimport

echo "end script: seeding records into couchDB"