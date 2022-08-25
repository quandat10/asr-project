# Build API Gateway and kafka stream system in S2T ML

Use **VS Code**.

**Requirements:**

 - Node version : v16.6.0

 - python : 3.7

 - Docker : 20.10.17

## Run Kafka server
Intall Docker compose to run multiple container
In the root folder, we proceed to run
```
docker-compose up -d
```

## Run API Gateway
in the root folder
```
cd api-gateway
```
```
npm install
```
```
yarn start:dev
```
## Run upload Service 
we proceed to run the same as API Gateway server
```
cd asr-upload-service
```
```
yarn
```
```
yarn start:dev
```
## Run Stream service
The first step, we create new enviroment to work with python by conda (install here <a>https://www.anaconda.com/ <a/>)
```
conda create --name {env_name} {python==3.7}
```
Activate enviroment
```
conda activate {env_name} 
```
Move to asr-stream-service directory
```
cd asr-stream-service
```
Install all packages
```
python -m pip install -r  requirements.txt
```
Run server flask
```
python -m uvicorn main:app --reload
```
