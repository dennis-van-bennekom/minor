(function (router, events) {
    'use strict';

    var app = {
        init () {
            events.init();
            router.init();

            if (window.location.hash === '') {
                // Start with the home view
                window.location.hash = 'home';
            }
        }
    };

    app.init();
}(router, events));
