var router = (function(state) {
    return {
        init () {
            var $artistInput = document.getElementById('artist-input');
            var $header = document.getElementsByClassName('header')[0];

            routie({
                'home': () => {
                    $header.classList.remove('nothome');
                    $artistInput.focus();

                    if ($app) {
                        $app.innerHTML = '';
                    }
                },

                ':artist': (artist) => {
                    $header.classList.add('nothome');
                    $artistInput.value = artist;
                    $artistInput.blur();

                    state.artist = artist;
                    state.artists = [];
                    state.loading = true;

                    this.render('artist.mst');

                    var self = this;
                    fetch(`https://ws.audioscrobbler.com/2.0/?api_key=9112859bf77f54259252dc9bc48a8cb9&method=artist.getSimilar&format=json&limit=12&autocorrect=1&artist=${artist}`)
                        .then(response => response.json())
                        .then(artists => {
                            artists = artists.similarartists.artist;
                            artists = _.shuffle(artists);

                            state.artists = artists;
                            state.loading = false;

                            self.render('artist.mst');
                        });
                },

                'detail/:artist': (artist) => {
                    $header.classList.add('nothome');
                    $artistInput.value = artist;
                    $artistInput.blur();

                    state.artist = artist;
                    state.detail = false;
                    state.loading = true;
                    state.trackList = false;

                    this.render('detail.mst');

                    var self = this;
                    fetch(`https://ws.audioscrobbler.com/2.0/?api_key=9112859bf77f54259252dc9bc48a8cb9&method=artist.getInfo&format=json&autocorrect=1&artist=${artist}`)
                        .then(response => response.json())
                        .then(detail => {
                            detail = detail.artist;

                            state.artist = artist;
                            state.detail = detail;
                            state.loading = false;

                            self.render('detail.mst');

                            fetch(`https://api.spotify.com/v1/search?type=artist&limit=1&q=${artist}`)
                                .then(response => response.json())
                                .then(data => {
                                    var id = data.artists.items[0].id;

                                    fetch(`https://api.spotify.com/v1/artists/${id}/top-tracks?country=US`)
                                        .then(response => response.json())
                                        .then(data => {
                                            var tracks = data.tracks;
                                            var trackList = tracks.reduce(function(prev, current) {
                                                return prev + ',' + current.id
                                            }, '').substring(1);

                                            state.trackList = trackList;

                                            self.render('detail.mst');
                                        });
                                });
                        });
                }
            });
        },

        render (filename) {
            var $app = document.getElementById('app');
            var path = 'static/templates/' + filename;

            fetch(path).then(response => {
                return response.text();
            }).then(template => {
                $app.innerHTML = Mustache.render(template, state);
            });
        }
    }
}(state));