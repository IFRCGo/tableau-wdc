(function() {
    const goConfig = window.goConfig;
    const apiUrl = goConfig.apiUrl;
    const bigLimit = goConfig.bigLimit;
    // const errorHandler = goConfig.errorHandler; // TODO: probably needed for credentials in the future
    const tableauInit = goConfig.tableauInit;
    // const getAjaxHeader = goConfig.getAjaxHeader; // TODO: probably needed for credentials in the future
    // const setCredentials = goConfig.setCredentails; // TODO: probably needed for credentials in the future

    const url = apiUrl + `/field_report/?tableau=true&${bigLimit}`;

    // Create the connector object
    const goConnector = tableau.makeConnector();

    // Define the schema
    goConnector.getSchema = function(schemaCallback) {
        const cols = [{
            id: "id",
            alias: "id",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "summary",
            alias: "summary",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "dtype",
            alias: "disaster type",
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
            id: "district_ids",
            alias: "district ids",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "district_names",
            alias: "district names",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "region_ids",
            alias: "region ids",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "region_names",
            alias: "region names",
            dataType: tableau.dataTypeEnum.string
        }
        //, {
        //    id: "actions_taken",
        //    alias: "actions taken",
        //    dataType: tableau.dataTypeEnum.string
        //}
        , {
            id: "is_covid_report",
            alias: "is covid report",
            dataType: tableau.dataTypeEnum.bool
        }, {
            id: "rid",
            alias: "rid",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "description",
            alias: "description",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "status",
            alias: "status",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "request_assistance",
            alias: "request assistance",
            dataType: tableau.dataTypeEnum.bool
        }, {
            id: "ns_request_assistance",
            alias: "ns request assistance",
            dataType: tableau.dataTypeEnum.bool
        }, {
            id: "num_injured",
            alias: "num injured",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "num_dead",
            alias: "num dead",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "num_missing",
            alias: "num missing",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "num_affected",
            alias: "num affected",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "num_displaced",
            alias: "num displaced",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "num_assisted",
            alias: "num assisted",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "num_localstaff",
            alias: "num localstaff",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "num_volunteers",
            alias: "num volunteers",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "num_expats_delegates",
            alias: "num expats delegates",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "num_potentially_affected",
            alias: "num potentially affected",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "num_highest_risk",
            alias: "num highest risk",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "affected_pop_centres",
            alias: "affected pop centres",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "gov_num_injured",
            alias: "government num injured",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "gov_num_dead",
            alias: "government num dead",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "gov_num_missing",
            alias: "government num missing",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "gov_num_affected",
            alias: "government num affected",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "gov_num_displaced",
            alias: "government num displaced",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "gov_num_assisted",
            alias: "government num assisted",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "gov_num_potentially_affected",
            alias: "government num potentially affected",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "gov_num_highest_risk",
            alias: "government num highest risk",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "gov_affected_pop_centres",
            alias: "government affected pop centres",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "other_num_injured",
            alias: "other num injured",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "other_num_dead",
            alias: "other num dead",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "other_num_missing",
            alias: "other num missing",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "other_num_affected",
            alias: "other num affected",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "other_num_displaced",
            alias: "other num displaced",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "other_num_assisted",
            alias: "other num assisted",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "other_num_potentially_affected",
            alias: "other num potentially affected",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "other_num_highest_risk",
            alias: "other num highest risk",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "other_affected_pop_centres",
            alias: "other affected pop centres",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "epi_cases",
            alias: "epi cases",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "epi_suspected_cases",
            alias: "epi suspected cases",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "epi_probable_cases",
            alias: "epi probable cases",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "epi_confirmed_cases",
            alias: "epi confirmed cases",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "epi_num_dead",
            alias: "epi num dead",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "epi_figures_source",
            alias: "epi figures source",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "sit_fields_date",
            alias: "sit fields date",
            dataType: tableau.dataTypeEnum.datetime
        }, {
            id: "epi_figures_source",
            alias: "epi figures source",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "other_sources",
            alias: "other sources",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "actions_others",
            alias: "actions others",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "visibility",
            alias: "visibility",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "bulletin",
            alias: "bulletin",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "dref",
            alias: "dref",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "dref_amount",
            alias: "dref amount",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "appeal",
            alias: "appeal",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "appeal_amount",
            alias: "appeal amount",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "imminent_dref",
            alias: "imminent dref",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "imminent_dref_amount",
            alias: "imminent dref amount",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "forecast_based_action",
            alias: "forecast based action",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "forecast_based_action_amount",
            alias: "forecast based action amount",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "rdrt",
            alias: "rdrt",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "num_rdrt",
            alias: "num rdrt",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "fact",
            alias: "fact",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "num_fact",
            alias: "num fact",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "ifrc_staff",
            alias: "ifrc staff",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "num_ifrc_staff",
            alias: "num ifrc staff",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "eru_base_camp",
            alias: "eru base camp",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "eru_base_camp_units",
            alias: "eru base camp units",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "eru_basic_health_care",
            alias: "eru basic health care",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "eru_basic_health_care_units",
            alias: "eru basic healthc are units",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "eru_it_telecom",
            alias: "eru it telecom",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "eru_it_telecom_units",
            alias: "eru it telecom units",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "eru_logistics",
            alias: "eru logistics",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "eru_logistics_units",
            alias: "eru logistics units",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "eru_deployment_hospital",
            alias: "eru deployment hospital",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "eru_deployment_hospital_units",
            alias: "eru deployment hospital units",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "eru_referral_hospital",
            alias: "eru referral hospital",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "eru_referral_hospital_units",
            alias: "eru referral hospital units",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "eru_relief",
            alias: "eru relief",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "eru_relief_units",
            alias: "eru relief units",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "eru_water_sanitation_15",
            alias: "eru water sanitation 15",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "eru_water_sanitation_15_units",
            alias: "eru water sanitation 15 units",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "eru_water_sanitation_40",
            alias: "eru water sanitation 40",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "eru_water_sanitation_40_units",
            alias: "eru water sanitation 40 units",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "eru_water_sanitation_20",
            alias: "eru water sanitation 20",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "eru_water_sanitation_20_units",
            alias: "eru water sanitation 20 units",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "start_date",
            alias: " start date",
            dataType: tableau.dataTypeEnum.datetime
        }, {
            id: "report_date",
            alias: "report date",
            dataType: tableau.dataTypeEnum.datetime
        }, {
            id: "created_at",
            alias: "created at",
            dataType: tableau.dataTypeEnum.datetime
        }, {
            id: "updated_at",
            alias: "updated at",
            dataType: tableau.dataTypeEnum.datetime
        }, {
            id: "previous_update",
            alias: "previous update",
            dataType: tableau.dataTypeEnum.datetime
        }];

        const tableInfo = {
            id: "field_reports",
            alias: "GO Field Reports Info",
            columns: cols
        };
        console.log(tableInfo);

        schemaCallback([tableInfo]);
    };

    // Init function for connector, called during every phase
    goConnector.init = tableauInit;

    // Download the data
    goConnector.getData = function(table, doneCallback) {
        const getData = function(resp) {
            const reports = resp.results;
            const tableData = reports.map(function(fr) {
                return {
                    id: fr.id,
                    summary: fr.summary,
                    dtype: fr.dtype ? fr.dtype.name : null,
                    event_id: fr.event ? fr.event.id : null,
                    event_name: fr.event ? fr.event.name : null,
                    district_ids: fr.districts.id,
                    district_names: fr.districts.name,
                    region_ids: fr.regions.id,
                    region_names: fr.regions.region_name,
                    is_covid_report: fr.is_covid_report,
                    rid: fr.rid,
                    description: fr.description,
                    status: fr.status,
                    request_assistance: fr.request_assistance,
                    ns_request_assistance: fr.ns_request_assistance,
                    num_injured: fr.num_injured,
                    num_dead: fr.num_dead,
                    num_missing: fr.num_missing,
                    num_affected: fr.num_affected,
                    num_displaced: fr.num_displaced,
                    num_assisted: fr.num_assisted,
                    num_localstaff: fr.num_localstaff,
                    num_volunteers: fr.num_volunteers,
                    num_expats_delegates: fr.num_expats_delegates,
                    num_potentially_affected: fr.num_potentially_affected,
                    num_highest_risk: fr.num_highest_risk,
                    affected_pop_centres: fr.affected_pop_centres,
                    gov_num_injured: fr.gov_num_injured,
                    gov_num_dead: fr.gov_num_dead,
                    gov_num_missing: fr.gov_num_missing,
                    gov_num_affected: fr.gov_num_affected,
                    gov_num_displaced: fr.gov_num_displaced,
                    gov_num_assisted: fr.gov_num_assisted,
                    epi_cases: fr.epi_cases,
                    epi_suspected_cases: fr.epi_suspected_cases,
                    epi_probable_cases: fr.epi_probable_cases,
                    epi_confirmed_cases: fr.epi_confirmed_cases,
                    epi_num_dead: fr.epi_num_dead,
                    epi_figures_source: fr.epi_figures_source,
                    health_min_cases: fr.health_min_cases,
                    health_min_suspected_cases: fr.health_min_suspected_cases,
                    health_min_probable_cases: fr.health_min_probable_cases,
                    health_min_confirmed_cases: fr.health_min_confirmed_cases,
                    health_min_num_dead: fr.health_min_num_dead,
                    who_cases: fr.who_cases,
                    who_suspected_cases: fr.who_suspected_cases,
                    who_probable_cases: fr.who_probable_cases,
                    who_confirmed_cases: fr.who_confirmed_cases,
                    who_num_dead: fr.who_num_dead,
                    other_cases: fr.other_cases,
                    other_suspected_cases: fr.other_suspected_cases,
                    other_probable_cases: fr.other_probable_cases,
                    other_confirmed_cases: fr.other_confirmed_cases,
                    who_num_assisted: fr.who_num_assisted,
                    health_min_num_assisted: fr.health_min_num_assisted,
                    gov_num_potentially_affected: fr.gov_num_potentially_affected,
                    gov_num_highest_risk: fr.gov_num_highest_risk,
                    gov_affected_pop_centres: fr.gov_affected_pop_centres,
                    other_num_injured: fr.other_num_injured,
                    other_num_dead: fr.other_num_dead,
                    other_num_missing: fr.other_num_missing,
                    other_num_affected: fr.other_num_affected,
                    other_num_displaced: fr.other_num_displaced,
                    other_num_assisted: fr.other_num_assisted,
                    other_num_potentially_affected: fr.other_num_potentially_affected,
                    other_num_highest_risk: fr.other_num_highest_risk,
                    other_affected_pop_centres: fr.other_affected_pop_centres,
                    cases: fr.cases,
                    suspected_cases: fr.suspected_cases,
                    probable_cases: fr.probable_cases,
                    confirmed_cases: fr.confirmed_cases,
                    sit_fields_date: fr.sit_fields_date,
                    other_sources: fr.other_sources,
                    actions_others: fr.actions_others,
                    visibility: fr.visibility,
                    bulletin: fr.bulletin,
                    dref: fr.dref,
                    dref_amount: fr.dref_amount,
                    appeal: fr.appeal,
                    appeal_amount: fr.appeal_amount,
                    imminent_dref: fr.imminent_dref,
                    imminent_dref_amount: fr.imminent_dref_amount,
                    forecast_based_action: fr.forecast_based_action,
                    forecast_based_action_amount: fr.forecast_based_action_amount,
                    rdrt: fr.rdrt,
                    num_rdrt: fr.num_rdrt,
                    fact: fr.fact,
                    num_fact: fr.num_fact,
                    ifrc_staff: fr.ifrc_staff,
                    num_ifrc_staff: fr.num_ifrc_staff,
                    eru_base_camp: fr.eru_base_camp,
                    eru_base_camp_units: fr.eru_base_camp_units,
                    eru_basic_health_care: fr.eru_basic_health_care,
                    eru_basic_health_care_units: fr.eru_basic_health_care_units,
                    eru_it_telecom: fr.eru_it_telecom,
                    eru_it_telecom_units: fr.eru_it_telecom_units,
                    eru_logistics: fr.eru_logistics,
                    eru_logistics_units: fr.eru_logistics_units,
                    eru_deployment_hospital: fr.eru_deployment_hospital,
                    eru_deployment_hospital_units: fr.eru_deployment_hospital_units,
                    eru_referral_hospital: fr.eru_referral_hospital,
                    eru_referral_hospital_units: fr.eru_referral_hospital_units,
                    eru_relief: fr.eru_relief,
                    eru_relief_units: fr.eru_relief_units,
                    eru_water_sanitation_15: fr.eru_water_sanitation_15,
                    eru_water_sanitation_15_units: fr.eru_water_sanitation_15_units,
                    eru_water_sanitation_40: fr.eru_water_sanitation_40,
                    eru_water_sanitation_40_units: fr.eru_water_sanitation_40_units,
                    eru_water_sanitation_20: fr.eru_water_sanitation_20,
                    eru_water_sanitation_20_units: fr.eru_water_sanitation_20_units,
                    start_date: fr.start_date,
                    report_date: fr.report_date,
                    created_at: fr.created_at,
                    updated_at: fr.updated_at,
                    previous_update: fr.previous_update
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
            tableau.connectionName = "GO Field Reports"; // This will be the data source name in Tableau
            tableau.submit(goConnector); // This sends the connector object to Tableau
        }).text("Get GO Field Reports Data!");
    });
})();
