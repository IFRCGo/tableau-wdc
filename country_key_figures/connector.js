(function() {
    const goConfig = window.goConfig;
    const apiUrl = goConfig.apiUrl;
    const bigLimit = goConfig.bigLimit;
    // const errorHandler = goConfig.errorHandler; // TODO: probably needed for credentials in the future
    const tableauInit = goConfig.tableauInit;
    // const getAjaxHeader = goConfig.getAjaxHeader; // TODO: probably needed for credentials in the future
    // const setCredentials = goConfig.setCredentails; // TODO: probably needed for credentials in the future

    const url = apiUrl + `/country_key_figure/?tableau=true&${bigLimit}`;

    // Create the connector object
    const goConnector = tableau.makeConnector();

    // Define the schema
    goConnector.getSchema = function(schemaCallback) {
        const cols = [{
            id: "id",
            alias: "id",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "figure",
            alias: "figure",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "deck",
            alias: "deck",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "source",
            alias: "source",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "country",
            alias: "country",
            dataType: tableau.dataTypeEnum.string
        }];

        const tableInfo = {
            id: "country_key_figures",
            alias: "GO Country Key Figures Info",
            columns: cols
        };

        schemaCallback([tableInfo]);
    };

    // Init function for connector, called during every phase
    goConnector.init = tableauInit;

    // Download the data
    goConnector.getData = function(table, doneCallback) {
        const getData = function(resp) {
            const countryKeyFigures = resp.results;
            const tableData = countryKeyFigures.map(function(ckf) {
                return {
                    id: ckf.id,
                    figure: ckf.figure,
                    deck: ckf.deck,
                    source: ckf.source,
                    country: ckf.country
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
            tableau.connectionName = "GO Country Key Figures"; // This will be the data source name in Tableau
            tableau.submit(goConnector); // This sends the connector object to Tableau
        }).text("Get GO Country Key Figures Data!");
    });
})();
