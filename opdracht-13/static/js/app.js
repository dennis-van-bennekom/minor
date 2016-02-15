(function () {
    'use strict';

    var $app = document.getElementById('app');
    var $artistInput = document.getElementById('artist-input');

    var state = {
        artist: '',
        artists: [],
        detail: false,
        loading: false
    }

    var app = {
        init () {
            routes.init();
            events.init();

            if (window.location.hash === '') {
                // Start with the home view
                window.location.hash = 'home';
            }
        }
    };

    var routes = {
        init () {
            routie({
                'home': () => {
                    views.render('home.mst');
                },

                ':artist': (artist) => {
                    $artistInput.value = artist;

                    state.artist = artist;
                    state.loading = true;

                    views.render('artist.mst');

                    fetch(`https://ws.audioscrobbler.com/2.0/?api_key=9112859bf77f54259252dc9bc48a8cb9&method=artist.getSimilar&format=json&limit=12&autocorrect=1&artist=${artist}`)
                        .then(response => response.json())
                        .then(artists => {
                            artists = artists.similarartists.artist;
                            artists = _.sortBy(artists, 'name');

                            state.artists = artists;
                            state.loading = false;

                            views.render('artist.mst');
                        });
                },

                'detail/:artist': (artist) => {
                    $artistInput.value = artist;

                    state.artist = artist;
                    state.detail = false;
                    state.loading = true;

                    views.render('detail.mst');

                    fetch(`https://ws.audioscrobbler.com/2.0/?api_key=9112859bf77f54259252dc9bc48a8cb9&method=artist.getInfo&format=json&autocorrect=1&artist=${artist}`)
                        .then(response => response.json())
                        .then(detail => {
                            detail = detail.artist;

                            state.artist = artist;
                            state.detail = detail;
                            state.loading = false;

                            views.render('detail.mst');
                        });
                }
            });
        }
    };

    var views = {
        render (filename) {
            var path = 'static/templates/' + filename;

            fetch(path).then(response => {
                return response.text();
            }).then(template => {
                $app.innerHTML = Mustache.render(template, state);
            });
        }
    };

    var events = {
        init () {
            // Search
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
                        routie(artist);
                    }
                }
            }, false);
        }
    };

    app.init();
}());
