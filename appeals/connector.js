(function() {
    const goConfig = window.goConfig;
    const apiUrl = goConfig.apiUrl;
    const bigLimit = goConfig.bigLimit;
    const errorHandler = goConfig.errorHandler;
    const tableauInit = goConfig.tableauInit;
    const getAjaxHeader = goConfig.getAjaxHeader;
    const setCredentials = goConfig.setCredentials;

    const url = apiUrl + `/appeal/?tableau=true&${bigLimit}`;

    // Create the connector object
    const goConnector = tableau.makeConnector();

    // Define the schema
    goConnector.getSchema = function(schemaCallback) {
        const cols = [{
            id: "id",
            alias: "id",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "aid",
            alias: "aid",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "name",
            alias: "name",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "dtype",
            alias: "disaster type",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "atype",
            alias: "appeal type",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "status",
            alias: "status",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "code",
            alias: "code",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "sector",
            alias: "sector",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "num_beneficiaries",
            alias: "number of beneficiaries",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "amount_requested",
            alias: "amount requested",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "amount_funded",
            alias: "amount funded",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "start_date",
            alias: "start date",
            dataType: tableau.dataTypeEnum.datetime
        }, {
            id: "end_date",
            alias: "end date",
            dataType: tableau.dataTypeEnum.datetime
        }, {
            id: "created_at",
            alias: "created at",
            dataType: tableau.dataTypeEnum.datetime
        }, {
            id: "modified_at",
            alias: "modified at",
            dataType: tableau.dataTypeEnum.datetime
        }, {
            id: "event_id",
            alias: "emergency id",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "event_name",
            alias: "emergency name",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "needs_confirmation",
            alias: "needs confirmation",
            dataType: tableau.dataTypeEnum.bool
        }, {
            id: "country_id",
            alias: "country id",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "country_name",
            alias: "country name",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "region_id",
            alias: "region id",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "region_name",
            alias: "region name",
            dataType: tableau.dataTypeEnum.string
        }];

        const tableInfo = {
            id: "appeals",
            alias: "GO Appeals Info",
            columns: cols
        };

        schemaCallback([tableInfo]);
    };

    // Init function for connector, called during every phase
    goConnector.init = tableauInit;

    // Download the data
    goConnector.getData = function(table, doneCallback) {
        const getData = function(resp) {
            const appeals = resp.results;
            const tableData = appeals.map(function(appeal) {
                return {
                    id: appeal.id,
                    aid: appeal.aid,
                    name: appeal.name,
                    dtype: appeal.dtype ? appeal.dtype.name : null,
                    atype: appeal.atype,
                    status: appeal.status,
                    code: appeal.code,
                    sector: appeal.sector,
                    num_beneficiaries: appeal.num_beneficiaries,
                    amount_requested: appeal.amount_requested,
                    amount_funded: appeal.amount_funded,
                    start_date: appeal.start_date,
                    end_date: appeal.end_date,
                    created_at: appeal.created_at,
                    modified_at: appeal.modified_at,
                    event_id: appeal.event ? appeal.event.id : null,
                    event_name: appeal.event ? appeal.event.name : null,
                    needs_confirmation: appeal.needs_confirmation,
                    country_id: appeal.country ? appeal.country.id : null,
                    country_name: appeal.country ? appeal.country.name : null,
                    region_id: appeal.region ? appeal.region.id : null,
                    region_name: appeal.region ? appeal.region.region_name : null,
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
            tableau.connectionName = "GO Appeals"; // This will be the data source name in Tableau
            tableau.submit(goConnector); // This sends the connector object to Tableau
        }).text("Get GO Appeals Data!");
    });
})();
