import Input from './utils/input'; 
import Graphics from './utils/graphics'; 

import GameObject from './Components/GameObject';
import Transform from './Components/Transform';
import RectangleRenderer from './Components/RectangleRenderer';
import Controller2D from './Components/Controller2D';


import Scene from './Components/Scene';  
 
Graphics.init();
Input.init();

var player = (new GameObject())
				.add(new Transform({ x: 200, y: 50, width: 20, height: 20 })) 
				.add(new Controller2D({ 
					moveSpeed:6,
					jumpHeight: 2, 
					timeToJumpApex: 0.4,
					accelerationTimeAirborne: 0.2,
					accelerationTimeGrounded: 0.1
				}))
				.add(new RectangleRenderer("red"));

var yer = new GameObject()
			.add(new Transform({x: 10, y: 400, width: 100, height: 20 }))
			.add(new RectangleRenderer());
 
var yer2 = new GameObject()
			.add(new Transform({x: 200, y: 300, width: 100, height: 20 }))
			.add(new RectangleRenderer());

var yer3 = new GameObject()
			.add(new Transform({x: 300, y: 200, width: 100, height: 20 }))
			.add(new RectangleRenderer());

var scene = new Scene([ player, yer, yer2, yer3 ]);
scene.start();