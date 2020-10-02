(function() {
    const goConfig = window.goConfig;
    const apiUrl = goConfig.apiUrl;
    const errorHandler = goConfig.errorHandler;
    const tableauInit = goConfig.tableauInit;
    const getAjaxHeader = goConfig.getAjaxHeader;
    const setCredentials = goConfig.setCredentials;

    const url = apiUrl + '/perworkplan/?tableau=true&${bigLimit}';

    // Create the connector object
    const goConnector = tableau.makeConnector();

    // Define the schema
    goConnector.getSchema = function(schemaCallback) {
        const cols = [{
            id: "id",
            alias: "id",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "user_id",
            alias: "user id",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "prioritization",
            alias: "prioritization",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "components",
            alias: "components",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "benchmark",
            alias: "benchmark",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "actions",
            alias: "actions",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "comments",
            alias: "comments",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "timeline",
            alias: "timeline",
            dataType: tableau.dataTypeEnum.datetime
        }, {
            id: "status",
            alias: "status",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "support_required",
            alias: "support required",
            dataType: tableau.dataTypeEnum.bool
        }, {
            id: "focal_point",
            alias: "focal point",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "code",
            alias: "code",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "question_id",
            alias: "question id",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "country_id",
            alias: "country id",
            dataType: tableau.dataTypeEnum.int
        }];

        const tableInfo = {
            id: "perworkplans",
            alias: "GO PERWorkPlans Info",
            columns: cols
        };

        schemaCallback([tableInfo]);
    };

    // Init function for connector, called during every phase
    goConnector.init = tableauInit;

    // Download the data
    goConnector.getData = function(table, doneCallback) {
        const getData = function(resp) {
            const perworkplans = resp.results;
            const tableData = perworkplans.map(function(pwp) {
                return {
                    id: pwp.id,
                    user_id: pwp.user ? pwp.user.id : null,
                    prioritization: pwp.prioritization,
                    components: pwp.components,
                    benchmark: pwp.benchmark,
                    actions: pwp.actions,
                    comments: pwp.comments,
                    timeline: pwp.timeline,
                    status: pwp.status,
                    support_required: pwp.support_required,
                    focal_point: pwp.focal_point,
                    code: pwp.code,
                    question_id: pwp.question_id,
                    country_id: pwp.country
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
            tableau.connectionName = "GO PERWorkPlans"; // This will be the data source name in Tableau
            tableau.submit(goConnector); // This sends the connector object to Tableau
        }).text("Get GO PERWorkPlans Data!");
    });
})();
