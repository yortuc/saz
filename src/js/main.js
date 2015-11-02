import Input from './utils/input'; 
import Graphics from './utils/graphics'; 

import GameObject from './Components/GameObject';
import Transform from './Components/Transform';
import RectangleRenderer from './Components/RectangleRenderer';

import Scene from './Components/Scene';  
import Player from './Player'; 

Graphics.init();
Input.init();  
 
var player = new Player(); 

var yer = new GameObject([
	new Transform(10, 400, 100, 20),
	new RectangleRenderer()
]); 
 
var yer2 = new GameObject([
	new Transform(200, 300, 100, 20),
	new RectangleRenderer()
]); 


var yer3 = new GameObject([
	new Transform(300, 200, 100, 20),
	new RectangleRenderer()
]); 

var scene = new Scene([ player, yer, yer2, yer3 ]);
scene.start();