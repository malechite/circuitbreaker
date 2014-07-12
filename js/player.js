Koi.namespace('game');
Koi.namespace('Game');

Game.player = Koi.define({
    inventory: {
        blue: 0,
        orange: 0,
        purple: 0,
        green: 0,
        yellow: 0,
        blocker: 0
    },

    actions: 0,

    add_to_inventory: function(pieces) {
        for(var i = 0; i < pieces.length; i++) {
            if(this.inventory.hasOwnProperty(pieces[i])) {
                this.inventory[pieces[i]]++;
            }
        }
        console.log(pieces, this.inventory)
        game.interface.update_inventory_display(this.inventory, this.actions);
    }
});