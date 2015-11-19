import Behavior from '../Core/Behavior';


export default class Popup extends Behavior {
	constructor(gameObject, data){
		super(gameObject);

		this.transform = this.gameObject.getComponent("Transform");

		// target values
		this.startHeight = this.transform.height * 0.6;
		this.dH = this.transform.height * 0.4;

		this.startY = this.targetY + this.targetHeight/2;
		this.targetY = this.transform.y;
		this.dY = this.targetHeight / 2;

		this.timeElapsed = 0;
		this.duration = 500;
	}

	update(dt){
		this.timeElapsed += dt;
		if(this.timeElapsed < this.duration) {
			this.transform.height = this.easeInOut(this.timeElapsed, this.startHeight, this.dH, this.duration);
			//this.transform.y = this.easeIn(this.timeElapsed, this.startY, -this.dY, this.duration);
		}
	}

	// t: current time, b: begInnIng value, c: change In value, d: duration

	easeOut (t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	}

	easeIn (t, b, c, d) {
		return c - this.easeOut (d-t, 0, c, d) + b;
	}

	easeInOut (t, b, c, d) {
		if (t < d/2) {
			return this.easeIn (t*2, 0, c, d) * .5 + b;
		}
		else {
			return this.easeOut (t*2-d, 0, c, d) * .5 + c*.5 + b;
		} 
	}
}