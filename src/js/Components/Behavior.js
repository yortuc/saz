export default class Behavior {
	constructor(gameObject) {
		this.gameObject = gameObject;
		this.gameObject.addComponent(this);
	}
}