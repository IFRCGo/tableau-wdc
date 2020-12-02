# GO - Tableau Web Data Connector

Most endpoints follow the naming convention of the GO API, but in plural forms.

## Endpoints

| Name                   | Endpoint                | URL                                                   |
|------------------------|-------------------------|-------------------------------------------------------|
| Actions                | /actions                | https://ifrcgo.org/tableau-wdc/actions                |
| Appeals                | /appeals                | https://ifrcgo.org/tableau-wdc/appeals                |
| Appeal Documents       | /appeal_documents       | https://ifrcgo.org/tableau-wdc/appeal_documents       |
| Countries              | /countries              | https://ifrcgo.org/tableau-wdc/countries              |
| Country Key Figures    | /country_key_figures    | https://ifrcgo.org/tableau-wdc/country_key_figures    |
| Country Snippets       | /country_snippets       | https://ifrcgo.org/tableau-wdc/country_snippets       |
| Disaster Types         | /disaster_types         | https://ifrcgo.org/tableau-wdc/disaster_types         |
| Districts              | /districts              | https://ifrcgo.org/tableau-wdc/districts              |
| Domain Whitelists      | /domainwhitelists       | https://ifrcgo.org/tableau-wdc/domainwhitelists       |
| Emergencies            | /emergencies            | https://ifrcgo.org/tableau-wdc/emergencies            |
| ERUs                   | /erus                   | https://ifrcgo.org/tableau-wdc/erus                   |
| Event Snippets         | /event_snippets         | https://ifrcgo.org/tableau-wdc/event_snippets         |
| Field Reports          | /field_reports          | https://ifrcgo.org/tableau-wdc/field_reports          |
| Languages              | /languages              | https://ifrcgo.org/tableau-wdc/languages              |
| Partner Deployments    | /partner_deployments    | https://ifrcgo.org/tableau-wdc/partner_deployments    |
| PER Country Due Dates  | /per_country_duedates   | https://ifrcgo.org/tableau-wdc/per_country_duedates   |
| PER Overviews          | /peroverviews           | https://ifrcgo.org/tableau-wdc/peroverviews           |
| PER Stats              | /perstats               | https://ifrcgo.org/tableau-wdc/perstats               |
| PER Work Plans         | /perworkplans           | https://ifrcgo.org/tableau-wdc/perworkplans           |
| Projects               | /projects               | https://ifrcgo.org/tableau-wdc/projects               |
| Regions                | /regions                | https://ifrcgo.org/tableau-wdc/regions                |
| Region Snippets        | /region_snippets        | https://ifrcgo.org/tableau-wdc/region_snippets        |
| Situation Reports      | /situation_reports      | https://ifrcgo.org/tableau-wdc/situation_reports      |
| Situation Report Types | /situation_report_types | https://ifrcgo.org/tableau-wdc/situation_report_types |
| Surge Alerts           | /surge_alerts           | https://ifrcgo.org/tableau-wdc/surge_alerts           |

## Development

### Adding new endpoints

- Create a folder with the endpoint name, containing an `index.html` and a `connector.js` (best to copy from existing ones)
- `index.html`
  - Change `<title>`
- `connector.js`
  - Add/remove/change columns in the `cols` var (it's like the template), and also update in `tableData` (the actual values)
  - Change the `connectionName` and `text()` for the submit at the bottom
