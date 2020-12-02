echo "start script: seeding records into couchDB"

export COUCH_URL="http://admin:password@127.0.0.1:5984/"
export COUCH_DATABASE="comments"
export COUCH_DELIMITER=","

# write data in multiple parallel HTTP requests -- speed up large data imports: 4-5 seems fastest?
export COUCH_PARALLELISM=5

# increase records per bulk write
# export COUCH_BUFFER_SIZE=10000

# using "ccurl" as a utility wrapper around curl
ccurl -X PUT /comments
cat /Users/hugo/hack-reactor/sdc/hugo-comments-service/seed/data.csv | couchimport

echo "end script: seeding records into couchDB"