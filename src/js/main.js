import Input from './utils/input'; 
import Graphics from './utils/graphics'; 

import GameObject from './Components/GameObject';
import Transform from './Components/Transform';
import RectangleRenderer from './Components/RectangleRenderer';
import Controller2D from './Components/Controller2D';
import PositionTextRenderer from './Components/PositionTextRenderer';

import Scene from './Components/Scene';  
 
Graphics.init(); 
Input.init();  

var player = new GameObject();
	new Transform(player, { x: 170, y: 50, width: 100, height: 100 });
	new Controller2D(player, { 
		moveSpeed:6,
		jumpHeight: 2, 
		timeToJumpApex: 0.4,
		accelerationTimeAirborne: 0.2,
		accelerationTimeGrounded: 0.1
	});
	new RectangleRenderer(player, "red");
	new PositionTextRenderer(player, {x: 20, y:20 });

var yer = new GameObject();
	new Transform(yer, {x: 10, y: 400, width: 100, height: 20 });
	new RectangleRenderer(yer);
 
var yer2 = new GameObject();
	new Transform(yer2, {x: 200, y: 300, width: 100, height: 20 });
	new RectangleRenderer(yer2);

var yer3 = new GameObject();
	new Transform(yer3, {x: 280, y: 200, width: 100, height: 20 });
	new RectangleRenderer(yer3);


var scene = new Scene([ player, yer, yer2, yer3 ]);
scene.start();