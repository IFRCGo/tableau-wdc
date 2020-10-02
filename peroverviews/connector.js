(function() {
    const goConfig = window.goConfig;
    const apiUrl = goConfig.apiUrl;
    const errorHandler = goConfig.errorHandler;
    const tableauInit = goConfig.tableauInit;
    const getAjaxHeader = goConfig.getAjaxHeader;
    const setCredentials = goConfig.setCredentials;

    const url = apiUrl + '/peroverview/?tableau=true&${bigLimit}';

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
            id: "country_name",
            alias: "country name",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "date_of_current_capacity_assessment",
            alias: "date of current capacity assessment",
            dataType: tableau.dataTypeEnum.datetime
        }, {
            id: "type_of_capacity_assessment",
            alias: "type of capacity assessment",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "date_of_last_capacity_assessment",
            alias: "date of last capacity assessment",
            dataType: tableau.dataTypeEnum.datetime
        }, {
            id: "type_of_last_capacity_assessment",
            alias: "type of last capacity assessment",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "branch_involved",
            alias: "branch involved",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "focal_point_name",
            alias: "focal point name",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "focal_point_email",
            alias: "focal point email",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "had_previous_assessment",
            alias: "had previous assessment",
            dataType: tableau.dataTypeEnum.bool
        }, {
            id: "focus",
            alias: "focus",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "facilitated_by",
            alias: "facilitated by",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "facilitator_email",
            alias: "facilitator email",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "phone_number",
            alias: "phone number",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "skype_address",
            alias: "skype address",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "date_of_mid_term_review",
            alias: "date of mid term review",
            dataType: tableau.dataTypeEnum.datetime
        }, {
            id: "approximate_date_next_capacity_assmt",
            alias: "approximate date next capacity assmt",
            dataType: tableau.dataTypeEnum.datetime
        }];

        const tableInfo = {
            id: "peroverviews",
            alias: "GO PEROverviews Info",
            columns: cols
        };

        schemaCallback([tableInfo]);
    };

    // Init function for connector, called during every phase
    goConnector.init = tableauInit;

    // Download the data
    goConnector.getData = function(table, doneCallback) {
        const getData = function(resp) {
            const peroverviews = resp.results;
            const tableData = peroverviews.map(function(po) {
                return {
                    id: po.id,
                    user_id: po.user ? po.user.id : null,
                    country_name: po.country ? po.country.name : null,
                    date_of_current_capacity_assessment: po.date_of_current_capacity_assessment,
                    type_of_capacity_assessment: po.type_of_capacity_assessment,
                    date_of_last_capacity_assessment: po.date_of_last_capacity_assessment,
                    type_of_last_capacity_assessment: po.type_of_last_capacity_assessment,
                    branch_involved: po.branch_involved,
                    focal_point_name: po.focal_point_name,
                    focal_point_email: po.focal_point_email,
                    had_previous_assessment: po.had_previous_assessment,
                    focus: po.focus,
                    facilitated_by: po.facilitated_by,
                    facilitator_email: po.facilitator_email,
                    phone_number: po.phone_number,
                    skype_address: po.skype_address,
                    date_of_mid_term_review: po.date_of_mid_term_review,
                    approximate_date_next_capacity_assmt: po.approximate_date_next_capacity_assmt
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
            tableau.connectionName = "GO PEROverviews"; // This will be the data source name in Tableau
            tableau.submit(goConnector); // This sends the connector object to Tableau
        }).text("Get GO PEROverviews Data!");
    });
})();
