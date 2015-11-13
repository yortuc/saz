import Graphics from './utils/graphics'; 
import requestAnimationFrame from './requestAnimationFrame';  

var gameState = {
	objects: [
		{
			id:	1,
			name: "oyuncu",
			components: {
				Transform : {x:400, y:300, width: 30, height: 30},
				Renderer: { color: "orange" }
			}		
		},
		{
			id:	2,
			name: "kutu",
			components: {
				Transform : {x:200, y:400, width: 130, height: 130},
				Renderer: { color: "black" },
				Mover: { velocity: {x: 50, y: 0} }
			}	
		}
	]
}

// sistemler
Graphics.init(800,600);

function clearScene(){
	Graphics.ctx.clearRect(0,0,800,600);
}

function Renderer (state) {
	// filter game objects contains renderer component
	var gameObjects = state.objects.filter(o=> o.components["Transform"]);

	gameObjects.map(o=> {
		var transform = o.components["Transform"];
		var renderer = o.components["Renderer"];

		Graphics.ctx.save();
		Graphics.ctx.translate(transform.x, transform.y);
		Graphics.ctx.fillStyle = renderer.color;
		Graphics.ctx.fillRect(0,0, transform.width, transform.height);
		Graphics.ctx.restore();
	});
}

function Mover(state, dt){
	// filter game objects contains mover component
	var gameObjects = state.objects.filter(o=> o.components["Mover"]);

	gameObjects.map(o=> {
		var vel = o.components["Mover"].velocity;
		o.components["Transform"].x += dt/1000 * vel.x;
		o.components["Transform"].y += dt/1000 * vel.y;
	});
}

function Turetir(state, dt){
	if(timer > 1000) {
		timer = 0;

		var _x = 0,
			_y = 0,
			_vx = 180 * Math.random(),
			_vy = 160 * Math.random();

		gameState.objects.push({
			id:	++sonId,
			name: "kutu",
			components: {
				Transform : {x:_x, y:_y, width: 100, height: 100},
				Renderer: { color: colors[Math.floor(Math.random() * colors.length)] },
				Mover: { velocity: {x: _vx, y: _vy} }
			}
		});
	}
}

function GarbageCollector(state){
	state.objects = state.objects.filter(o=> 
		o.components["Transform"].x < 400 || 
		o.components["Transform"].y < 300
	);
}

var lastRender = Date.now();
var timer = 0;
var sonId = 2;
var colors = ["red", "green", "blue", "magenta", "cyan"];

function gameLoop(){

	var dt = Date.now() - lastRender;

	Mover(gameState, dt);
	clearScene();
	Renderer(gameState, dt);
	Turetir(gameState, dt);
	GarbageCollector(gameState);

	lastRender = Date.now();
	timer += dt;

	//console.log(dt);

	requestAnimationFrame(gameLoop);
}

gameLoop();