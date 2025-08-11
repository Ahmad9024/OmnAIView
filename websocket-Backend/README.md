# D3 WebSocket Graph Projekt

Dieses Projekt demonstriert, wie man Echtzeit-Daten über WebSockets in einem D3.js-Graphen visualisiert. Es besteht aus einem einfachen WebSocket-Server, der zufällige Daten sendet, und einer Webseite, die diese Daten empfängt und in einem Graphen darstellt.

## Voraussetzungen

Bevor Sie starten, stellen Sie sicher, dass Node.js und npm auf Ihrem System installiert sind. Dieses Projekt verwendet `ws` für den WebSocket-Server und `http-server` für das Hosting der Webseite.

## Installation

Folgen Sie diesen Schritten, um das Projekt einzurichten:

1. Klonen Sie das Repository oder entpacken Sie die Projektdateien in ein Verzeichnis Ihrer Wahl.
2. Öffnen Sie ein Terminal und navigieren Sie zum Projektverzeichnis.
3. Führen Sie `npm install` aus, um die notwendigen Abhängigkeiten zu installieren.

## Starten des WebSocket-Servers

Starten Sie den WebSocket-Server mit dem folgenden Befehl:

```bash
node server.js
```
Der Server läuft standardmäßig auf Port 8080. Wenn Sie einen anderen Port verwenden möchten, passen Sie die Portnummer in server.js entsprechend an.

## Ausliefern der Website
`npm install` installier http-server.

```
npx http-server
```
Liefert die website index.html aus. Der Output des commands zeigt den Link an, unter dem die Website erreichbar ist.
