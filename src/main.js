import resourceLoader from './js/utils/resourceLoader';  
import Input from './js/utils/input'; 

import GameObject from './js/Components/GameObject';
import Transform from './js/Components/Transform';
import RectangleRenderer from './js/Components/RectangleRenderer';

import Scene from './js/Components/Scene';  
import Player from './js/Player'; 

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

var scene = new Scene([ top, yer, yer2, yer3 ]);
scene.start();