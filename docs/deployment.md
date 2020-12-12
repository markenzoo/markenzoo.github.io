---
title: Deployment
---

# Einleitung

Eine bestehende Contao-Installation auf ein Ziel-Server umziehen ist denkbar einfach. Allerdings gibt es ein paar Dinge die man beachten sollte, damit der Prozess einfach ist. Im folgenden Stellen wir die wichtigsten Schritte vor.

## Datenbank kopieren

Die Grundlage für ein erfolgreiches Deployment liegt im exportieren und importieren der MySQL-Datenbank. Dazu rufst du auf deiner bestehenden Installation das PHPMyAdmin-Webinterface auf. Dort wechselst du in den Reiter `exportieren` und bestätigst auf `OK`. Nachdem der Download erfolgreich beendet wurde, findest du den Datanbank-Inhalt in einer `*.sql` Datei. Nun öffnest du das PHPMyAdmin-Webinterface auf dem Ziel-Server und öffnest dort den Reiter `importieren`. Nun wählst du die `*.sql` Datei aus, welche du im vorhergehenden Schritt exportiert hast und bestätigst mit `OK`. Nachdem die Datenbank erfolgreich importiert wurde kannst du zum nächsten Schritt übergehen.

Natürlich lässt sich der ganze Prozess auch über die Kommandozeile vereinfachen. Nutze dafür einfach folgende Befehle.

## Contao 4 umziehen

Durch den Contao-Manager ist es möglich eine Contao-Installation auf einem einfachen und angenehmen Weg über eine grafische Oberfläche durchzuführen. Ebenso is der Contao Manager einsteiger-freundlich und benötigt weder Kenntnisse von der Kommandozeile noch tiefgreifendes Verständnis von Linux Servern. Der Contao Manager ist auch eine Klasse alternative, falls auf dem Ziel-Hosting kein SSH-Zugang verfügbar ist. Um den Contao Manager zu nutzen lädst du dir einfach die `contao-manager.phar` von [contao.org](https://contao.org/de/download.html) runter. 

1. Konfiguriere dein Ziel-Hosting entsprechend, sodass die Domain oder Subdomain angelegt ist. Kopiere nun die `composer.json` sowie die `composer.lock` in den Zielpfad.

2. Erstelle im Zielpfad auf dem Server einen Ordner namens `web`. Nun kopierst du die Datei `contao-manager.phar` mittels FTP in diesen Ordner. Nachdem die Datei auf den Server kopiert wurde solltest du sie in `contao-manager.php` umbenennen. 

3. Rufe nun den Contao Manager in deinem Browser auf, indem du den Pfad `/contao-manager.php` auf deiner Domain aufrufst. Lautet deine in Schritt 1 erstellte Domain bspw. `http://www.example.com` so rufst du nun `http://www.example.com/contao-manager.php` auf. Der Contao Manager leitet dich nun durch die notwendingen Schritte um Contao auf dem Ziel System zu installieren. Alternativ kannst du für diesen Schritt auch die Kommandozeile benutzen, indem du `composer install` im Zielpfad deiner Contao Installation ausfürst.

4. Kopiere folgende Ordner deiner Contao Installation (falls vorhanden) auf das Ziel-System:

```sh
contao/
├── files/
├── config/
├── contao/
├── files/
└── templates/
```

5. Erstelle im Zielpfad auf dem Server einen Ordner namens `system`. Erstelle danach in diesem Ordner einen weiteren Ordner namens `config`. Kopiere nun die Datei `system/config/localconfig.php` aus deiner Contao Installation in den erstellten Ordner auf den Server.

6. Nun startest du den Contao Manager erneut, wechselst in den Reiter `Systemwartung` und klickst dort Schaltfläche `Prod.-Cache erneuern` an. Falls du erneut die Kommandozeile bevorzugst, dann führe alternativ einfach `./vendor/bin/contao-console cache:clear` aus.

7. Im letzten Schritt startest du das Installtool von Contao. Rufe dafür den Pfad `/contao/install` deiner Domain auf. Lautet deine in Schritt 1 erstellte Domain bspw. `http://www.example.com` so rufst du nun `http://www.example.com/contao/install` auf. Überprüfe nun die Verbindung zur Datenbank. Ist auf dem Zielsystem eine andere Konfiguration als deiner bestehenden Contao-Installation notwendig, so wirst du aufgefordert erneut den Datenbankname, Nutzer und Passwort zu konfigurieren. Nachdem dieser Schritt abgeschlossen ist, solltest du dich mit deinem bisherigen Nutzer im Backend einloggen können. Anstelle des Installtools kannst du genauso die Kommandozeile benutzen. Führe hierzu einfach `./vendor/bin/contao-console contao:migrate`


Geschafft! 🎉 

