(function() {
    const goConfig = window.goConfig;
    const apiUrl = goConfig.apiUrl;
    const errorHandler = goConfig.errorHandler;
    const tableauInit = goConfig.tableauInit;
    const getAjaxHeader = goConfig.getAjaxHeader;
    const setCredentials = goConfig.setCredentials;

    const url = apiUrl + '/language/?tableau=true&${bigLimit}';

    // Create the connector object
    const goConnector = tableau.makeConnector();

    // Define the schema
    goConnector.getSchema = function(schemaCallback) {
        const cols = [{
            id: "code",
            alias: "code",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "title",
            alias: "title",
            dataType: tableau.dataTypeEnum.string
        }];

        const tableInfo = {
            id: "languages",
            alias: "GO Languages Info",
            columns: cols
        };

        schemaCallback([tableInfo]);
    };

    // Init function for connector, called during every phase
    goConnector.init = tableauInit;

    // Download the data
    goConnector.getData = function(table, doneCallback) {
        const getData = function(resp) {
            const languages = resp.results;
            const tableData = languages.map(function(lang) {
                return {
                    code: lang.code,
                    title: lang.title
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
            tableau.connectionName = "GO Languages"; // This will be the data source name in Tableau
            tableau.submit(goConnector); // This sends the connector object to Tableau
        }).text("Get GO Languages Data!");
    });
})();
