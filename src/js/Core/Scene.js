import GameObject from './GameObject';
import requestAnimationFrame from '../requestAnimationFrame';  
import Graphics from '../utils/graphics';
import Geometry from '../utils/Geometry';

export default class Scene extends GameObject {

	constructor(children=[]) {
		super(children);
	}

	setChildren(children=[]){
		children.map(c=> this.addChild(c));
	}

	start() {
		this.transform = this.getComponent("Transform");
		this.camera = this.getComponent("Camera");
		this.lastRender = Date.now();
		this.update();
	}

	update() {
		// dt
		const time = Date.now();
		const dt =  time - this.lastRender;

		// clear scene
		Graphics.clearScene();
		Graphics.ctx.save();
		Graphics.ctx.translate(-this.camera.transform.x, 
							   -this.camera.transform.y);

		// update self components
		this.components.map(s=> {
			if(s.update) {
				s.update(dt);
			}
		});

		// update children
		this.children.map(g => {
			if(g.update) {
				g.update(dt);
			}
		});
		
		Graphics.ctx.restore();

		this.lastRender = time;

		// call next frame
		requestAnimationFrame(this.update.bind(this));
	}
}