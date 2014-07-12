Koi.namespace('game');
Koi.namespace('Game');

window.game = {
    templates: {},
    dom: {},
    main: false,
    interface: false,
    patterns: false
};

Game.main = Koi.define({
    init: function() {
        this.load_player();
    },

    load_player: function() {
        game.interface.display_pattern(game.patterns.fetch());
    }
});

$(document).ready(function() {
    game.interface = new Game.interface();
    game.patterns = new Game.patterns();
    game.main = new Game.main();
});
