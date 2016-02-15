var router = (function(state) {
    return {
        init () {
            var $artistInput = document.getElementById('artist-input');

            routie({
                'home': () => {
                    this.render('home.mst');
                },

                ':artist': (artist) => {
                    $artistInput.value = artist;

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
                    $artistInput.value = artist;

                    state.artist = artist;
                    state.detail = false;
                    state.loading = true;

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