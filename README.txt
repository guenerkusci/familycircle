FamilyCircle V7 – korrigierte Testversion mit Cache-Schutz

Diese Version enthält die gewünschte Navigation:
- Oben: Feed + Einstellungen
- Unten nur: Chats · Kalender · SOS · Standort · Spiele
- Spiele ganz rechts
- Chats als Startseite
- größere Symbole
- Chat-Anruf + Videoanruf
- Story-Erstellung + Antworten/Reaktionen
- Feed-Kommentare
- erweiterte Einstellungen/Datenschutz
- SOS 8x Ja oder 8 schnelle SOS-Taps ohne Zoom

Zusätzlich wurde ein technischer Schutz gegen alte Safari/GitHub-Pages-Caches eingebaut.
Die sichtbare Kennzeichnung "V7" oben dient nur zur Kontrolle, dass wirklich die neue Version geladen wurde.


V8 – Ergänzungen auf Basis der unveränderten V7:
- SOS-Ergebnisfenster zusätzlich mit sichtbarem X oben rechts schließbar
- Chats öffnen direkt im Familien-Gruppenchat
- Kontakte oben im Gruppenchat; Einzelchats mit Zurück-Taste zum Gruppenchat
- Gruppen-Sprach-/Videoanruf mit auswählbaren Teilnehmern (Demo)
- Sprachnachrichten-Schaltfläche im Gruppen- und Einzelchat
- Gruppenmedien sowie Medien/Links/Dateien in Einzelchats


V10 – nur die ausdrücklich gewünschten Änderungen:
- Mitgliederauswahl: Namen/Avatare links, Checkbox eindeutig rechts
- SOS-Knopf noch etwas weiter nach unten
- Chat: lange Texte umbrechen, Nachrichtenbreite begrenzen
- Schreibfeld ist mehrzeilig; ab ca. 26 Zeichen wird die nächste Zeile genutzt
- Bei geöffneter iPhone-Tastatur bleibt die untere Navigation unterhalb der Tastatur sichtbar und wird kompakter
- Nach Schließen der Tastatur kehrt die Navigation zur normalen Größe zurück
- Tippen in den Chatbereich schließt die Tastatur
- Neuer Status-Button oben neben Feed mit Statusübersicht der Mitglieder
- Alles andere basiert unverändert auf V9


V12 – nur die ausdrücklich gewünschten Ergänzungen gegenüber V10:
- Mehrzeiliges Chat-Schreibfeld springt nach Senden sofort in die ursprüngliche Höhe zurück
- Bei geöffneter Tastatur werden obere Leiste (Status/Feed/Einstellungen) und untere Navigation vollständig ausgeblendet
- Tippen in den Chatbereich schließt die Tastatur; danach erscheinen beide Leisten wieder
- Im Einzelchat öffnet ein Tipp auf Name/Avatar eine Kontaktinfo-Seite mit Profil, Audio/Video, Medien, Datenschutz- und Chatoptionen (Demo)
- Im Familien-Gruppenchat öffnet ein Tipp auf den Absender einer Nachricht direkt den Einzelchat dieser Person
- Zurück im Einzelchat führt wieder zum Familien-Gruppenchat
- Alle übrigen V10-Funktionen und das bestehende Design bleiben unverändert


V13 – gewünschte Ergänzungen gegenüber V12:
- Untere Hauptnavigation kompakter/schmaler; Chats, Kalender, SOS, Standort und Spiele bleiben vollständig innerhalb der Leiste
- SOS bleibt hervorgehoben, ragt aber nicht mehr aus der Leiste
- Chat-Schreibbereich breiter; Senden-Button bekommt festen eigenen Platz und wird nicht von der Navigation verdeckt
- Oben steht der aktive Circle über der Seitenüberschrift und ist antippbar
- Circle-Switcher mit FamilyCircle, FriendsCircle, GirlsCircle, WorkCircle und SportCircle
- Beim Circle-Wechsel ändern sich Demo-Mitglieder, Chatdaten und Farbstimmung; die Grundfunktionen bleiben gleich
- Demo-Schaltfläche „Neuen Circle erstellen“ ist vorbereitet
- Alle übrigen Funktionen der bisherigen Version bleiben erhalten


V14 – Änderungen gegenüber V13:
- Aktiver Circle-Name oben deutlich größer und prominenter als der aktuelle Bereich (Chats, Kalender usw.)
- Badge am Circle-Namen zeigt die Summe ungelesener Nachrichten aus anderen Circles
- Circle-Switcher zeigt pro Circle die Zahl ungelesener Nachrichten
- Zusätzlich zeigt jeder Circle die letzte Aktivität bzw. letzte Nachricht als Vorschau
- Aktuell geöffneter Circle ist deutlich markiert
- Ungelesene Hinweise verschwinden nicht nur durch Öffnen des Circle-Switchers; erst beim Öffnen eines Chats werden sie reduziert
- 99+ Darstellung für sehr viele ungelesene Nachrichten vorbereitet
- Alle übrigen V13-Funktionen bleiben erhalten


V15:
- V14-Funktionen bleiben enthalten
- Cache-/Service-Worker-Problem korrigiert: alte Test-Caches und alte Service Worker werden entfernt; V15 registriert absichtlich keinen neuen Service Worker
- Einstellungen > Feed-Anzeige: „Nur aktueller Circle“ oder „Alle Circles zusammen“
- Feed zeigt passend zur Auswahl entweder circle-intern oder Beiträge aus mehreren Circles
- Profilbild in der Kontaktinfo ist anklickbar und öffnet eine große Bildansicht
- Profilbild und Name im Einzelchat führen weiterhin zur Kontaktinfo


V16 – Circle Hub:
Alle 20 geplanten Funktionsbereiche wurden in die Testversion integriert:
1 Chat+ (Antworten, Reaktionen, Pins, Bearbeiten, Favoriten, @Erwähnungen, Lesestatus)
2 Multi-Circle-System
3 Circle Catch-up
4 Family Board
5 Smart Actions aus Chat
6 Gemeinsame Listen
7 Wer-kann?-Anfragen
8 Circle Moments
9 Damals/Erinnerungen
10 Circle Capsule/Zeitkapsel
11 Bin-angekommen-Orte
12 Safety Hub inkl. „Hol mich ab“
13 Safe Walk
14 Circle Doorbell
15 Stimmung/Verfügbarkeit
16 persönlicher Feed-Filter
17 Circle Inbox
18 Circle Pulse
19 Circle Bridge
20 Kommunikations-/Lebensplattform mit Voice, Calls, Umfragen und gespeicherten Inhalten

Hinweis: Dies ist weiterhin eine lokale Demo/Testversion. Netzwerkdienste wie echte Push-Nachrichten, Calls, Live-Standort und serverseitige Synchronisation sind als interaktive Demo-Oberflächen vorbereitet und benötigen für eine echte App ein Backend/native APIs.


V17 – Korrektur:
- Der in V16 eingebaute Circle Hub war nicht in der oberen Navigation sichtbar.
- V17 zeigt jetzt oben ein eigenes „✨ Hub“-Symbol.
- Über Hub sind die 20 neuen V16-Funktionsbereiche erreichbar.
- Obere Symbolleiste ist für vier Aktionen auf iPhone-Breite angepasst.
- Alles andere aus V16 bleibt unverändert.
