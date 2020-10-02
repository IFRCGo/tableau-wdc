(function() {
    const goConfig = window.goConfig;
    const apiUrl = goConfig.apiUrl;
    const errorHandler = goConfig.errorHandler;
    const tableauInit = goConfig.tableauInit;
    const getAjaxHeader = goConfig.getAjaxHeader;
    const setCredentials = goConfig.setCredentials;

    const url = apiUrl + '/project/?tableau=true&${bigLimit}';

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
            id: "country_name",
            alias: "country name",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "district_name",
            alias: "district name",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "reporting_ns_name",
            alias: "reporting ns name",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "dtype",
            alias: "disaster type",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "event_name",
            alias: "event_name",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "primary_sector_display",
            alias: "primary sector display",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "programme_type_display",
            alias: "programme type display",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "operation_type_display",
            alias: "operation type display",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "status_display",
            alias: "status display",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "secondary_sectors_display",
            alias: "secondary sectors display",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "modified_at",
            alias: "modified at",
            dataType: tableau.dataTypeEnum.datetime
        }, {
            id: "start_date",
            alias: "start date",
            dataType: tableau.dataTypeEnum.date
        }, {
            id: "end_date",
            alias: "end date",
            dataType: tableau.dataTypeEnum.date
        }, {
            id: "budget_amount",
            alias: "budget amount",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "actual_expenditure",
            alias: "actual expenditure",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "target_male",
            alias: "target male",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "target_female",
            alias: "target female",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "target_other",
            alias: "target other",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "target_total",
            alias: "target total",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "reached_male",
            alias: "reached male",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "reached_female",
            alias: "reached female",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "reached_other",
            alias: "reached other",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "reached_total",
            alias: "reached total",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "visibility",
            alias: "visibility",
            dataType: tableau.dataTypeEnum.string
        }];

        const tableInfo = {
            id: "projects",
            alias: "GO Projects Info",
            columns: cols
        };

        schemaCallback([tableInfo]);
    };

    // Init function for connector, called during every phase
    goConnector.init = tableauInit;

    // Download the data
    goConnector.getData = function(table, doneCallback) {
        const getData = function(resp) {
            const projects = resp.results;
            const tableData = projects.map(function(proj) {
                return {
                    id: proj.id,
                    name: proj.name,
                    country_name: proj.project_country_detail ? proj.project_country_detail.name : null,
                    district_name: proj.project_districts_detail
                        ? proj.project_districts_detail.map((dist) => dist.name).join(", ")
                        : null,
                    reporting_ns_name: proj.reporting_ns_detail ? proj.reporting_ns_detail.name : null,
                    dtype: proj.dtype_detail ? proj.dtype_detail.name : null,
                    event_name: proj.event_detail ? proj.event_detail.name : null,
                    primary_sector_display: proj.primary_sector_display,
                    programme_type_display: proj.programme_type_display,
                    operation_type_display: proj.operation_type_display,
                    status_display: proj.status_display,
                    secondary_sectors_display: proj.secondary_sectors_display,
                    modified_at: proj.modified_at,
                    start_date: proj.start_date,
                    end_date: proj.end_date,
                    budget_amount: proj.budget_amount,
                    actual_expenditure: proj.actual_expenditure,
                    target_male: proj.target_male,
                    target_female: proj.target_female,
                    target_other: proj.target_other,
                    target_total: proj.target_total,
                    reached_male: proj.reached_male,
                    reached_female: proj.reached_female,
                    reached_other: proj.reached_other,
                    reached_total: proj.reached_total,
                    visibility: proj.visibility
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
            tableau.connectionName = "GO Projects"; // This will be the data source name in Tableau
            tableau.submit(goConnector); // This sends the connector object to Tableau
        }).text("Get GO Projects Data!");
    });
})();
