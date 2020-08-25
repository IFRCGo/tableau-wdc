(function() {
    const goConfig = window.goConfig;
    const apiUrl = goConfig.apiUrl;
    // const errorHandler = goConfig.errorHandler; // TODO: probably needed for credentials in the future
    const tableauInit = goConfig.tableauInit;
    // const getAjaxHeader = goConfig.getAjaxHeader; // TODO: probably needed for credentials in the future
    // const setCredentials = goConfig.setCredentails; // TODO: probably needed for credentials in the future

    const url = apiUrl + '/per_country_duedate/?tableau=true&${bigLimit}';

    // Create the connector object
    const goConnector = tableau.makeConnector();

    // Define the schema
    goConnector.getSchema = function(schemaCallback) {
        const cols = [{
            id: "id",
            alias: "id",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "name",
            alias: "name",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "code",
            alias: "code",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "updated_at",
            alias: "updated at",
            dataType: tableau.dataTypeEnum.datetime
        }, {
            id: "country_name",
            alias: "country",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "language",
            alias: "language",
            dataType: tableau.dataTypeEnum.int
        }];

        const tableInfo = {
            id: "per_country_duedates",
            alias: "GO PERCountryDueDates Info",
            columns: cols
        };

        schemaCallback([tableInfo]);
    };

    // Init function for connector, called during every phase
    goConnector.init = tableauInit;

    // Download the data
    goConnector.getData = function(table, doneCallback) {
        const getData = function(resp) {
            const perCountryDuedates = resp.results;
            const tableData = perCountryDuedates.map(function(pcd) {
                return {
                    id: pcd.id,
                    name: pcd.name,
                    code: pcd.code,
                    updated_at: pcd.updated_at,
                    country_name: pcd.country ? pcd.country.name : null,
                    language: pcd.language
                };
            });

            table.appendRows(tableData);
            doneCallback();
        };

        $.ajax({
            dataType: "json",
            url: url,
            // headers: getAjaxHeader(), // TODO: probably needed for credentials in the future
            // error: errorHandler, // TODO: probably needed for credentials in the future
            success: getData
        });
    };

    tableau.registerConnector(goConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            // setCredentials(); // TODO: probably needed for credentials in the future
            tableau.connectionName = "GO PERCountryDueDates"; // This will be the data source name in Tableau
            tableau.submit(goConnector); // This sends the connector object to Tableau
        }).text("Get GO PERCountryDueDates Data!");
    });
})();
