import Behavior from '../Core/Behavior';


export default class Popup extends Behavior {
	constructor(gameObject, data){
		super(gameObject);

		this.transform = this.gameObject.getComponent("Transform");

		// target values
		this.targetY = this.transform.y;
		this.targetHeight = this.transform.height;

		this.working = true;
		this.ease = 0.2;
		this.currentHeight = 0;
		this.currentY = this.targetY + this.targetHeight/2;
	}

	update(dt){
		this.currentHeight += (this.targetHeight - this.currentHeight) * this.ease;

		this.currentY += (this.targetY - this.currentY) * this.ease;

		this.transform.height = this.currentHeight;
		this.transform.y = this.currentY;

		this.working = (this.targetHeight - this.currentHeight) > 0.1;
	}
}