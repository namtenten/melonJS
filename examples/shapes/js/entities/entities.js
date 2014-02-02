game.ShapeObject = me.ObjectEntity.extend({
     /**
     * constructor
     */
    init: function (x, y, settings) {
        // call the parent constructor
        this.parent(x, y, settings);
        this.hover = false;
        this.handler = me.event.subscribe("mousemove", this.mouseMove.bind(this));
    },

    /**
     * mousemove function
     */
    mouseMove: function (event) {
        this.hover = this.inViewport && 
                     this.getShape().containsPoint(
                        // shape object position is relative to the entity
                        event.gameX - this.pos.x, event.gameY - this.pos.y
                     );
    },

    /**
     * update function
     */
    update: function () {
        return true;
    },
    /**
     * draw the square
     */
    draw: function (context) {
        context.globalAlpha = this.hover ? 1.0 : 0.5;
        this.parent(context);
        context.globalAlpha = 1.0;
    }
});

game.Square = game.ShapeObject.extend({
    /**
     * constructor
     */
    init: function (x, y, settings) {
        // call the parent constructor
        this.parent(x, y, settings);

        // add a rectangular shape
        this.addShape(new me.Rect({x:0, y:0}, this.width, this.height));

        // pienapple
        this.renderable = new me.SpriteObject (0, 0, me.loader.getImage("sprites"), 20, 24);
        this.renderable.offset.x = 93;
        this.renderable.offset.y = 151;
        this.renderable.resize(7.5);
    }
});

game.Circle = game.ShapeObject.extend({
    /**
     * constructor
     */
    init: function (x, y, settings) {
        // call the parent constructor
        this.parent(x, y, settings);

        // add an ellipse shape
        this.addShape(new me.Ellipse({x:0, y:0}, this.width, this.height));

        // tomato
        this.renderable = new me.SpriteObject (0, 0, me.loader.getImage("sprites"), 20, 20);
        this.renderable.offset.x = 65;
        this.renderable.offset.y = 153;
        this.renderable.resize(7.5);

    }
});

game.Poly = game.ShapeObject.extend({
    /**
     * constructor
     */
    init: function (x, y, settings) {
        // call the parent constructor
        this.parent(x, y, settings);

        // add a polygone shape
        this.addShape(new me.PolyShape({x:0, y:0}, [
            // draw a star
            {x:0, y:0},
            {x:28, y:60},
            {x:94, y:70},
            {x:46, y:114},
            {x:88, y:180},
            {x:0, y:125},
            {x:-88, y:180},
            {x:-46, y:114},
            {x:-94, y:70},
            {x:-28, y:60}
        ], true));

        // cache a copy of the corresponding shape bounds
        this.polyBounds = this.getShape().getBounds();

        // star
        this.renderable = new me.SpriteObject (0, 0, me.loader.getImage("sprites"), 24, 24);
        this.renderable.offset.x = 86;
        this.renderable.offset.y = 241;
        this.renderable.resize(7.5);
    },

    /**
     * mousemove function
     */
    mouseMove: function (event) {
        // shape object position is relative to the entity
        var x = event.gameX - this.pos.x, y = event.gameY - this.pos.y; 

        this.hover = this.inViewport &&
                     // for polyshape first use the less expensive 
                     // test on the corresponding bounding rectangle
                     this.polyBounds.containsPoint(x, y) &&
                     this.getShape().containsPoint(x, y);
    }
});
