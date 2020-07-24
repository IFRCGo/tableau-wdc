(function() {
    const goConfig = window.goConfig;
    const apiUrl = goConfig.apiUrl;
    // const errorHandler = goConfig.errorHandler; // TODO: probably needed for credentials in the future
    const tableauInit = goConfig.tableauInit;
    // const getAjaxHeader = goConfig.getAjaxHeader; // TODO: probably needed for credentials in the future
    // const setCredentials = goConfig.setCredentails; // TODO: probably needed for credentials in the future

    const url = apiUrl + '/region_snippet/?tableau=true&${bigLimit}';

    // Create the connector object
    const goConnector = tableau.makeConnector();

    // Define the schema
    goConnector.getSchema = function(schemaCallback) {
        const cols = [{
            id: "id",
            alias: "id",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "region_id",
            alias: "region id",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "region_name",
            alias: "region name",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "snippet",
            alias: "snippet",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "visibility",
            alias: "visibility",
            dataType: tableau.dataTypeEnum.int
        }];

        const tableInfo = {
            id: "region_snippets",
            alias: "GO Region Snippets Info",
            columns: cols
        };

        schemaCallback([tableInfo]);
    };

    // Init function for connector, called during every phase
    goConnector.init = tableauInit;

    // Download the data
    goConnector.getData = function(table, doneCallback) {
        const getData = function(resp) {
            const regionSnippets = resp.results;
            const tableData = regionSnippets.map(function(rsnip) {
                return {
                    id: rsnip.id,
                    region_id: rsnip.region?.id,
                    region_name: rsnip.region?.name,
                    snippet: rsnip.snippet,
                    visibility: rsnip.visibility
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
            tableau.connectionName = "GO Region Snippets"; // This will be the data source name in Tableau
            tableau.submit(goConnector); // This sends the connector object to Tableau
        }).text("Get GO Region Snippets Data!");
    });
})();
