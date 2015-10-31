export default class Motor {
	constructor(speed=5){
		this.speed = speed;	// pixel/s 
	}
	update(dt) {
		this.gameObject.getComponent("Transform").x += this.speed*dt/1000;
	}
}