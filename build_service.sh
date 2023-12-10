CURRENT_VERSION=latest

echo "Prepare enviroment for build service"
sudo npm install 

clean_dependency() {
    echo "Clean dependency"
    sudo rm -rf node_modules
}

echo "Running test cases"
npm test
if [ $? -ne 0 ]; then
    echo "Test cases failed"
    clean_dependency
    exit 1
fi

echo "Building service"

SERVICE_TAG=minhtri6179/counters:${CURRENT_VERSION}
docker build -t $SERVICE_TAG .
if [ $? -ne 0 ]; then
    echo "Build service failed"
    clean_dependency
    exit 1
fi

echo "Cleaning dependency"
clean_dependency