(function() {
    const goConfig = window.goConfig;
    const apiUrl = goConfig.apiUrl;
    const errorHandler = goConfig.errorHandler;
    const tableauInit = goConfig.tableauInit;
    const getAjaxHeader = goConfig.getAjaxHeader;
    const setCredentials = goConfig.setCredentials;

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
                    region_id: rsnip.region ? rsnip.region.id : null,
                    region_name: rsnip.region ? rsnip.region.name : null,
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
            headers: getAjaxHeader(),
            error: errorHandler,
            success: getData
        });
    };

    tableau.registerConnector(goConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            setCredentials();
            tableau.connectionName = "GO Region Snippets"; // This will be the data source name in Tableau
            tableau.submit(goConnector); // This sends the connector object to Tableau
        }).text("Get GO Region Snippets Data!");
    });
})();
