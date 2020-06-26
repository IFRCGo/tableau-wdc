window.goConfig = {
    apiUrl: 'https://dsgocdnapi.azureedge.net/api/v2',
    tableauInit: function(initCallback) {
        initCallback();
    },
    // TODO: probably needed for credentials in the future
    // getAjaxHeader: function() {
    //     return {
    //        'Authorization': 'Basic ' + btoa(tableau.username + ":" + tableau.password),
    //     };
    // },
    // setCredentials: function() {
    //     tableau.username = $('#username').val();
    //     tableau.password = $('#password').val();
    // },
    // errorHandler: function(error) {
    //     if (error.status === 401) {
    //         tableau.abortWithError('authentication failed');
    //     } else {
    //         tableau.abortWithError('error pulling data from server');
    //     }
    // },
};
