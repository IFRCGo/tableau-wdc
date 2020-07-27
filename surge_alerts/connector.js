(function() {
    const goConfig = window.goConfig;
    const apiUrl = goConfig.apiUrl;
    // const errorHandler = goConfig.errorHandler; // TODO: probably needed for credentials in the future
    const tableauInit = goConfig.tableauInit;
    // const getAjaxHeader = goConfig.getAjaxHeader; // TODO: probably needed for credentials in the future
    // const setCredentials = goConfig.setCredentails; // TODO: probably needed for credentials in the future

    const url = apiUrl + '/surge_alert/?tableau=true&${bigLimit}';

    // Create the connector object
    const goConnector = tableau.makeConnector();

    // Define the schema
    goConnector.getSchema = function(schemaCallback) {
        const cols = [{
            id: "id",
            alias: "id",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "operation",
            alias: "operation",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "atype",
            alias: "atype",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "category",
            alias: "category",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "deployment_needed",
            alias: "deployment_needed",
            dataType: tableau.dataTypeEnum.bool
        }, {
            id: "is_private",
            alias: "is_private",
            dataType: tableau.dataTypeEnum.bool
        }, {
            id: "created_at",
            alias: "created at",
            dataType: tableau.dataTypeEnum.datetime
        }, {
            id: "event_id",
            alias: "emergency id",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "event_name",
            alias: "emergency name",
            dataType: tableau.dataTypeEnum.int
        }];

        const tableInfo = {
            id: "surge_alerts",
            alias: "GO Surge Alerts Info",
            columns: cols
        };

        schemaCallback([tableInfo]);
    };

    // Init function for connector, called during every phase
    goConnector.init = tableauInit;

    // Download the data
    goConnector.getData = function(table, doneCallback) {
        const getData = function(resp) {
            const surgeAlerts = resp.results;
            const tableData = surgeAlerts.map(function(sa) {
                return {
                    id: sa.id,
                    operation: sa.operation,
                    atype: sa.atype,
                    category: sa.category,
                    deployment_needed: sa.deployment_needed,
                    is_private: sa.is_private,
                    created_at: sa.created_at,
                    event_id: sa.event?.id,
                    event_name: sa.event?.name
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
            tableau.connectionName = "GO Surge Alerts"; // This will be the data source name in Tableau
            tableau.submit(goConnector); // This sends the connector object to Tableau
        }).text("Get GO Surge Alerts Data!");
    });
})();
