Koi.namespace('game');
Koi.namespace('Game');

window.game = {
    templates: {},
    interface: false
};

Game.interface = Koi.define({

    init: function() {
        this.store_templates();
        this.create_spaces();
    },

    store_templates: function() {
        var $templates = $('#templates');
        $templates.find('.template').each(function() {
            var $this = $(this);
            var name = $this.attr('data-template');
            $this.removeClass('template');
            game.templates[name] = $this.clone();
        });
        $templates.remove;
    },

    create_spaces: function() {
        var x_start = -5;
        var y_start = -5;
        var x = 0;
        var y = 0;
        var rows = 11;
        var cols = 11;
        var count = 0;
        var $board = $('#board');
        var square = false;

        for(var row = 0; row < rows; row++) {
            x = x_start + row;
            for(var col = 0; col < cols; col++) {
                y = y_start + col;
                $square = game.templates.square.clone();
                $square.attr('id','square-' + count);
                $square.attr('data-x', x);
                $square.attr('data-y', y);
                $board.append($square);
                count++;
            }
        }
    }

});

$(document).ready(function() {
    game.interface = new Game.interface()
});
