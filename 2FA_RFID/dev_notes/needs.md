Written by Ajae Obaze

# 2FA_RFID  -<br> Development notes

### ESP32 Needs
- Needs signal from PC to enable reading of RFID tag.
- ESP32 reads RFID tag UID to be sent to PC via serial or server via network communication
- ESP32 reads response from Serial/PC after RFID tag scanned.
    - Blink green led if authenticated
    - Blink red if denied
- Timeout response

### PC / Server needs
- Needs to send signal to ESP32 to enable reading of RFID tag
- Stored list of accepted UID (Database, JSON file etc)
- PC and server check stored list/single UID for match and proceed accordingly depending on UID value.
- Send signal/data back to ESP32 depending if UID sent matches or not
- Timeout max

### Data flow diagram of communication process
![Diagram](https://raw.githubusercontent.com/ajpharrelo/2FA_RFID/master/2FA_RFID/dev_notes/2FA_RFID.png)