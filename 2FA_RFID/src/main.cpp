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
#include "main.h"


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
  Serial.println("Approximate your card to the reader...");
  Serial.println();
}

void ReadRFID()
{
    // Look for new cards
  if ( ! mfrc522.PICC_IsNewCardPresent()) 
  {
    return;
  }
  // Select one of the cards
  if ( ! mfrc522.PICC_ReadCardSerial()) 
  {
    return;
  }
  //Show UID on serial monitor
  Serial.print("UID tag :");
  String content= "";

  for (byte i = 0; i < mfrc522.uid.size; i++) 
  {
     Serial.print(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " ");
     Serial.print(mfrc522.uid.uidByte[i], HEX);
     content.concat(String(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " "));
     content.concat(String(mfrc522.uid.uidByte[i], HEX));
  }

  Serial.println("");
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
      Serial.print(data);
    }
  }
  // Delay so card is read multiple times so quickly.
  delay(2500);
} 
