# Designdokument – Fresh Table

## Designmål

Fresh Table skal være enkel, overskuelig og visuelt indbydende. Brugeren
skal hurtigt kunne forstå, hvor opskrifter findes, og hvordan nye
opskrifter tilføjes.

## Overordnet struktur

Applikationen består af tre primære sider:

1.  **Forside**  
    Viser alle opskrifter i et grid. Hver opskrift kan åbnes via et link
    til detaljesiden.

2.  **Administrationsside**  
    Indeholder en formular til at tilføje opskrifter samt en liste over
    gemte opskrifter, hvor opskrifter kan slettes.

3.  **Detaljeside**  
    Viser én valgt opskrift med navn, beskrivelse, ingredienser og
    fremgangsmåde.

## Brugerflow

1.  Brugeren åbner forsiden.

2.  Applikationen henter opskrifter fra SQL DB.

3.  Brugeren kan åbne en opskrift eller gå til administrationssiden.

4.  På administrationssiden kan brugeren oprette eller slette
    opskrifter.

5.  Ændringer gemmes i databasen og vises derefter på forsiden.

6.  Hvis opskrift ønskes vist, kan detaljesiden tilgås, for detaljeret
    fremvisning.

## Visuelt design

Designet bruger varme farver, kortbaseret layout og tydelige knapper.
Det passer til madtemaet og gør siden mere behagelig at bruge.

## Dynamic scaling

Layoutet tilpasser sig mindre skærme. Opskriftskort vises i tre kolonner
på større skærme, to kolonner på mellemstore skærme og én kolonne på små
skærme.

## Valg og fravalg

### Valgt: Simpel webapplikation

Det gør projektet lettere at udvikle og teste inden for projektets
rammer.

### Valgt: SQLite

SQLite er let at sætte op, kræver ikke separat databaseserver og passer
godt til et mindre projekt.

### Fravalgt: Brugerlogin

Login er fravalgt for at holde fokus på kernefunktionaliteten:
opskriftsoprettelse, visning og sletning.

### Fravalgt: Billedupload

Billedupload kræver ekstra håndtering af filopbevaring og validering.
Det kan være en senere udvidelse.

## Mulige forbedringer

- Redigering af opskrifter.

- Kategorier, tags eller søgefunktion.

- Billeder til opskrifter.

- Login og personlige opskriftssamlinger.
