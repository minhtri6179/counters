#!/bin/bash
# Load enviroment variables from .env file
[ ! -f .env ] || export $(grep -v '^#' .env | xargs)
BUILD_DIR=build
CURRENT_VERSION=latest
SERVICE_TAG=minhtri6179/counters:${CURRENT_VERSION}

clean_dependency() {
    echo "Clean dependency"
    sudo rm -rf node_modules
    sudo rm -rf $BUILD_DIR
}

echo "Prepare building image"
mkdir $BUILD_DIR

echo "Copy source code to build directory"
sudo cp * $BUILD_DIR/
sudo cp -r db $BUILD_DIR/
sudo cp -r tests $BUILD_DIR/
sudo cp .env $BUILD_DIR/
sudo cp .Dockerignore $BUILD_DIR/

sudo npm --prefix $BUILD_DIR install

echo "Running test cases"
sudo npm --prefix $BUILD_DIR test
if [ $? -ne 0 ]; then
    echo "Test cases failed"
    clean_dependency
    exit 1
fi

echo "Make env file for building image production"
rm -rf $BUILD_DIR/.env

echo DB_HOST=$DB_HOST_P >> $BUILD_DIR/.env
echo DB_USER=$DB_USER_P >> $BUILD_DIR/.env
echo DB_PASSWORD=$DB_PASSWORD_P >> $BUILD_DIR/.env
echo DB_NAME=$DB_NAME_P >> $BUILD_DIR/.env
echo HOST=$HOST >> $BUILD_DIR/.env
echo PORT=$PORT >> $BUILD_DIR/.env

echo "Building service"
docker build -t $SERVICE_TAG $BUILD_DIR
if [ $? -ne 0 ]; then
    echo "Build service failed"
    clean_dependency
    exit 1
fi

echo "Cleaning dependency"
clean_dependency

# Push to registry and deploy to render if the first argument is 1
if [ "$1" == "1" ]; 
then
    echo "Push to registry and deploy to render"
    docker push $SERVICE_TAG
    curl $DEPLOY_HOOK
fi
