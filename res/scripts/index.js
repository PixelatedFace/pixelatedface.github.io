///<reference path="matter.js"/>

const Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    Constraint = Matter.Constraint,
    Mouse = Matter.Mouse,
    Common = Matter.Common,
    MouseConstraint = Matter.MouseConstraint;

const path = './res/images/slugpup_';

var engine = Engine.create(),
    world = engine.world;

var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 500,
        height: 500,
        showAngleIndicator: false,
        wireframes: false
    }
});

Render.run(render);

var part_opt = {
    friction: 0.05,
    frictionStatic: 0.1,
    render: { visible: true}
};

const radius = 8
var head, body;
var slugpup = softbody(100, 100, 1, 2, 0, 0, true, radius, part_opt, [path+'head.png', path+'body.png', path+'body.png']);



var ground = Bodies.rectangle(250, 450, 500, 50, {isStatic: true});
var ceiling = Bodies.rectangle(250, 25, 500, 50, {isStatic: true});
var wall_l = Bodies.rectangle(0, 25, 500, 50, {isStatic: true});
var wall_r = Bodies.rectangle(250, 25, 500, 50, {isStatic: true});
Composite.add(world, [slugpup, ground, ceiling])

var mouse = Mouse.create(render.canvas);

var mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        stiffness: 0.2,
        render: {
            visible: false
        }
    }

});

Composite.add(world, mouseConstraint);

render.mouse = mouse;

Render.lookAt(render, {
    min: {x: 0, y: 0},
    max: {x: 500, y: 500}
});


var runner = Runner.create();

Runner.run(runner, engine);


// THANK YOU MATTERJS EXAMPLES
function softbody(_x, _y, columns, rows, c_gap, r_gap, brace, part_rad, part_opt, _texture){
    
    part_opt = Common.extend({ intertia: Infinity}, part_opt);
    var const_opt = Common.extend({ stiffness: 0.2, render: { type: 'line', anchors: false}}, const_opt);
    var i = 0;
    var softBody = Composites.stack(_x, _y, columns, rows, c_gap, r_gap, function(x, y){
        part_opt = Common.extend({render: {sprite: {texture: _texture[i]}}});
        i++;
        var b = Bodies.circle(x, y, part_rad, part_opt);
        body = b;
        if(i == 0) head = b;
        return b;
    });

    Composites.mesh(softBody, columns, rows, brace, const_opt);

    return softBody;
}

