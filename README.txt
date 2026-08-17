Cirvela V21

Änderungen: Dachmarke Cirvela, professionelleres UI-System, funktionale Medien-Tabs und Medienobjekte. Bestehende Circle-Funktionen bleiben erhalten.

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


V18 – Circle-Plattform auf Basis der tatsächlich hochgeladenen V16:
- Sichtbarer Circle Hub direkt unter der Versionsanzeige; dadurch sind die neuen Funktionen zuverlässig erreichbar.
- WhatsApp-artige Chat+-Funktionen: Antworten/Zitieren, Reaktionen, Weiterleiten, Bearbeiten/Löschen, Pins/Ankündigungen, @Erwähnungen, Gruppen-Lesestatus, Favoriten, Suche und Chat-Sperre (interaktive Demo).
- Sprachnachrichten mit Wellenform und 1×/1,5×/2× Geschwindigkeitsumschaltung.
- Circle-Switcher erweitert um CoupleCircle, TravelCircle und SchoolCircle.
- Catch-up, Family/Circle Board, Smart Actions, gemeinsame Listen und „Wer kann?“.
- Circle Moments, Damals und Zeitkapsel.
- Bin angekommen, Safety Hub, Safe Walk und Circle Doorbell.
- Freiwillige Stimmung/Verfügbarkeit.
- Feed: aktueller Circle, alle Circles oder „Mein Feed“ mit eigener Circle-Auswahl.
- Circle Inbox, Circle Pulse und Circle Bridge.
- Status und Standort wurden um passende Hub-Funktionen ergänzt.
- Alle neuen Funktionen bleiben in dieser GitHub-Pages-Testversion lokal/interaktiv; echte Push-, Call-, Live-Standort- und Cloud-Synchronisation benötigen später Backend/native iOS-Funktionen.


V20 – Cirvela Quiet Glass
- Komplette visuelle Überarbeitung ohne Funktionsverlust.
- Ruhiger, erwachsener Cirvela-Look mit Glass/Minimal-Ästhetik.
- Aktueller Circle ist die primäre Überschrift; Cirvela ist die dezente Dachmarke.
- Kompaktere obere Navigation und schlankere untere Navigation.
- Neutraler Chatbereich, kompaktere Nachrichtenblasen und schwebende Schreibleiste.
- SOS bleibt klar sichtbar, ist aber stärker in die Navigation integriert.
- Feed, Stories, Circle-Switcher, Sheets, Profile und Circle Hub wurden visuell beruhigt.
- Vorhandene Funktionen und Weiterleitungen bleiben bestehen.


V21 – Circle Designs & Chat-Hintergründe
- Mehr Farbdifferenzierung zwischen Kopfbereich, Circle-Flächen, Chat, Karten und Navigation.
- Jeder Circle erhält ein eigenes gespeichertes Design und lädt dieses automatisch beim Wechsel.
- Einstellungen > Darstellung > Circle-Designs: Circle auswählen und mehrere passende Designs wählen.
- GirlsCircle enthält u. a. das florale Design „Bloom“; andere Circles haben eigene seriöse Designsets.
- Chat-Hintergrund lässt sich durch langes Drücken auf eine freie Chatfläche ändern.
- Vordefinierte Hintergründe: Circle-Design, Linen, Mist, Botanical, Dusk, Ocean, Rose.
- Eigenes Hintergrundbild kann ausgewählt, komprimiert und lokal für den jeweiligen Chat gespeichert werden.
- Chat-Hintergrund und Circle-Design werden getrennt gespeichert.


V22 – gezielte Änderungen
- Oben: Cirvela-Wortmarke mit Schwarz→Rot-Verlauf; der Buchstabe v liegt im Übergang und enthält sowohl verblasstes Schwarz als auch verblasstes Rot.
- Oben: horizontal wischbare Circle-Leiste, vier Circles gleichzeitig sichtbar; Circle-Name in Designfarbe und Ungelesen-Badge pro Circle.
- Unten: nur eine Navigationsleiste, Reihenfolge Chats · Kalender · Standort · SOS · Spiele · Status · Feed.
- SOS zwischen Standort und Spiele.
- Einstellungen bleibt oben rechts.
- Spiele mit schwarzem Controller, Kamera schwarz, Kontakte als klar umrandeter Button.
- Darstellung: deutlich mehr Designs; obere Leiste und Chatbereich getrennt oder gemeinsam wählbar.
- Alle übrigen Funktionen aus V21 bleiben erhalten.


