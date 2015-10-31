import Scene from './js/Components/Scene';  
import GameObject from './js/Components/GameObject';  
import Transform from './js/Components/Transform';  
import Motor from './js/Components/Motor';  
import RectangleRenderer from './js/Components/RectangleRenderer';  
import Body from './js/Components/Body';  

var top = new GameObject([
	new Transform(200, 50, 20, 20),
	new Body(10),
	new RectangleRenderer("red"),
	new Motor()
]);

var yer = new GameObject([
	new Transform(50, 200, 200, 20),
	new RectangleRenderer()
]);


var scene = new Scene([ top, yer ]);