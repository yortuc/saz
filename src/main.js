import Scene from './js/Components/Scene';  
import GameObject from './js/Components/GameObject';  
import Transform from './js/Components/Transform';  
import Motor from './js/Components/Motor';  
import RectangleRenderer from './js/Components/RectangleRenderer';  
import Body from './js/Components/Body';  
import Controller2D from './js/Components/Controller2D';  
import resourceLoader from './js/utils/resourceLoader';  
import Input from './js/utils/input'; 

Input.init();

class Top extends GameObject{

	constructor(){
		super();
		this.addComponent(new Transform(200, 50, 20, 20));
		this.controller = this.addComponent(new Controller2D());
		this.addComponent(new RectangleRenderer("red"));
		this.velocity = {x:0, y:0};
		this.gravity = 10;
		this.moveSpeed = 6;
	}

	update(dt, ctx) {
		super.update(dt, ctx);

		this.velocity.x = Input.getAxis("horizontal").x * this.moveSpeed;
		this.velocity.y += this.gravity * dt/1000;
		this.controller.Move(this.velocity);
	}
} 


/*var top = new GameObject([
	new Transform(200, 50, 20, 20),
	new Controller2D(),
	new RectangleRenderer("red"),
	new Motor()
]);*/

var top = new Top();

var yer = new GameObject([
	new Transform(50, 400, 200, 20),
	new RectangleRenderer()
]);


var scene = new Scene([ top, yer ]);
scene.start();