# Basic Realtime Chat Api
a backend Rest api for basic Realtime chat can used with different clients build in Express, Mongodb, Socket.io 

## Docker Installation
#### Make a config.env file
```bash
PORT=9000
DATABASE_URL=<your_mongodb_url>
JWT_SECRET=<your_secret>
```

#### Pull command
```bash
docker pull yashtheycg/ycg-realtimechat:v1.1
```

#### Response
```bash
v1.1: Pulling from yashtheycg/ycg-realtimechat
Digest: sha256:ebac3a8c9f3c81ae61db4af1a6c2439bb
Status: Image is up to date for yashtheycg/ycg-r
docker.io/yashtheycg/ycg-realtimechat:v1.1
```

## Run Image

#### Run command
```bash
docker run --env-file ./config.env -p 9000:9000 yashtheycg/ycg-realtimechat:v1.1
```

#### Response
```bash
Server Listening at 9000
Connected to mongo successfully
```

## API Reference
#### Endpoints
- [Signup](#signup)
- [Login](#login)
- [Private Message](#private-message)
- [Message History](#message-history)
- [Create Group](#create-group)
- [Group Message](#group-message)


#### Baseurl 
```http
https://ycg-realtimechat-v1-1.onrender.com
```

## Signup 
User can signup here

**Request:**
```json
POST /api/signup HTTP/1.1
Accept: application/json
Content-Type: application/json

{
    "email": "test@gmail.com",
    "password": "test123" 
}
```
**Response:**
```json
{
  "message": "User registered successfully",
  "status": "success"
}
```

## Login
User can login here & we get jwt token in response  which we can use for access other endpoints

**Request:**
```json
POST /api/login HTTP/1.1
Accept: application/json
Content-Type: application/json

{
    "email": "test@gmail.com",
    "password": "123456" 
}
```
**Response:**
```json
{
  "message": "Login Successfully",
  "authtoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiZThlMGZmNGMtYjk0MS00YmFmLWJjYTktNWYxOTg0MTA5MTA2In0sImlhdCI6MTcyMzgxMjEwMywiZXhwIjoxNzIzOTg0OTAzfQ.aS4Jvm4o3RjldbxiaFKYm_EinMT-PaQLG2wsq-vGC0",
  "status": "success"
}
```


## Private Message
User can send message privately

**Request:**
```json
POST /api/messages HTTP/1.1
Accept: application/json
Content-Type: application/json
Authorization: Bearer <jwt_token>

{
  "senderId":"446f39ca-ed5f-425a-80a3-49d2a05741de",
  "receiverId": "8bdce5a3-ae39-4d19-a587-61ca20c7aca6",
  "content": "I am good, currently testing realtimechatapp"
}
```
**Response:**
```json
{
  "data": {
    "senderId": "446f39ca-ed5f-425a-80a3-49d2a05741de",
    "receiverId": "8bdce5a3-ae39-4d19-a587-61ca20c7aca6",
    "content": "I am good, currently testing realtimechatapp",
    "_id": "66ce49f2d94e07b00674ad1f",
    "timeStamp": "2024-08-27T21:49:38.259Z",
    "__v": 0
  }
}
```

## Message History
User can see the old message with this api of a particular person

**Request:**
```json
GET /api/messages/history?page=1&pageSize=3&senderId=8bdce5a3-ae39-4d19-a587-61ca20c7aca6&receiverId=446f39ca-ed5f-425a-80a3-49d2a05741de HTTP/1.1
<or>
GET /api/messages/history?page=1&pageSize=3&groupId=66cdfbd26dc74e2fcd5a8c09 HTTP/1.1

Accept: application/json
Content-Type: application/json
Authorization: Bearer <jwt_token>
```
**Response:**
```json
{
  "data": [
    {
      "senderId": "446f39ca-ed5f-425a-80a3-49d2a05741de",
      "receiverId": "8bdce5a3-ae39-4d19-a587-61ca20c7aca6",
      "content": "Hii, whats up !",
      "timeStamp": "2024-08-27T15:59:58.906Z"
    },
    {
      "senderId": "8bdce5a3-ae39-4d19-a587-61ca20c7aca6",
      "receiverId": "446f39ca-ed5f-425a-80a3-49d2a05741de",
      "content": "Hello, Good evening ",
      "timeStamp": "2024-08-27T16:01:37.064Z"
    },
    {
      "senderId": "8bdce5a3-ae39-4d19-a587-61ca20c7aca6",
      "receiverId": "446f39ca-ed5f-425a-80a3-49d2a05741de",
      "content": "Hello, Good evening ",
      "timeStamp": "2024-08-27T20:45:01.035Z"
    },
    {
      "senderId": "446f39ca-ed5f-425a-80a3-49d2a05741de",
      "receiverId": "8bdce5a3-ae39-4d19-a587-61ca20c7aca6",
      "content": "I am good, currently testing realtimechatapp",
      "timeStamp": "2024-08-27T21:49:38.259Z"
    }
  ]
}
```
**OR**
```json
{
  "data": [
    {
      "senderId": "8bdce5a3-ae39-4d19-a587-61ca20c7aca6",
      "groupId": "66cdfbd26dc74e2fcd5a8c09",
      "content": "Hello group, whats up!",
      "timeStamp": "2024-08-27T16:25:55.677Z"
    },
    {
      "senderId": "446f39ca-ed5f-425a-80a3-49d2a05741de",
      "groupId": "66cdfbd26dc74e2fcd5a8c09",
      "content": "Hiii group, from test1 user",
      "timeStamp": "2024-08-27T16:41:47.522Z"
    }
  ]
}
```

## Create Group
User can create Group with multiple user

**Request:**
```json
POST /api/groups HTTP/1.1
Accept: application/json
Content-Type: application/json
Authorization: Bearer <jwt_token>

{
  "name":"Group testing",
  "members":[
    "8bdce5a3-ae39-4d19-a587-61ca20c7aca6",
    "446f39ca-ed5f-425a-80a3-49d2a05741de"
    ]
}
```
**Response:**
```json
{
  "data": {
    "userId": "446f39ca-ed5f-425a-80a3-49d2a05741de",
    "name": "Group testing",
    "members": [
      "8bdce5a3-ae39-4d19-a587-61ca20c7aca6",
      "446f39ca-ed5f-425a-80a3-49d2a05741de"
    ],
    "_id": "66ce4cbad94e07b00674ad27",
    "timeStamp": "2024-08-27T22:01:30.788Z",
    "__v": 0
  }
}
```

## Group Message
User can send message in the group

**Request:**
```json
POST /api/groups/:groupId/messages HTTP/1.1
Accept: application/json
Content-Type: application/json
Authorization: Bearer <jwt_token>

{
  "senderId":"446f39ca-ed5f-425a-80a3-49d2a05741de",
  "content":"I am good group, from test user"
}
```
**Response:**
```json
{
  "data": {
    "senderId": "446f39ca-ed5f-425a-80a3-49d2a05741de",
    "groupId": "66cdfbd26dc74e2fcd5a8c09",
    "content": "I am good group, from test user",
    "_id": "66ce4d73d94e07b00674ad2a",
    "timeStamp": "2024-08-27T22:04:35.367Z",
    "__v": 0
  }
}
```
