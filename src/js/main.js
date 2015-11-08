import Input from './utils/input'; 
import Graphics from './utils/graphics'; 
import MessageHub from './utils/messageHub';

import Scene from './Components/Scene';  
import SceneQuadTree from './Components/SceneQuadTree';
import SceneQuadTreeNodeRenderer from './Components/SceneQuadTreeNodeRenderer';

import GameObject from './Components/GameObject';
import Transform from './Components/Transform';
import RectangleRenderer from './Components/RectangleRenderer';
import Controller2D from './Components/Controller2D';
import PositionTextRenderer from './Components/PositionTextRenderer';
import DashRenderer from './Components/DashRenderer';

Graphics.init(800,600);
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
 
var oyun = new Scene();
	new Transform(oyun, {x: 0, y: 0, width: 800, height: 600 });
	var mainSceneQuadTree = new SceneQuadTree(oyun);
	new SceneQuadTreeNodeRenderer(oyun);

	var player = new GameObject();
		new Transform(player, { x: 550, y: 50, width: 30, height: 30 });
		new Controller2D(player, { 
			moveSpeed:6,					// player x movement velocity
			jumpHeight: 5, 	 				// 
			timeToJumpApex: 0.5,			//
			accelerationTimeAirborne: 0.2,	//
			accelerationTimeGrounded: 0.1,	//
			sceneQuadTree: mainSceneQuadTree		// quadTree which will be used for raycasting
		}); 	 
		new RectangleRenderer(player, "red"); 
		new PositionTextRenderer(player, {x: 20, y:20, label:"player velocity" });
	 
		var kafa = new GameObject();
			player.addChild(kafa);
			new Transform(kafa, {x: 10, y: -10, width: 10, height: 10 });
			new RectangleRenderer(kafa, "red");
		var kol1 = new GameObject();
			player.addChild(kol1);
			new Transform(kol1, {x: -5, y: 0, width: 5, height: 15 });
			new RectangleRenderer(kol1, "black");
		var kol2 = new GameObject();
			player.addChild(kol2);
			new Transform(kol2, {x: 30, y: 0, width: 5, height: 15 });
			new RectangleRenderer(kol2, "black");
		var ara = new GameObject();
			player.addChild(ara);
			new Transform(ara, {x: 10, y: 20, width: 10, height: 10 });
			new RectangleRenderer(ara, "white");

	 var yer3 = new GameObject();
		new Transform(yer3, {x: 300, y: 100, width: 160, height: 20, rotation: 20 });
		new RectangleRenderer(yer3);
		new DashRenderer(yer3);
	 
	var yer2 = new GameObject();
		new Transform(yer2, {x: 100, y: 280, width: 100, height: 20 });
		new RectangleRenderer(yer2);
		new DashRenderer(yer2);

	var kutu2 = new GameObject();
		new Transform(kutu2, {x: 700, y: 360, width: 100, height: 100 });
		new RectangleRenderer(kutu2);

	var kutu = new GameObject();
		new Transform(kutu, {x: 360, y: 410, width: 60, height: 60 });
		new RectangleRenderer(kutu);

	var yer = new GameObject();
		new Transform(yer, {x: 0, y: 460, width: 800, height: 20 });
		new RectangleRenderer(yer);


oyun.setChildren([ yer2, yer3, kutu, kutu2, yer, player ]);
mainSceneQuadTree.quadTree.addObject(player);
oyun.start();

MessageHub.init([
	/*channels*/ 
	"player_jump"
]);

MessageHub.subscribe("player_jump", function(data){
	console.log("player_jump", data);

	mainSceneQuadTree.quadTree.subNodes.map(s=>{
		if(s.subNodes.length === 0){
			if(s.objects.length > 0){
				console.log(s)
			}
		}
	});
});



