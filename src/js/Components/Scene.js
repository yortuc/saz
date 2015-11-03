import requestAnimationFrame from '../requestAnimationFrame';  
import Graphics from '../utils/graphics';

export default class Scene {

	constructor(children) {
		this.ctx = Graphics.ctx;
		this.children = [];
		
		children.map(c=> {
			c.parent = this;
			this.children.push(c);
		});
	}

	start() {
		this.lastRender = Date.now();
		this.update();
	}

	update() {
		const time = Date.now();
		const dt =  time - this.lastRender;

		this.ctx.clearRect(0, 0, 600, 480);

		this.children.map(g => {
			g.update(dt);
		});
		this.lastRender = time;

		requestAnimationFrame(this.update.bind(this));
	}
}