export default class Jumper {
	constructor(color="black"){
		this.color = color;
	}
	update(dt, ctx) {
		var transform = this.gameObject.getComponent("Transform");
		ctx.fillStyle = this.color;
		ctx.fillRect(transform.x, transform.y, transform.width, transform.height);
	}
}