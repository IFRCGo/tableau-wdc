(function() {
    const goConfig = window.goConfig;
    const apiUrl = goConfig.apiUrl;
    // const errorHandler = goConfig.errorHandler; // TODO: probably needed for credentials in the future
    const tableauInit = goConfig.tableauInit;
    // const getAjaxHeader = goConfig.getAjaxHeader; // TODO: probably needed for credentials in the future
    // const setCredentials = goConfig.setCredentails; // TODO: probably needed for credentials in the future

    const url = apiUrl + '/domainwhitelist/?tableau=true&${bigLimit}';

    // Create the connector object
    const goConnector = tableau.makeConnector();

    // Define the schema
    goConnector.getSchema = function(schemaCallback) {
        const cols = [{
            id: "id",
            alias: "id",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "domain_name",
            alias: "domain name",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "description",
            alias: "description",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "is_active",
            alias: "is active",
            dataType: tableau.dataTypeEnum.bool
        }];

        const tableInfo = {
            id: "domainwhitelists",
            alias: "GO DomainWhitelists Info",
            columns: cols
        };

        schemaCallback([tableInfo]);
    };

    // Init function for connector, called during every phase
    goConnector.init = tableauInit;

    // Download the data
    goConnector.getData = function(table, doneCallback) {
        const getData = function(resp) {
            const domains = resp.results;
            const tableData = domains.map(function(dom) {
                return {
                    id: dom.id,
                    domain_name: dom.domain_name,
                    description: dom.description,
                    is_active: dom.is_active
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
            tableau.connectionName = "GO DomainWhitelists"; // This will be the data source name in Tableau
            tableau.submit(goConnector); // This sends the connector object to Tableau
        }).text("Get GO DomainWhitelists Data!");
    });
})();