var events = (function() {
    var init = function () {
        var searchForm = document.querySelector('.search-form');
        searchForm.addEventListener('submit', event => {
            event.preventDefault();

            var artist = event.target.elements.artist.value;
            routie(artist);
        });

        // Shake gesture
        window.addEventListener('devicemotion', event => {
            if (event.acceleration.x > 5 ||
                event.acceleration.y > 5 ||
                event.acceleration.z > 5) {
                if (!state.loading && state.artists.length > 0) {
                    var artist = state.artists[_.random(state.artists.length)];
                    routie(artist.name);
                }
            }
        }, false);
    }

    return {
        init: init
    };
}());