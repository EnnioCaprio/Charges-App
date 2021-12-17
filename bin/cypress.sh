echo "set for prod"
cd ./docker-env/postgres
cat prod.env > use.env

echo "return back"
cd ../../

docker-compose up -d

WAIT_FOR_PG_IS_READY="while ! pg_isready --quiet; do sleep 1; done;"

docker-compose exec postgresdb bash -c "$WAIT_FOR_PG_IS_READY"

echo "change to client folder"
cd ./client

echo "create cypress container and start it"
docker-compose up --build

echo "closing containers"
docker-compose down

echo "closing other containers"
cd ../
docker-compose down