V23 – technischer Fix gegenüber V22:
- Chat-Kopfzeile bleibt beim Scrollen unterhalb der oberen Cirvela-/Circle-Leiste sichtbar.
- Im Tastaturmodus sitzt die Chat-Kopfzeile weiterhin korrekt oben.
- Keine sonstigen Design- oder Funktionsänderungen.


V24 – Layoutkorrektur:
- Cirvela-Schriftzug und Private Demo/V24 bleiben vollständig sichtbar.
- Circle-Leiste liegt jetzt in einer eigenen Zeile darunter.
- Circle-Leiste kann den Markenbereich nicht mehr überdecken.
- Chat-Kopfzeile berücksichtigt die neue tatsächliche Höhe der oberen Leiste.
- Sonst keine Design- oder Funktionsänderungen.


V25 – gezielte Korrekturen gegenüber V24:
- Cirvela-Schrift wieder mit Schwarz→Rot-Verlauf; das V enthält verblasstes Schwarz und verblasstes Rot.
- Beim Öffnen der iPhone-Tastatur sitzt die Schreibleiste direkt über der Tastatur; der sichtbare Chatbereich bleibt scrollbar und zeigt die letzten Nachrichten.
- Circle-Wechsel bleibt in der aktuell gewählten Haupt-Rubrik: Kalender, Standort, Spiele, Status oder Feed.
- Kalender, Standort, Spiele und Status zeigen jetzt Inhalte/Bezeichnungen des jeweils gewählten Circles; Feed fokussiert beim Circle-Wechsel den gewählten Circle.
- Modale Unterseiten besitzen eine beim Scrollen sichtbare Zurück-Taste.
- Sonstige Navigation, Designs und bestehende Funktionen wurden nicht absichtlich verändert.


V26 – nur zwei Korrekturen gegenüber V25:
- Cirvela wird nicht mehr durch ältere CSS-Regeln komplett in Großbuchstaben erzwungen.
- Ältere Overlay-Schließen-Schaltflächen werden als Zurück-Pfeil dargestellt; ihre bestehende Funktion bleibt unverändert.
- Keine weiteren Design- oder Funktionsänderungen.


V27 – gezielte Korrekturen gegenüber V26:
- Gewählte Chat-Hintergründe (inkl. eigenes Bild) bleiben beim Öffnen der Tastatur sichtbar.
- Beim Fokus auf die Schreibleiste wird der Chat nicht mehr automatisch bis ganz nach unten gescrollt; die bisher sichtbaren Nachrichten bleiben erhalten.
- Hell / Dunkel / System unter Darstellung funktionieren und werden gespeichert.
- Direkt unter der Circle-Auswahl gibt es „Auswahl übernehmen“.
- Jede einzelne Designvorlage besitzt eine eigene „Übernehmen“-Taste.
- Sonstige Funktionen und Navigation wurden nicht absichtlich verändert.


V28 – gezielte Änderungen gegenüber V27:
- Beim Schreiben wird der unnötige große Leerraum oberhalb der Tastatur entfernt; die Schreibleiste sitzt direkt am sichtbaren unteren Rand.
- Gewählter Chat-Hintergrund bleibt sichtbar.
- Dark Mode: Nachrichtentexte, Namen und Zeitstempel bleiben kontrastreich lesbar.
- Chat-Kopfzeile ist schmaler und bleibt beim Scrollen fixiert.
- Circle-Leiste ist kleiner; 6 Circles passen gleichzeitig.
- Circles können per Drag neu sortiert werden.
- Langes Drücken ohne Bewegung öffnet „Fixieren“/„Lösen“.
- Maximal 2 Circles sind fixierbar und bleiben auf Position 1 und 2.
- Fixierte Circles können nur untereinander auf Position 1/2 getauscht werden; erst nach Lösen sind sie wieder frei sortierbar.
- Fixierte Circles können zusätzlich in Einstellungen → Circle-Management ausgewählt werden.
- Reihenfolge und Fixierungen werden gespeichert.
- Andere Funktionen wurden nicht absichtlich verändert.


