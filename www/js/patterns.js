Koi.namespace('game');
Koi.namespace('Game');

Game.patterns = Koi.define({
    list: [
        ['green','yellow','player','purple','green'],
        ['orange','blue','blue','player','green'],
        ['player','green','yellow','blue','purple'],
        ['orange','blue','purple','green','player'],
        ['blue','player','yellow','orange','orange'],
        ['orange','yellow','player','green','blue'],
        ['player','purple','orange','green','purple'],
        ['green','purple','orange','player','yellow'],
        ['yellow','purple','yellow','blue','player'],
        ['blue','player','orange','purple','green']
    ],

    in_use: [],

    fetch: function() {
        var _this = this;
        var pattern = false;

        var get_index = function() {
            var num = Math.floor(Math.random() * _this.list.length);

            if(_this.in_use.length == _this.list.length) {
                _this.in_use = [];    
            }
            
            if(_this.in_use.indexOf(num) < 0) {
                _this.in_use.push(num);
                pattern = _this.list[num];
            } else {
                get_index();
            }
        };
        
        get_index();
        return pattern;
    }
});