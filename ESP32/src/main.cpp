#include <Arduino.h>


/*
GPIO PINS

RST = 15
MISO = 23
MOSI = 19
SCK = 18
SDA = 21

*/
 
#include <SPI.h>
#include <MFRC522.h>
#include <WiFi.h>
#include "data.h"


// WifI and server variables
char ssid[] = MY_SSID;
char pass[] = PASSWORD;
int status = WL_IDLE_STATUS;

WiFiServer server(80);
bool clientConnected = false;

#define SS_PIN 5
#define RST_PIN 27
MFRC522 mfrc522(SS_PIN, RST_PIN);   // Create MFRC522 instance.
 
void setup() 
{
  Serial.begin(9600);   // Initiate a serial communication
  pinMode(21, OUTPUT);

  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print("Connecting to: ");
    Serial.println(ssid);

    status = WiFi.begin(ssid, pass);
    delay(5000);
  }
  
  Serial.println("Connected to network");
  Serial.print("Local IP: ");
  Serial.println(WiFi.localIP());
  server.begin();

  SPI.begin();      // Initiate  SPI bus
  mfrc522.PCD_Init();   // Initiate MFRC522
  Serial.println("Awaiting commands...");
  Serial.println();
}

String ReadRFID()
{
  String content= "";
  int i = 0;
  // Check if card present to be scanned
  while (!mfrc522.PICC_IsNewCardPresent()) 
  {
    digitalWrite(21, HIGH);
    delay(500);
    digitalWrite(21, LOW);
    delay(500);

    // If reader has been waiting for 6-7 seconds send NULL to client.
    if(i < 6)
    {
      i++;
    }
    else
    {
      return "NULL";
    }
  }
  // Read card uid
  while (!mfrc522.PICC_ReadCardSerial()) 
  {
    return "";
  }

  for (byte i = 0; i < mfrc522.uid.size; i++) 
  {
    content.concat(String(mfrc522.uid.uidByte[i] < 0x10 ? "0" : ""));
    content.concat(String(mfrc522.uid.uidByte[i], HEX));
  }
  
  return content;
}

void loop() 
{
  WiFiClient client = server.available();

  if(client) {
    if(!clientConnected) {
      client.flush();
      clientConnected = true;
    }

    if(client.available() > 0 ) {
      String data = client.readString();
      if(data == "READ") {
        client.print(ReadRFID());
      } 
    }
  }
  // Delay so card is read multiple times so quickly.
  delay(2500);
} 
