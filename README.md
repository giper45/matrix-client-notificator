# matrix-client-notificator
A simple bot client to send messages via Matrix. Redis support.


## Getting started   
```  
npm install  
cp sample.env .env
# Setup the environment file
node index.js
```     
### Environment file   
The `.env` file contains all the required environment variables needed to run the module:   
* `MATRIX_HOMESERVER`:  The Matrix Homeserver where to send messages;
* `MATRIX_ACCESS_TOKEN`: The Matrix Bot Access token used to authenticate the requests; 
* `MATRIX_ROOM_ID`: Matrix Room Id where the bot will send messages;
* `REDIS_MODE`: Redis mode;
* `REDIS_HOST`: Redis host;
* `REDIS_PORT`: Redis port;
* `REDIS_AUTH`: TBD
* `REDIS_PASSWORD`:  TBD
* `REDIS_CHANNEL_NOTIFICATION`: the Redis Channel where the module subscribes  

### Redis Support  
The module can subscribe to a redis channel, listens for new messages and sent to `matrix` room. 


To enable the redis channel notification , set the `REDIS_MODE` variable to 1 and configure the properties. 
#### Redis authentication   
TBD


## Run with Docker    
To run with docker: 
```  
docker build -t matrix-client-notificator
docker run --network host --env-file=./.env --rm --name mcn matrix-client-notificator testdocker
```  
You can also use the official image:  
```
docker run --network host --env-file=./.env --rm --name mcn daindragon2/matrix-client-notificator testdocker
```



### Redis mode with docker-compose
To run with docker, setup your environment file (`REDIS_MODE` to 1 ) and run
``` 
docker-compose up
```  



## License
This project is licensed under the [MIT] License - see the LICENSE.md file for details