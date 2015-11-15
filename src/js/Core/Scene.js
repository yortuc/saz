import GameObject from './GameObject';
import requestAnimationFrame from '../requestAnimationFrame';  
import Graphics from '../utils/graphics';
import Geometry from '../utils/Geometry';

export default class Scene extends GameObject {

	constructor(children=[]) {
		super(children);
		this.ctx = Graphics.ctx;
	}

	setChildren(children=[]){
		children.map(c=> this.addChild(c));
	}

	start() {
		this.transform = this.getComponent("Transform");
		this.lastRender = Date.now();
		this.update();
	}

	update() {
		// dt
		const time = Date.now();
		const dt =  time - this.lastRender;

		// clear scene
		this.ctx.clearRect(0, 0,
						   this.transform.width, this.transform.height);

		this.ctx.save();
		this.ctx.fillStyle = "#fff";
		this.ctx.fillRect(0,0,this.transform.width, this.transform.height)
		this.ctx.restore();

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
		
		this.lastRender = time;

		// call next frame
		requestAnimationFrame(this.update.bind(this));
	}
}