# OmnAIView
## Einführung

Dieses Projekt bietet eine Datenvisualisierungsschnittstelle unter Verwendung der WebSocket-Technologie. Es ermöglicht Benutzern, sich mit einem WebSocket-Server zu verbinden, Live-Daten von verbundenen Geräten zu streamen und diese Daten mithilfe interaktiver Grafiken zu visualisieren, die auf D3.js basieren. 

## Funktionen

 **WebSocket-Datenstreaming:**
- Stellt eine WebSocket-Verbindung her, um Live-Daten von verbundenen Geräten zu streamen.
 - Implementiert nahtlose Aktualisierungen mithilfe von Signalen für die Datenverwaltung.   **Geräteverwaltung:**  - Zeigt eine dynamisch aktualisierte Liste der verbundenen Omniscope-Geräte an.   **Grafikvisualisierung:**  - Nutzt D3.js, um reaktionsschnelle Grafiken auf Basis der gestreamten Daten zu schaffen.   - Skalierungen und Achsen passen sich dynamisch an die eingehenden Daten an.   **Integration der Symbolleiste:**  
- Benutzerdefiniertes Logo: Ein einzigartiges Logo wurde erstellt und in die Symbolleiste integriert, um eine ansprechende Benutzeroberfläche zu schaffen.  
- Enthält Schaltflächen zum Verbinden/Trennen vom WebSocket-Server und zum Starten der Visualisierung.   **Integration der Symbolleiste:**  
- Benutzerdefiniertes Logo: Ein einzigartiges Logo wurde erstellt und in die Symbolleiste integriert, um eine ansprechende Benutzeroberfläche zu schaffen.  
- Enthält Schaltflächen zum Verbinden/Trennen vom Web

  **Toolbar-Integration:**
  - Mit Schaltflächen zum Verbinden/Trennen vom WebSocket-Server, zum Starten der Visualisierung und zum Aktualisieren der Daten.

## Installation

  1. Klonen Sie das Repository:
```
git clone https://github.com/ahmadXxOoo/OmnAIView.git
  ```
  2. Navigieren Sie zum Projektverzeichnis:
```
cd OmnAIView
  ```
  3. Installieren Sie die erforderlichen Abhängigkeiten:
```
npm install
  ```
  4. Starten Sie den Entwicklungsserver:
```
ng serve
  ```
  5. Öffnen Sie Ihren Browser und navigieren Sie zu 
```
http://localhost:4200
```

## Einrichten des WebSocket-Servers

  1. Navigieren Sie in das Projektverzeichnis:
```
cd OmnAIView/websocket-Backend
```
2. Installieren Sie die erforderlichen Abhängigkeiten:
```
npm install
```
3. Starten Sie den Websocket-Server:
```
node server.js
```

## Verwendung

  1. Stellen Sie über das Symbol „Verbinden“ in der Symbolleiste eine Verbindung zum WebSocket-Server her.

  2. Starten Sie die Visualisierung, um Datenaktualisierungen im Diagramm anzuzeigen, indem Sie auf das Symbol „Wiedergabe“ klicken.

  3. Verwenden Sie das Symbol „Pause“, um die Visualisierung anzuhalten. Mit dem Symbol „Wiedergabe“ können Sie sie wieder fortsetzen.

  4. Verwenden Sie das Symbol „Trennen“, um die Visualisierung zu beenden und die Verbindung zum WebSocket-Server zu trennen.

  5. Verwenden Sie das Symbol „Aktualisieren“, um die vorhandenen Daten zu löschen und die Ansicht zurückzusetzen.

