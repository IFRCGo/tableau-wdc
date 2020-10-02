window.goConfig = {
    apiUrl: 'https://goadmin.ifrc.org/api/v2',
    bigLimit: 'limit=199999',
    tableauInit: function(initCallback) {
        if (tableau.username && tableau.password) {
            $.post('https://goadmin.ifrc.org/get_auth_token', {
                username: tableau.username,
                password: tableau.password
            }).then(response => {
                tableau.authToken = response.token;
            }).fail(response => {
                window.goConfig.errorHandler({ err_msg: response.responseJSON.error_message });
            });
        }
        initCallback();
    },
    getToken: function() {
        $.ajax({
            dataType: "json",
            url: url,
            headers: getAjaxHeader(),
            error: errorHandler,
            success: getData
        });
    },
    getAjaxHeader: function() {
        let header = {};
        if (tableau.authToken) {
            header = {
               'Authorization': 'Token ' + tableau.authToken,
            };
        }
        return header;
    },
    setCredentials: function() {
        tableau.username = $('#username').val();
        tableau.password = $('#password').val();
    },
    errorHandler: function(error) {
        if (error.status === 401) {
            tableau.abortWithError('authentication failed');
        } else if (error.err_msg) {
            tableau.abortWithError(err_msg + ', using GO API\'s unauthenticated (public) response');
        } else {
            tableau.abortWithError('error pulling data from server');
        }
    },
};
