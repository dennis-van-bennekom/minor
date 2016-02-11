(function () {
    'use strict';

    var $app = document.getElementById('app');
    var $artistInput = document.getElementById('artist-input');

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

                    var data = {
                        artist: artist,
                        loading: true
                    };

                    views.render('artist.mst', data);

                    fetch(`https://ws.audioscrobbler.com/2.0/?api_key=9112859bf77f54259252dc9bc48a8cb9&method=artist.getSimilar&format=json&limit=12&autocorrect=1&artist=${artist}`)
                        .then(response => response.json())
                        .then(artists => {
                            artists = artists.similarartists.artist;
                            artists = _.sortBy(artists, 'name');

                            data = {
                                artist: artist,
                                artists: artists,
                                loading: false
                            };

                            views.render('artist.mst', data);
                        });
                },

                'detail/:artist': (artist) => {
                    $artistInput.value = artist;

                    var data = {
                        artist: artist,
                        detail: false,
                        loading: true
                    };

                    views.render('detail.mst', data);

                    fetch(`https://ws.audioscrobbler.com/2.0/?api_key=9112859bf77f54259252dc9bc48a8cb9&method=artist.getInfo&format=json&autocorrect=1&artist=${artist}`)
                        .then(response => response.json())
                        .then(detail => {
                            detail = detail.artist;

                            console.log(detail);

                            data = {
                                artist: artist,
                                detail: detail,
                                loading: false
                            }

                            views.render('detail.mst', data);
                        });
                }
            });
        }
    };

    var views = {
        render (filename, data) {
            var path = 'static/templates/' + filename;
            data = data || {};

            fetch(path).then(response => {
                return response.text();
            }).then(template => {
                $app.innerHTML = Mustache.render(template, data);
            });
        }
    };

    var events = {
        init () {
            var searchForm = document.querySelector('.search-form');
            searchForm.addEventListener('submit', event => {
                event.preventDefault();

                var artist = event.target.elements.artist.value;
                routie(artist);
            });
        }
    };

    app.init();
}());
