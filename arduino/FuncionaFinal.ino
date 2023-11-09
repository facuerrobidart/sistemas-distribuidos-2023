#include <SPI.h>
#include <MFRC522.h>
#include <ArduinoJson.h>

#define RST_PIN         D3           // Configurable, see typical pin layout above
#define SS_PIN          D8          // Configurable, see typical pin layout above

MFRC522 mfrc522(SS_PIN, RST_PIN);   // Create MFRC522 instance.
const int JSON_BUFFER_SIZE = 200;
String jsonString;
boolean jsonCreado = false;

void setup() {
  Serial.begin(9600);
}

void loop() {
  
  //Si llega un Json y no tengo otro por guardar, lo guardo
  if (Serial.available() > 0 && jsonCreado == false) {
    // Lee el JSON entrante y almacénalo en un buffer
    char jsonBuffer[JSON_BUFFER_SIZE];
    int bytesRead = Serial.readBytesUntil('\n', jsonBuffer, JSON_BUFFER_SIZE);
    jsonBuffer[bytesRead] = '\0';

    // Parsea el JSON
    StaticJsonDocument<JSON_BUFFER_SIZE> doc;
    DeserializationError error = deserializeJson(doc, jsonBuffer);

    // Verifica si el JSON se parseó correctamente
    if (error) {
      Serial.print("Error al parsear JSON: ");
      Serial.println(error.c_str());
    } else {
      // Imprime el JSON parseado
      //serializeJson(doc, Serial);
      //Serial.println(); // Agrega un salto de línea al final
      jsonCreado = true;
      serializeJson(doc, jsonString);
      SPI.begin();
      mfrc522.PCD_Init();
      delay(4);
      //mfrc522.PCD_DumpVersionToSerial();
    }
  }

  
  if ( mfrc522.PICC_IsNewCardPresent() && mfrc522.PICC_ReadCardSerial() && jsonCreado == true) {
    jsonCreado = false;
    // Escribe el JSON en la tarjeta RFID
    //Serial.println("Entre");
    MFRC522::MIFARE_Key key;
    for (byte i = 0; i < 6; i++) {
      key.keyByte[i] = 0xFF;
    }

    byte sector         = 8; //Primer sector donde escribo
    byte blockAddr      = 32; //Bloque donde inicio a guardar la info.
    byte trailerBlock   = 35;

    MFRC522::StatusCode status;
    status = (MFRC522::StatusCode) mfrc522.PCD_Authenticate(MFRC522::PICC_CMD_MF_AUTH_KEY_A, trailerBlock, &key, &(mfrc522.uid));
    if (status != MFRC522::STATUS_OK) {
        Serial.print(F("PCD_Authenticate() failed: "));
        Serial.println(mfrc522.GetStatusCodeName(status));
        return;
    }
   // Serial.println(F("Autenticado"));

    // Muestro el sector antes de modificar
    //Serial.println(F("Informacion en el sector:"));
    //mfrc522.PICC_DumpMifareClassicSectorToSerial(&(mfrc522.uid), &key, sector);
    //Serial.println();

    byte buffer[16];
    int x = 0; //Llevo la posicion del string
    //El string del json tiene una longitud de 96 caracteres
    //Por lo tanto se tienen que escribir 6 sectores completos
    String stringParcial = "";
    //Serial.print("Longitud de la cadena a guardar: ");Serial.println(jsonString.length());

    for (blockAddr = 32; blockAddr<35; blockAddr++){ //Se guarda primer sector     
      stringParcial = "";
      for (int i = 0; i < 16; i++) {
        buffer[i] = jsonString.charAt(x);
        stringParcial += jsonString.charAt(x);
        x++;
      }
      
      /*Serial.print(F("Se escribira en el bloque: ")); Serial.print(blockAddr);
      Serial.println(F(" ..."));
      Serial.println("Se intenta guardar: ");
      Serial.println(stringParcial);
      Serial.println("Se guardara: ");
      dump_byte_array(buffer, 16); Serial.println();*/
      status = (MFRC522::StatusCode) mfrc522.MIFARE_Write(blockAddr, buffer, 16);
      
      //Controlo la escritura
      if (status != MFRC522::STATUS_OK) {
          Serial.print(F("MIFARE_Write() failed: "));
          Serial.println(mfrc522.GetStatusCodeName(status));
      }
    }

    //Autentico el segundo sector para continuar escribiendo
    sector = 9; //Segundo sector a escribir
    trailerBlock = 39;

    status = (MFRC522::StatusCode) mfrc522.PCD_Authenticate(MFRC522::PICC_CMD_MF_AUTH_KEY_A, trailerBlock, &key, &(mfrc522.uid));
    if (status != MFRC522::STATUS_OK) {
      Serial.print(F("PCD_Authenticate() failed: "));
      Serial.println(mfrc522.GetStatusCodeName(status));
      return;
    }
    //Serial.println(F("Nuevo sector Autenticado"));
    
    for (blockAddr = 36; blockAddr<39; blockAddr++){ //Se guarda segundo sector
      stringParcial = "";
      for (int i = 0; i < 16; i++) {
        buffer[i] = jsonString.charAt(x);
        stringParcial += jsonString.charAt(x);
        x++;
      }
      
      /*Serial.print(F("Se escribira en el bloque: ")); Serial.print(blockAddr);
      Serial.println(F(" ..."));
      Serial.println("Se intenta guardar: ");
      Serial.println(stringParcial);
      Serial.println("Se guardara: ");
      dump_byte_array(buffer, 16); Serial.println();*/
      status = (MFRC522::StatusCode) mfrc522.MIFARE_Write(blockAddr, buffer, 16);
      
      //Controlo la escritura
      if (status != MFRC522::STATUS_OK) {
          Serial.print(F("MIFARE_Write() failed: "));
          Serial.println(mfrc522.GetStatusCodeName(status));
      }
    }
    Serial.println(F("Escritura exitosa"));  
  }
  mfrc522.PICC_HaltA();
  delay(2000);
}

void dump_byte_array(byte *buffer, byte bufferSize) {
    for (byte i = 0; i < bufferSize; i++) {
        Serial.print(buffer[i] < 0x10 ? " 0" : " ");
        Serial.print(buffer[i], HEX);
    }
    Serial.println();
}