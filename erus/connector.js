(function() {
    const goConfig = window.goConfig;
    const apiUrl = goConfig.apiUrl;
    const bigLimit = goConfig.bigLimit;
    // const errorHandler = goConfig.errorHandler; // TODO: probably needed for credentials in the future
    const tableauInit = goConfig.tableauInit;
    // const getAjaxHeader = goConfig.getAjaxHeader; // TODO: probably needed for credentials in the future
    // const setCredentials = goConfig.setCredentails; // TODO: probably needed for credentials in the future

    const url = apiUrl + `/eru/?tableau=true&${bigLimit}`;

    // Create the connector object
    const goConnector = tableau.makeConnector();

    // Define the schema
    goConnector.getSchema = function(schemaCallback) {
        const cols = [{
            id: "id",
            alias: "id",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "type",
            alias: "type",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "available",
            alias: "available",
            dataType: tableau.dataTypeEnum.bool
        }, {
            id: "units",
            alias: "units",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "equipment_units",
            alias: "equipment units",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "deployed_to_name",
            alias: "deployed to name",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "deployed_to_society_name",
            alias: "deployed to society name",
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
            id: "eru_owner_created_at",
            alias: "eru owner created at",
            dataType: tableau.dataTypeEnum.datetime
        }, {
            id: "eru_owner_updated_at",
            alias: "eru owner updated at",
            dataType: tableau.dataTypeEnum.datetime
        }, {
            id: "eru_owner_ns_country",
            alias: "eru owner ns country",
            dataType: tableau.dataTypeEnum.string
        }];

        const tableInfo = {
            id: "erus",
            alias: "GO ERUs Info",
            columns: cols
        };

        schemaCallback([tableInfo]);
    };

    // Init function for connector, called during every phase
    goConnector.init = tableauInit;

    // Download the data
    goConnector.getData = function(table, doneCallback) {
        const getData = function(resp) {
            const erus = resp.results;
            const tableData = erus.map(function(eru) {
                return {
                    id: eru.id,
                    type: eru.type,
                    available: eru.available,
                    units: eru.units,
                    equipment_units: eru.equipment_units,
                    deployed_to_name: eru.deployed_to ? eru.deployed_to.name : null,
                    deployed_to_society_name: eru.deployed_to ? eru.deployed_to.society_name : null,
                    event_id: eru.event ? eru.event.id : null,
                    event_name: eru.event ? eru.event.name : null,
                    eru_owner_created_at: eru.eru_owner ? eru.eru_owner.created_at : null,
                    eru_owner_updated_at: eru.eru_owner ? eru.eru_owner.updated_at : null,
                    eru_owner_ns_country: eru.eru_owner
                        ? (eru.eru_owner.national_society_country ? eru.eru_owner.national_society_country.name : null)
                        : null
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
            tableau.connectionName = "GO ERUs"; // This will be the data source name in Tableau
            tableau.submit(goConnector); // This sends the connector object to Tableau
        }).text("Get GO ERUs Data!");
    });
})();
