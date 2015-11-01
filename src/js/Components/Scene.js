import requestAnimationFrame from '../requestAnimationFrame';  

export default class Scene {

	constructor(children) {
		this.ctx = document.getElementById("canvas").getContext("2d");
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
			g.update(dt, this.ctx);
		});
		this.lastRender = time;

		requestAnimationFrame(this.update.bind(this));
	}
}