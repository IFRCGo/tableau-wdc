(function() {
    const goConfig = window.goConfig;
    const apiUrl = goConfig.apiUrl;
    const bigLimit = goConfig.bigLimit;
    // const errorHandler = goConfig.errorHandler; // TODO: probably needed for credentials in the future
    const tableauInit = goConfig.tableauInit;
    // const getAjaxHeader = goConfig.getAjaxHeader; // TODO: probably needed for credentials in the future
    // const setCredentials = goConfig.setCredentails; // TODO: probably needed for credentials in the future

    const url = apiUrl + `/event/?tableau=true&${bigLimit}`;

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
            id: "summary",
            alias: "summary",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "dtype",
            alias: "disaster type",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "country_names",
            alias: "country names",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "num_affected",
            alias: "num affected",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "ifrc_severity_level",
            alias: "ifrc severity level",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "glide",
            alias: "glide",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "disaster_start_date",
            alias: "disaster start date",
            dataType: tableau.dataTypeEnum.datetime
        }, {
            id: "created_at",
            alias: "created at",
            dataType: tableau.dataTypeEnum.datetime
        }, {
            id: "auto_generated",
            alias: "auto generated",
            dataType: tableau.dataTypeEnum.bool
        }, {
            id: "appeal_ids",
            alias: "appeal ids",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "is_featured",
            alias: "is featured",
            dataType: tableau.dataTypeEnum.bool
        }, {
            id: "is_featured_region",
            alias: "is featured regionally",
            dataType: tableau.dataTypeEnum.bool
        }, {
            id: "field_report_ids",
            alias: "field report ids",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "updated_at",
            alias: "updated at",
            dataType: tableau.dataTypeEnum.datetime
        }];

        const tableInfo = {
            id: "emergencies",
            alias: "GO Emergencies Info",
            columns: cols
        };

        schemaCallback([tableInfo]);
    };

    // Init function for connector, called during every phase
    goConnector.init = tableauInit;

    // Download the data
    goConnector.getData = function(table, doneCallback) {
        const getData = function(resp) {
            const events = resp.results;
            const tableData = events.map(function(event) {
                return {
                    id: event.id,
                    name: event.name,
                    summary: event.summary,
                    dtype: event.dtype ? event.dtype.name : '',
                    country_names: event.countries.name,
                    num_affected: event.num_affected,
                    ifrc_severity_level: event.ifrc_severity_level,
                    glide: event.glide,
                    disaster_start_date: event.disaster_start_date,
                    created_at: event.created_at,
                    auto_generated: event.auto_generated,
                    appeal_ids: event.appeals.id,
                    is_featured: event.is_featured,
                    is_featured_region: event.is_featured_region,
                    field_report_ids: event.field_reports.id,
                    updated_at: event.updated_at
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
            tableau.connectionName = "GO Emergencies"; // This will be the data source name in Tableau
            tableau.submit(goConnector); // This sends the connector object to Tableau
        }).text("Get GO Emergencies Data!");
    });
})();
