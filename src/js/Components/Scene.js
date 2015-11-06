import Behavior from './Behavior';
import requestAnimationFrame from '../requestAnimationFrame';  
import Graphics from '../utils/graphics';
import Geometry from '../utils/Geometry';

export default class Scene extends Behavior {

	constructor(gameObject, children=[]) {
		super(gameObject);
		this.ctx = Graphics.ctx;
		this.children = [];

		children.map(c=> {
			c.parent = this;
			this.children.push(c);
		});

		this.start();
	}

	start() {
		this.lastRender = Date.now();
		this.update();
	}

	update() {

		const time = Date.now();
		const dt =  time - this.lastRender;

		this.ctx.clearRect(0, 0, 800, 480);

		this.children.map(g => {
			g.update(dt);
		});
		this.gameObject.components.map(s=> {
			if(s.constructor.name !== "Scene"){
				s.update(dt);
			}
		});
		this.lastRender = time;

		requestAnimationFrame(this.update.bind(this));
	}
}