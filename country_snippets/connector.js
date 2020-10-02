(function() {
    const goConfig = window.goConfig;
    const apiUrl = goConfig.apiUrl;
    const errorHandler = goConfig.errorHandler;
    const tableauInit = goConfig.tableauInit;
    const getAjaxHeader = goConfig.getAjaxHeader;
    const setCredentials = goConfig.setCredentials;

    const url = apiUrl + '/country_snippet/?tableau=true&${bigLimit}';

    // Create the connector object
    const goConnector = tableau.makeConnector();

    // Define the schema
    goConnector.getSchema = function(schemaCallback) {
        const cols = [{
            id: "id",
            alias: "id",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "country_id",
            alias: "countr id",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "country_name",
            alias: "country name",
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
            id: "country_snippets",
            alias: "GO Country Snippets Info",
            columns: cols
        };

        schemaCallback([tableInfo]);
    };

    // Init function for connector, called during every phase
    goConnector.init = tableauInit;

    // Download the data
    goConnector.getData = function(table, doneCallback) {
        const getData = function(resp) {
            const countrySnippets = resp.results;
            const tableData = countrySnippets.map(function(csnip) {
                return {
                    id: csnip.id,
                    country_id: csnip.country ? csnip.country.id : null,
                    country_name: csnip.country ? csnip.country.name : null,
                    snippet: csnip.snippet,
                    visibility: csnip.visibility
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
            tableau.connectionName = "GO Country Snippets"; // This will be the data source name in Tableau
            tableau.submit(goConnector); // This sends the connector object to Tableau
        }).text("Get GO Country Snippets Data!");
    });
})();
