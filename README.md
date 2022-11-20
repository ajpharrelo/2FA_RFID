# 2FA_RFID
Two-Factor authentication solution using an ESP32 and a RFID module.

## ESP32 Setup
1. Setup connection to your local WiFi that is using **WPA2** with the correct credentials.

| Variable (char[])    | Description | File 
| ----------- | ----------- | ------- |
| ssid      | Service Set Identifier of your network router.       | ESP32/src/main.cpp|
| pass | Password/keyphrase for your network router.| ESP32/src/main.cpp|

2. Flash the code from **ESP32/src/main.cpp** to your ESP32

3. Allow 2-5 seconds after flashing for your ESP32 to connect to the network.

## Web Setup
1. In ```web.js``` you need to assign values to the following constants values, before running the solution.

| Constant    | Description | File |
| ----------- | ----------- | ----- |
| ESP_SERVER_ADDR      | Server address of your ESP32 on your network.       | Client/web.js
| ESP_PORT | Port of ESP32 server running.| Client/web.js

<br> 2. Run ```web.js``` and you should be presented with a login.

![Login screen](https://i.imgur.com/7PvSztB.png)

There are two sets of accepted credentials for the login which are stored in **Client/users.json** .

|Username|Password|UID
|--------|--------|-----|
|Steve|12345|To be set
|Jacob|54321|To be set


## API 
This project consists of two basic API's one for the user login which contains functions to 
- Authenticate users from credentials stored in a JSON file. **(Client/users.json)**
- Communicate with ESP32 to tell it to start reading a RFID tag and then to send it back. **(Client/api/client.js)**

## Usage
```
const client = require('./api/client.js');

client.GetRFID(ESP_SERVER_ADDR, ESP_PORT, (uid) => {
  // Do something with uid
}
```


### **IMPORTANT**: 

You will need to the set the UID value for each set of credentials corresponding to your own RFID tags.


If you are unsure how to read the tag of your RFID card/Fob you could do either of the following.

### Print the UID to a serial monitor by using the following code in - ESP32/src/main.cpp
```
Serial.println(ReadRFID());
```

### Print the UID to a desktop console of your choosing, using javascript in - Client/web.js
```
client.GetRFID(ESP_SERVER_ADDR, ESP_PORT, (uid) => { console.log(uid) };
```
