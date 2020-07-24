(function() {
    const goConfig = window.goConfig;
    const apiUrl = goConfig.apiUrl;
    const bigLimit = goConfig.bigLimit;
    // const errorHandler = goConfig.errorHandler; // TODO: probably needed for credentials in the future
    const tableauInit = goConfig.tableauInit;
    // const getAjaxHeader = goConfig.getAjaxHeader; // TODO: probably needed for credentials in the future
    // const setCredentials = goConfig.setCredentails; // TODO: probably needed for credentials in the future

    const url = apiUrl + `/country/?tableau=true&${bigLimit}`;

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
            id: "iso",
            alias: "iso",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "iso3",
            alias: "iso3",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "society_name",
            alias: "society name",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "society_url",
            alias: "society url",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "url_ifrc",
            alias: "url ifrc",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "region_id",
            alias: "region id",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "region_name",
            alias: "region name",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "overview",
            alias: "overview",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "key_priorities",
            alias: "key priorities",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "inform_score",
            alias: "inform score",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "wb_population",
            alias: "wb population",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "wb_year",
            alias: "wb year",
            dataType: tableau.dataTypeEnum.string
        }];

        const tableInfo = {
            id: "countries",
            alias: "GO Countries Info",
            columns: cols
        };

        schemaCallback([tableInfo]);
    };

    // Init function for connector, called during every phase
    goConnector.init = tableauInit;

    // Download the data
    goConnector.getData = function(table, doneCallback) {
        const getData = function(resp) {
            const countries = resp.results;
            const tableData = countries.map(function(country) {
                return {
                    id: country.id,
                    name: country.name,
                    iso: country.iso,
                    iso3: country.iso3,
                    society_name: country.society_name,
                    society_url: country.society_url,
                    url_ifrc: country.url_ifrc,
                    region_id: country.region?.id,
                    region_name: country.region?.region_name,
                    overview: country.overview,
                    key_priorities: country.key_priorities,
                    inform_score: country.inform_score,
                    wb_population: country.wb_population,
                    wb_year: country.wb_year
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
            tableau.connectionName = "GO Countries"; // This will be the data source name in Tableau
            tableau.submit(goConnector); // This sends the connector object to Tableau
        }).text("Get GO Countries Data!");
    });
})();
