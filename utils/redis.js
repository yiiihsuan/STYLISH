// import Redis from 'ioredis';
// const redis = new Redis(); 
// export default redis; 


//for Docker
import Redis from "ioredis";
import "dotenv/config";
const redis = new Redis({
  host: process.env.redisHost, 
  port: process.env.redisPort 
});
export default redis;

