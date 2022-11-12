Written by Ajae Obaze

# 2FA_RFID  -<br> Development notes

### ESP32 Needs
- ESP32 reads RFID tag UID to be sent to PC via serial or server via network communication
- ESP32 reads response from Serial/PC after RFID tag scanned.
    - Blink green led if authenticated
    - Blink red if denied

### PC / Server needs
- Stored list of accepted UID (Database, JSON file etc)
- PC and server check stored list/single UID for match and proceed accordingly depending on UID value.
- Send signal/data back to ESP32 depending if UID sent matches or not