V29 – Korrektur nach realem iPhone-Test:
- Konkreter Laufzeitfehler der Circle-Leiste behoben (falscher Funktionsname designById).
- Circle-Leiste rendert wieder und zeigt 6 Circles gleichzeitig.
- Circle-Management ist jetzt tatsächlich in Einstellungen erreichbar.
- Long-Press ohne Bewegung öffnet Fixieren/Lösen; kurzes Wischen bleibt Scrollen; Halten+Bewegen sortiert.
- Keyboard-Ansicht wurde neu als Flex-Layout aufgebaut: Chat-Kopfzeile, Nachrichten und Schreibleiste füllen den sichtbaren App-Bereich ohne internen Leerraum.
- Dark Mode korrigiert für die tatsächlichen Nachrichtenklassen .bubble.theirs / .bubble.mine.
- Bestehende Navigation und sonstige Funktionen wurden nicht absichtlich verändert.


V30 – gezielte Circle-Korrekturen:
- Circle-Darstellung wieder rund; rechteckige Kartenoptik entfernt.
- Fixierte Circles sind vollständig unbeweglich, bis sie über „Lösen“ oder Einstellungen gelöst werden.
- Lose Circles bleiben sortierbar; sie können nicht auf die fixierten Plätze gezogen werden.
- Long-Press wurde für iPhone/Safari zusätzlich mit Touch-Events umgesetzt.
- Langes Drücken ohne Bewegung öffnet Fixieren/Lösen.
- Gedrückthalten + horizontales Bewegen sortiert nur lose Circles.
- Sonstige Bereiche der V29 wurden nicht absichtlich verändert.


V31 – nur Größenanpassungen:
- Oberer Cirvela-/Circle-Bereich kompakter.
- Circle-Leiste flacher; Circle-Symbole und Circle-Namen proportional kleiner.
- Chat-Kopfzeile nochmals schmaler.
- Untere Navigationsleiste flacher; alle Symbole und Beschriftungen proportional kleiner.
- SOS bleibt mittig, ist aber proportional kleiner.
- Keine sonstigen Funktions- oder Designänderungen.


V32 – Korrektur der V31-Größenanpassung:
- V31 hat teils falsche CSS-Klassen angesprochen und den Cirvela-Schriftzug versehentlich vergrößert.
- V32 verwendet die tatsächlich vorhandenen Klassen (.nav-glyph, .nav-item b, .subtitle usw.).
- Oberer Bereich, Circle-Leiste, Chat-Kopfzeile und untere Navigation sind jetzt messbar kleiner.
- Circles bleiben rund und 6 Circles passen gleichzeitig.
- Alle enthaltenen Symbole und Beschriftungen wurden proportional verkleinert.
- SOS bleibt mittig.
- Keine Funktionsänderungen.


V33 – ausschließlich die bestätigten Änderungen:
- Obere Fläche und untere Navigation verkleinert.
- Circle Hub / Einstellungen kompakter und ohne Textüberlauf.
- Circle-Leiste kompakter, 6 Circles sichtbar.
- Circle-Namen schwarz.
- Maximal zwei fixierte Circles stehen fest links und scrollen nicht mit.
- Nur lose Circles scrollen horizontal.
- Normales Wischen scrollt; Halten+Ziehen sortiert nur lose Circles.
- Langes Drücken ohne Bewegung öffnet Fixieren/Lösen.
- Fixierte Circles können nicht verschoben werden, bis sie gelöst werden.
- Tastatur-/Chat-Hintergrund-Verhalten bleibt erhalten.
- Keine weiteren Design- oder Funktionsänderungen.

V34:
- Circle-Hub/Zahnrad oben rechts sauber ausgerichtet.
- Long-Press zeigt FIXIEREN/LÖSEN als großes Vordergrund-Overlay.
- Maximal 3 Circles fixierbar.
- Kontakte-Button im Gruppenchat durch Circles ersetzt.
- Circles öffnet eine Liste aller Circles mit Ungelesen-Markierung und direkter Navigation.
- Tippen auf den Circle-Namen öffnet die Mitgliederliste des aktuellen Circles.
- Keine weiteren Funktionen absichtlich verändert.
