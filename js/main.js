Koi.namespace('game');
Koi.namespace('Game');

window.game = {
    templates: {},
    dom: {},
    main: false,
    interface: false,
    patterns: false,
    dice: false,
    players: [false, false]
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
    game.dice = new Game.dice();
    game.main = new Game.main();
    game.players[0] = new Game.player();
    game.players[1] = new Game.player();
});
