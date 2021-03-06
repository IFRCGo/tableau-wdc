(function() {
    const goConfig = window.goConfig;
    const apiUrl = goConfig.apiUrl;
    const errorHandler = goConfig.errorHandler;
    const tableauInit = goConfig.tableauInit;
    const getAjaxHeader = goConfig.getAjaxHeader;
    const setCredentials = goConfig.setCredentials;

    const url = apiUrl + '/situation_report/?tableau=true&${bigLimit}';

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
            id: "document",
            alias: "document",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "document_url",
            alias: "document url",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "event_id",
            alias: "emergency id",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "event_name",
            alias: "emergency name",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "type",
            alias: "type",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "created_at",
            alias: "created at",
            dataType: tableau.dataTypeEnum.datetime
        }, {
            id: "visibility",
            alias: "visibility",
            dataType: tableau.dataTypeEnum.int
        }];

        const tableInfo = {
            id: "situation_reports",
            alias: "GO Situation Reports Info",
            columns: cols
        };

        schemaCallback([tableInfo]);
    };

    // Init function for connector, called during every phase
    goConnector.init = tableauInit;

    // Download the data
    goConnector.getData = function(table, doneCallback) {
        const getData = function(resp) {
            const sitreps = resp.results;
            const tableData = sitreps.map(function(sr) {
                return {
                    id: sr.id,
                    name: sr.name,
                    document: sr.document,
                    document_url: sr.document_url,
                    event_id: sr.event ? sr.event.id : null,
                    event_name: sr.event ? sr.event.name : null,
                    type: sr.type ? sr.type.type : null,
                    created_at: sr.created_at,
                    visibility: sr.visibility
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
            tableau.connectionName = "GO Situation Reports"; // This will be the data source name in Tableau
            tableau.submit(goConnector); // This sends the connector object to Tableau
        }).text("Get GO Situation Reports Data!");
    });
})();
