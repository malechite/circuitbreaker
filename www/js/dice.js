Koi.namespace('game');
Koi.namespace('Game');

Game.dice = Koi.define({

    actions: [1,2,3,4,5,6],
    pieces: ['blue', 'orange', 'purple', 'green', 'yellow', 'blocker'],
    chances: [2,2,1,1,1,0],

    result: function(dice) {
        return dice[Math.floor(Math.random() * dice.length)];
    },

    roll: function() {
        var piece_a = this.result(this.pieces);
        var piece_b = this.result(this.pieces);
        var chances = this.result(this.chances);
        var options = [];

        switch(chances) {
            case 0:
                options = false;
                break;
            case 1:
                if(piece_a == piece_b) {
                    options = [[piece_a]];
                } else {
                    options = [[piece_a], [piece_b]];
                }
                break;
            case 2:
                if(piece_a == piece_b) {
                    options = [[piece_a, piece_a]];
                } else {
                    options = [
                        [piece_a, piece_a],
                        [piece_a, piece_b],
                        [piece_b, piece_b]
                    ];
                }
                break;
        }

        game.interface.display_roll_results({
            actions: this.result(this.actions),
            piece_a: piece_a,
            piece_b: piece_b,
            chances: chances,
            options: options
        });
    }
});