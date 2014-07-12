Koi.namespace('game');
Koi.namespace('Game');

Game.interface = Koi.define({

    init: function() {
        this.store_templates();
        this.store_dom();
        this.create_spaces();
        this.bind();
    },

    store_templates: function() {
        var $templates = $('#templates');
        $templates.find('.template').each(function() {
            var $this = $(this);
            var name = $this.attr('data-template');
            $this.removeClass('template');
            game.templates[name] = $this.clone();
        });
        $templates.remove();
    },

    store_dom: function() {
        game.dom.pattern = $('#pattern');
        game.dom.inventory = $('#inventory');
        game.dom.results = $('#roll-results');
        game.dom.roll = $('#inventory .roll');
    },

    bind: function() {
        var _this = this;
        $(document.body).on('click', '#inventory .roll:not(.inactive)', {}, function() { game.dice.roll(); });
        $(document.body).on('click', '#roll-results .okay:not(.inactive)', {}, function() { game.interface.close_roll_results(); });
        $(document.body).on('click', '#roll-results .options:not(.active)', {}, function() { game.interface.toggle_piece_option(this); });
        this.bind_chat();
    },

    bind_chat: function() {
        var $chat = $('#chat form input');
        var $messages = $('#chat .messages');
        $('#chat form').on('submit', function() {
            socket.emit('chat', $chat.val());
            $chat.val('');
            return false;
        });
        socket.on('chat', function(msg){
            $messages.append($('<li>').text(msg));
        });
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
        var $square = false;

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
    },

    display_pattern: function(pattern) {
        var $pattern = game.dom.pattern.find('ul');
        pattern = pattern || [];

        for(var i = 0; i < pattern.length; i++) {
            $pattern.append('<li class="' + pattern[i] + '"></li>');
        }
    },

    display_roll_results: function(results) {
        console.log(results);
        var $results = game.dom.results;
        var options = '';
        var text = '';
        game.dom.roll.addClass('inactive');
        $results.find('.actions .count').html(results.actions);
        game.players[0].actions = results.actions;
        $results.find('.okay').addClass('inactive');

        for(var opt = 0; opt < results.options.length; opt++) {
            options += '<ul class="options">';
            for(var piece = 0; piece < results.options[opt].length; piece++) {
                options += '<li class="' + results.options[opt][piece] + '" data-piece="' + results.options[opt][piece] + '"></li>';
            }
            options += '</ul>';
        }
        $results.find('ul').remove();
        $results.append(options);

        if(results.chances === 0) {
            text = 'Sorry, you don\'t get any pieces this turn.';
            $results.find('.okay').removeClass('inactive');
        } else if(results.options.length === 1) {
            text = 'You have no choice but to accept this piece:';
            $results.find('ul.options').addClass('active');
            $results.find('.okay').removeClass('inactive');
        } else {
            text = 'Choose your pieces from the following options:';
        }

        $results.find('.choose').html(text);
        $results.show();
    },

    update_inventory_display: function(inventory, actions) {
        var $inventory = game.dom.inventory;
        for(var piece in inventory) {
            $inventory.find('ul li.' + piece).html(inventory[piece]);
        }
        $inventory.find('.actions .count').html(actions);
    },

    toggle_piece_option: function(elem) {
        var $option = $(elem);
        game.dom.results.find('.options').removeClass('active');
        $option.addClass('active');
        game.dom.results.find('.okay').removeClass('inactive');
    },

    close_roll_results: function() {
        var $results = game.dom.results;
        var pieces = [];

        $results.find('.options.active li').each(function() {
            pieces.push($(this).attr('data-piece'));
        });

        $results.hide();
        game.dom.roll.removeClass('inactive');
        game.players[0].add_to_inventory(pieces);
    }
});









