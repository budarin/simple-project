# !/bin/sh

# получаем версию сервиса
export PACKAGE_VERSION=$(node -p -e "require('./package.json').version");
# генерируем имя пакета в реестре
export SERVICE="raketa/web_app";
# echo $PACKAGE_VERSION

echo "start publishing service ...";

docker build \
    --rm \
    -f "./scripts/publish-service/Dockerfile" \
    --build-arg VERSION=$PACKAGE_VERSION \
    -t $SERVICE:$PACKAGE_VERSION ".";

docker tag $SERVICE:$PACKAGE_VERSION localhost:4000/$SERVICE:latest;
docker push localhost:4000/$SERVICE:latest;

docker tag $SERVICE:$PACKAGE_VERSION localhost:4000/$SERVICE:$PACKAGE_VERSION;
docker push localhost:4000/$SERVICE:$PACKAGE_VERSION;
