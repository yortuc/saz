import Input from './utils/input'; 
import Graphics from './utils/graphics'; 

import GameObject from './Components/GameObject';
import Transform from './Components/Transform';
import RectangleRenderer from './Components/RectangleRenderer';
import Controller2D from './Components/Controller2D';
import PositionTextRenderer from './Components/PositionTextRenderer';
import DashRenderer from './Components/DashRenderer';


import Scene from './Components/Scene';  
 
Graphics.init();  
Input.init();  


/*
	synthetic sugar

	var player = go(["Transform", { x: 170, y: 50, width: 30, height: 30 }],
					["Controller2D", { 
						moveSpeed:6,
						jumpHeight: 5, 
						timeToJumpApex: 0.5,
						accelerationTimeAirborne: 0.2,
						accelerationTimeGrounded: 0.1 }],
					["RectangleRenderer", {color: "red" }],
					["PositionTextRenderer", { x: 20, y: 20 }]);

*/

var player = new GameObject();
	new Transform(player, { x: 170, y: 50, width: 30, height: 30 });
	new Controller2D(player, { 
		moveSpeed:6,
		jumpHeight: 5, 
		timeToJumpApex: 0.5,
		accelerationTimeAirborne: 0.2,
		accelerationTimeGrounded: 0.1
	});
	new RectangleRenderer(player, "red");
	new PositionTextRenderer(player, {x: 20, y:20, label:"player velocity" });

var yer = new GameObject();
	new Transform(yer, {x: 0, y: 460, width: 800, height: 20 });
	new RectangleRenderer(yer);
	new DashRenderer(yer);

 
var yer3 = new GameObject();
	new Transform(yer3, {x: 300, y: 100, width: 160, height: 20, rotation: 20 });
	new RectangleRenderer(yer3);

var yer2 = new GameObject();
	new Transform(yer2, {x: 100, y: 300, width: 100, height: 20 });
	new RectangleRenderer(yer2);

var kutu = new GameObject();
	new Transform(kutu, {x: 360, y: 400, width: 60, height: 60 });
	new RectangleRenderer(kutu);
	new DashRenderer(kutu);

var kutu2 = new GameObject();
	new Transform(kutu2, {x: 700, y: 360, width: 100, height: 100 });
	new RectangleRenderer(kutu2);
	new DashRenderer(kutu2);

var scene = new Scene([ yer, yer2, yer3, kutu, kutu2, player ]);
scene.start();