// services
import Input from './utils/input'; 
import Graphics from './utils/graphics'; 
import MessageHub from './utils/messageHub';

// core
import GameObject from './Core/GameObject';
import Scene from './Core/Scene';  

// components
import Camera from './Components/Camera';
import CameraFollow from './Components/CameraFollow';

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

import Popup from './Components/Popup';
import DashRenderer from './Components/DashRenderer';
import FractalRenderer from './Components/FractalRenderer';

Graphics.init(800, 600);
Input.init(); 

var oyun = new Scene();
	new Transform(oyun, { x: 0, y: 0, width: 1800, height: 1000 });
	var mainCamera = new Camera(oyun, {x:0, y: 100, width: 800, height: 600});
	//var mainSceneQuadTree = new SceneQuadTree(oyun);
	//new SceneQuadTreeNodeRenderer(oyun);
	new FpsRenderer(oyun, {x: 20, y: 100});

	var player = new GameObject({layer: "front"});
		new Transform(player, { x: 150, y: 50, width: 30, height: 30 });
		new Controller2D(player, { 
			jumpHeight: 5,
			timeToJumpApex: 0.5,
			wallFriction: 0.9,
			//sceneQuadTree: mainSceneQuadTree
		});
		new PlayerController(player, {
			moveSpeed: 6,
			jumpHeight: 5,
			timeToJumpApex: 0.5
		});
		new RectangleShadowRenderer(player, "red"); 
		new PositionTextRenderer(player, {x: 20, y:20, label:"player pos" });
		new CameraFollow(player, {camera: mainCamera});
		 
		var kafa = new GameObject();
			player.addChild(kafa);
			new Transform(kafa, {x: 0, y: -20, width: 10, height: 10 });
			new RectangleRenderer(kafa, "blue");
	 

	var platform1 = new GameObject({layer: "platforms"});
		new Transform(platform1, {x: 250, y: 565, width: 100, height: 20, scatic: true });
		new RectangleRenderer(platform1, "orange");
		new PlatformController(platform1);

	var kutu2 = new GameObject();
		new Transform(kutu2, {x: 50, y: 360, width: 100, height: 100, scatic: true });
		new RectangleRenderer(kutu2);
		new Popup(kutu2);

	var kutu = new GameObject();
		new Transform(kutu, {x: 450, y: 200, width: 60, height: 60, scatic: true });
		new RectangleRenderer(kutu);
		new Popup(kutu);

	var kutu3 = new GameObject();
		new Transform(kutu3, {x: 850, y: 60, width: 160, height: 160, scatic: true });
		new RectangleRenderer(kutu3);
		new Popup(kutu3);

	var kutu4 = new GameObject();
		new Transform(kutu4, {x: 1050, y: -100, width: 150, height: 250 });
		new RectangleRenderer(kutu4, "red");
		new Popup(kutu4);

	var yer = new GameObject();
		new Transform(yer, {x: 400, y: 585, width: 1500, height: 20, scatic: true });
		new RectangleRenderer(yer, "orange");

	var ucgen = new GameObject();
		new Transform(ucgen, {x: -200, y: 250, width: 300, height: 300 });
		new FractalRenderer(ucgen, {color: "orange", limit:3 });
		new Popup(ucgen);
  
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
oyun.setChildren([ platform1, kutu4, kutu, kutu2, kutu3, yer, player, ucgen ]);

oyun.start();