(function() {
    const goConfig = window.goConfig;
    const apiUrl = goConfig.apiUrl;
    // const errorHandler = goConfig.errorHandler; // TODO: probably needed for credentials in the future
    const tableauInit = goConfig.tableauInit;
    // const getAjaxHeader = goConfig.getAjaxHeader; // TODO: probably needed for credentials in the future
    // const setCredentials = goConfig.setCredentails; // TODO: probably needed for credentials in the future

    const url = apiUrl + '/event_snippet/?tableau=true&${bigLimit}';

    // Create the connector object
    const goConnector = tableau.makeConnector();

    // Define the schema
    goConnector.getSchema = function(schemaCallback) {
        const cols = [{
            id: "id",
            alias: "id",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "event_id",
            alias: "emergency id",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "event_name",
            alias: "emergency name",
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
            id: "event_snippets",
            alias: "GO Emergency Snippets Info",
            columns: cols
        };

        schemaCallback([tableInfo]);
    };

    // Init function for connector, called during every phase
    goConnector.init = tableauInit;

    // Download the data
    goConnector.getData = function(table, doneCallback) {
        const getData = function(resp) {
            const eventSnippets = resp.results;
            const tableData = eventSnippets.map(function(esnip) {
                return {
                    id: esnip.id,
                    event_id: esnip.event ? esnip.event.id : null,
                    event_name: esnip.event ? esnip.event.name : null,
                    snippet: esnip.snippet,
                    visibility: esnip.visibility
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
            tableau.connectionName = "GO Emergency Snippets"; // This will be the data source name in Tableau
            tableau.submit(goConnector); // This sends the connector object to Tableau
        }).text("Get GO Emergency Snippets Data!");
    });
})();
