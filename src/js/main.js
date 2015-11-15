// services
import Input from './utils/input'; 
import Graphics from './utils/graphics'; 
import MessageHub from './utils/messageHub';

// core
import GameObject from './Core/GameObject';
import Scene from './Core/Scene';  

// components
import SceneQuadTree from './Components/SceneQuadTree';
import SceneQuadTreeNodeRenderer from './Components/SceneQuadTreeNodeRenderer';
import Transform from './Components/Transform';
import RectangleRenderer from './Components/RectangleRenderer';
import RectangleShadowRenderer from './Components/RectangleShadowRenderer';
import Controller2D from './Components/Controller2D';
import PositionTextRenderer from './Components/PositionTextRenderer';
import FpsRenderer from './Components/FpsRenderer';
import PlayerController from './Components/PlayerController';
import PlatformController from './Components/PlatformController';


Graphics.init(800,600);
Input.init(); 

var oyun = new Scene();
	new Transform(oyun, {x:0, y: 0, width: 800, height: 600 });
	var mainSceneQuadTree = new SceneQuadTree(oyun);
	new SceneQuadTreeNodeRenderer(oyun);
	new FpsRenderer(oyun, {x: 20, y: 100});

	var player = new GameObject();
		new Transform(player, { x: 150, y: 50, width: 30, height: 30 });
		new Controller2D(player, { 
			jumpHeight: 5,
			timeToJumpApex: 0.5,
			wallFriction: 0.9,
			sceneQuadTree: mainSceneQuadTree
		});
		new PlayerController(player, {
			moveSpeed: 6,
			jumpHeight: 5,
			timeToJumpApex: 0.5
		});
		new RectangleShadowRenderer(player, "red"); 
		new PositionTextRenderer(player, {x: 20, y:20, label:"player pos" });
		
		var kafa = new GameObject();
			player.addChild(kafa);
			new Transform(kafa, {x: 0, y: -20, width: 10, height: 10 });
			new RectangleRenderer(kafa, "blue");
	  
	var yer3 = new GameObject();
		new Transform(yer3, {x: 700, y: 325, width: 50, height: 550 });
		new RectangleRenderer(yer3);

	var yer2 = new GameObject();
		new Transform(yer2, {x: 100, y: 530, width: 100, height: 20, scatic: true });
		new RectangleRenderer(yer2);
		new PlatformController(yer2);

	var kutu2 = new GameObject();
		new Transform(kutu2, {x: 50, y: 360, width: 100, height: 100, scatic: true });
		new RectangleRenderer(kutu2);

	var kutu = new GameObject();
		new Transform(kutu, {x: 300, y: 530, width: 60, height: 60, scatic: true });
		new RectangleRenderer(kutu);

	var yer = new GameObject();
		new Transform(yer, {x: 400, y: 590, width: 800, height: 20, scatic: true });
		new RectangleRenderer(yer, "orange");

MessageHub.init([
	/*channels*/ 
	"player_jump"
]);

MessageHub.subscribe("player_jump", function(data){
	console.log("player_jump", data);
	//mainSceneQuadTree.insert(createBody());	
});

function createBody(){ 
	var colors = ["red", "green", "blue", "magenta", "orange", "cyan"];

	var _ci = Math.floor( Math.random() * colors.length );
	var _x = Math.random() * 800,
		_y = Math.random() * 600;

	var _w = 40 * Math.random();

	var yeniKutu = new GameObject();
		new Transform(yeniKutu, {x: _x, y: _y, width: 40 + _w, height: 40 + _w });
		new RectangleRenderer(yeniKutu, colors[_ci]); 

	oyun.addChild( yeniKutu );

	return yeniKutu;
}

// setInterval(createBody, 1000);
oyun.setChildren([ yer2, yer3, kutu, kutu2, yer, player ]);

oyun.start();