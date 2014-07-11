Koi.namespace('game');
Koi.namespace('Game');

window.game = {
    templates: {},
    interface: false,
    patterns: false
};

Game.patterns = Koi.define({
    list: [
        ['green','yellow','PLAYER','purple','green'],
        ['orange','blue','blue','PLAYER','green'],
        ['PLAYER','green','yellow','blue','purple'],
        ['orange','blue','purple','green','PLAYER'],
        ['blue','PLAYER','yellow','orange','orange'],
        ['orange','yellow','PLAYER','green','blue'],
        ['PLAYER','purple','orange','green','purple'],
        ['green','purple','orange','PLAYER','yellow'],
        ['yellow','purple','yellow','blue','PLAYER'],
        ['blue','PLAYER','orange','purple','green']
    ],

    in_use: [],

    fetch: function() {
        var pattern = Math.floor(Math.random() * this.list.length);
        if($.inArray(pattern, this.in_use) < 0) {
            this.in_use.push(pattern);
            console.log('pattern: ', pattern)
            return pattern;    
        } else if(this.in_use.length < this.list.length) {
            this.fetch();
        } else {
            this.in_use = [];
            this.fetch();
        }
        
    }
});

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
                $square.find('.coords').html(x + ', ' + y);
                if($.inArray(count,[0,10,110,120]) >= 0) {
                    $square.addClass('teleport').append('<span class="icon">*</span>');
                }
                $board.append($square);
                count++;
            }
        }
    }

});

$(document).ready(function() {
    game.interface = new Game.interface();
    game.patterns = new Game.patterns();
});
