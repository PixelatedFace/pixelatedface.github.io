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

var engine = Engine.create();

var world = engine.world;

var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 500,
        height: 500,
        canvas: document.getElementById('canvas'),
        showAngleIndicator: false,
        wireframes: false
    }
});

render.canvas.style = 'position: absolute; bottom: 0; right: 0;';

Render.run(render);

var part_opt = {
    friction: 0.05,
    frictionStatic: 0.1,
    render: { visible: true}
};

const radius = 8
var head, body;
var slugpup = softbody(100, 100, 1, 2, 0, 0, true, radius, part_opt, [path+'head.png', path+'body.png', path+'body.png']);

const color = 'rgb(37, 32, 54)';

var ground = Bodies.rectangle(250, 475, 500, 50, {isStatic: true, render: {fillStyle: color}});
var ceiling = Bodies.rectangle(250, 25, 500, 50, {isStatic: true, render: {fillStyle: color}});
var wall_l = Bodies.rectangle(25, 250, 50, 400, {isStatic: true, render: {fillStyle: color}});
var wall_r = Bodies.rectangle(475, 250, 50, 400, {isStatic: true, render: {fillStyle: color}});


Composite.add(world, [slugpup, ground, ceiling, wall_l, wall_r]);

var boxes = [];

for (let i = 0; i < 10; i++) {
    boxes.push(Bodies.rectangle(250+randomInt(5), 250, 10, 10));
}
for (let i = 0; i < 5; i++) {
    boxes.push(Bodies.rectangle(250+randomInt(5), 250, 25, 25));
}

Composite.add(world, boxes);

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


var runner = Runner.create();

Runner.run(runner, engine);

function randomInt(max){
    return Math.floor(Math.random() * max);
}


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

var spamton = document.getElementById("spamton");

spamton.onclick = function(){
    spamton.id = null;
    setInterval(function(){
        spamton.id = "spamton"
    }, 5000);
}

document.getElementById("btn_itch").onclick = function(){
    open("https://pixelatedface.itch.io/")
}

document.getElementById("btn_git").onclick = function(){
    open("https://github.com/PixelatedFace")
}

document.getElementById("btn_yt").onclick = function(){
    open("https://www.youtube.com/channel/UCGw_0V2-_PxuoEaSzrxmRBQ")
}
