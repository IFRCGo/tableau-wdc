(function() {
    const goConfig = window.goConfig;
    const apiUrl = goConfig.apiUrl;
    const bigLimit = goConfig.bigLimit;
    const errorHandler = goConfig.errorHandler;
    const tableauInit = goConfig.tableauInit;
    const getAjaxHeader = goConfig.getAjaxHeader;
    const setCredentials = goConfig.setCredentials;

    const url = apiUrl + `/appeal_document/?tableau=true&${bigLimit}`;

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
            id: "created_at",
            alias: "created at",
            dataType: tableau.dataTypeEnum.datetime
        }, {
            id: "appeal_id",
            alias: "appeal id",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "appeal_name",
            alias: "appeal name",
            dataType: tableau.dataTypeEnum.string
        }];

        const tableInfo = {
            id: "appeal_documentss",
            alias: "GO Appeal Documents Info",
            columns: cols
        };

        schemaCallback([tableInfo]);
    };

    // Init function for connector, called during every phase
    goConnector.init = tableauInit;

    // Download the data
    goConnector.getData = function(table, doneCallback) {
        const getData = function(resp) {
            const appdocs = resp.results;
            const tableData = appdocs.map(function(doc) {
                return {
                    id: doc.id,
                    name: doc.name,
                    document: doc.document,
                    document_url: doc.document_url,
                    created_at: doc.created_at,
                    appeal_id: doc.appeal ? doc.appeal.id : null,
                    appeal_name: doc.appeal ? doc.appeal.name : null
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
            tableau.connectionName = "GO Appeal Documents"; // This will be the data source name in Tableau
            tableau.submit(goConnector); // This sends the connector object to Tableau
        }).text("Get GO Appeal Documents Data!");
    });
})();
