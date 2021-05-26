---
title: Deployment
---

# Today I Learned Deployment auf Windows 10

Nachdem Änderungen vorgenommen wurden, kann das Deployment in Windows 10 mit wenigen Schritten durchgeführt werden. Im folgenden Stellen wir die wichtigsten Schritte vor.


## 1. WSL-2 und Linux-Verteilung Installieren

Damit das Deployment durch Linux befehle durchgeführt werden kann, müssen ein Subsystem für Linux 2 (WSL-2) sowie eine Linux-Verteilung (z.B Ubuntu) Installiert werden. 

https://docs.microsoft.com/de-de/windows/wsl/install-win10

## 2. Node.js und Yarn Installieren

Stelle sicher, dass Node.js und Yarn auf dem Computer installiert sind durch die Eingabe von:

```node --version```

und

```yarn --version```

Falls einer von beiden nicht installiert ist, installiere sie mit Hilfe von:

https://classic.yarnpkg.com/en/docs/install/#windows-stable

https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions

## 3. Visual Studio Code in WSL öffnen

Lade dafür die Visual Studio Code Extension "Remote Development" runter. (Remote - WSL reicht auch aus). Wechsele zum Entwicklung auf WSL indem du in der Command Palette "Reopen Folder in WSL Window" eingibst.
Alternativ kann Visual Studio Code in einem WSL Terminal geöffnet werden:

Navigiere zu den Ornder den du öffnen möchtest und gebe ```". code"``` ein.

## 4. Erstelle einen .env Ordner

Erstelle einen .env Ordner und füge die Serverdaten hinzu.

## 5. Deploy!

Führe im diesen Befehl Terminal diesen Befehl ```./scripts/deploy.sh``` aus.

