/*
 Name:		_2FA_RFID.ino
 Created:	11/10/2022 4:43:14 PM
 Author:	Simpboy
*/

// the setup function runs once when you press reset or power the board
void setup() {
	pinMode(2, OUTPUT);
}

// the loop function runs over and over again until power down or reset
void loop() {
	digitalWrite(2, HIGH);
	delay(1000);
	digitalWrite(2, LOW);
}
