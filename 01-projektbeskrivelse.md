# Teknisk dokumentation – Fresh Table

## Arkitektur

Fresh Table er opbygget som en simpel client-server-applikation.

- Klienten består af HTML, CSS og browserbaseret JavaScript.

- Serveren er bygget med Node.js og Express.

- Data gemmes i en lokal SQLite-database.

### Database

Databasen hedder recipes.db og indeholder tabellen recipes.

### Tabel: recipes

| **Felt**    | **Type** | **Beskrivelse**            |
|-------------|----------|----------------------------|
| id          | INTEGER  | Primærnøgle, autogenereres |
| name        | TEXT     | Opskriftens navn           |
| description | TEXT     | Kort beskrivelse           |
| ingredients | TEXT     | Ingredienser               |
| howToMake   | TEXT     | Fremgangsmåde              |
| createdAt   | DATETIME | Tidspunkt for oprettelse   |

## 

## Kendte begrænsninger

- Ingen brugerlogin.

- Ingen redigering af eksisterende opskrifter.

- Ingen upload af billeder.

- Ingen søgning eller filtrering.

- SQLite-databasen er lokal og egner sig bedst til mindre projekter.
