(function() {
    const goConfig = window.goConfig;
    const apiUrl = goConfig.apiUrl;
    const errorHandler = goConfig.errorHandler;
    const tableauInit = goConfig.tableauInit;
    const getAjaxHeader = goConfig.getAjaxHeader;
    const setCredentials = goConfig.setCredentials;

    const url = apiUrl + '/partner_deployment/?tableau=true&${bigLimit}';

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
            id: "role",
            alias: "role",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "activity",
            alias: "activity",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "start_date",
            alias: "start date",
            dataType: tableau.dataTypeEnum.datetime
        }, {
            id: "end_date",
            alias: "end date",
            dataType: tableau.dataTypeEnum.datetime
        }, {
            id: "parent_society",
            alias: "parent society",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "country_deployed_to",
            alias: "country deployed to",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "districts_deployed_to",
            alias: "districts deployed to",
            dataType: tableau.dataTypeEnum.string
        }];

        const tableInfo = {
            id: "partner_deployments",
            alias: "GO Partner Deployments Info",
            columns: cols
        };

        schemaCallback([tableInfo]);
    };

    // Init function for connector, called during every phase
    goConnector.init = tableauInit;

    // Download the data
    goConnector.getData = function(table, doneCallback) {
        const getData = function(resp) {
            const partnerDeployments = resp.results;
            const tableData = partnerDeployments.map(function(pd) {
                return {
                    id: pd.id,
                    name: pd.name,
                    role: pd.role,
                    activity: pd.activity ? pd.activity.activity : null,
                    start_date: pd.start_date,
                    end_date: pd.end_date,
                    parent_society: pd.parent_society ? pd.parent_society.name : null,
                    country_deployed_to: pd.country_deployed_to ? pd.country_deployed_to.name : null,
                    districts_deployed_to: pd.district_deployed_to.name
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
            tableau.connectionName = "GO Partner Deployments"; // This will be the data source name in Tableau
            tableau.submit(goConnector); // This sends the connector object to Tableau
        }).text("Get GO Partner Deployments Data!");
    });
})();
