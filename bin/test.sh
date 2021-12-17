echo "change directory"
cd ./docker-env/postgres

echo "set env file"
cat ./test.env > use.env

echo "modified"
cat use.env

echo "return back directory"
cd ../../

docker-compose up -d postgresdb

WAIT_FOR_PG_IS_READY="while ! pg_isready --quiet; do sleep 1; done;"

docker-compose exec postgresdb bash -c "$WAIT_FOR_PG_IS_READY"

echo "running tests"
jest -- src/__test__/*

echo "closing containers"
docker-compose down -v --remove-orphans

echo "set for prod"
cd ./docker-env/postgres
cat prod.env > use.env