(function() {
    const goConfig = window.goConfig;
    const apiUrl = goConfig.apiUrl;
    const bigLimit = goConfig.bigLimit;
    // const errorHandler = goConfig.errorHandler; // TODO: probably needed for credentials in the future
    const tableauInit = goConfig.tableauInit;
    // const getAjaxHeader = goConfig.getAjaxHeader; // TODO: probably needed for credentials in the future
    // const setCredentials = goConfig.setCredentails; // TODO: probably needed for credentials in the future

    const url = apiUrl + `/action/?tableau=true&${bigLimit}`;

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
            id: "organizations",
            alias: "organizations",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "field_report_types",
            alias: "field report types",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "category",
            alias: "category",
            dataType: tableau.dataTypeEnum.string
        }];

        const tableInfo = {
            id: "actions",
            alias: "GO Actions Info",
            columns: cols
        };

        schemaCallback([tableInfo]);
    };

    // Init function for connector, called during every phase
    goConnector.init = tableauInit;

    // Download the data
    goConnector.getData = function(table, doneCallback) {
        const getData = function(resp) {
            const actions = resp.results;
            const tableData = actions.map(function(action) {
                return {
                    id: action.id,
                    name: action.name,
                    organizations: action.organizations,
                    field_report_types: action.field_report_types,
                    category: action.category
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
            tableau.connectionName = "GO Actions"; // This will be the data source name in Tableau
            tableau.submit(goConnector); // This sends the connector object to Tableau
        }).text("Get GO Actions Data!");
    });
})();
