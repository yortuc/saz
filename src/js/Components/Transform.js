import Behavior from './Behavior';

// transform

export default class Transform extends Behavior {
	constructor(gameObject, data){
		super(gameObject);

		// private
		this._x = data.x;
		this._y = data.y;
		this.velocity = data.velocity || {x: 0, y: 0};
		this.width = data.width;
		this.height = data.height;
		this._rotation = data.rotation || 0; // degrees

		this.parent = this.gameObject.parent ? this.gameObject.parent.getComponent("Transform") : null;
	}

	update(dt){
		//
	}

	// @param vector : V2
	Translate(vector) {
		this.x += vector.x;
		this.y += vector.y;
	}

	get x(){
		if(this.parent){
			return this._x + (this.parent ? this.parent.x : 0);
		}
		else{
			return this._x + (this.parent ? this.parent.x : 0);
		}
		
	}

	set x(valueX){
		this._x = valueX;
	}

	get y(){
		return this._y + (this.parent ? this.parent.y : 0);
	}

	set y(valueY){
		this._y = valueY;
	}

	get rotation (){
		return this._rotation + (this.parent ? this.parent.rotation : 0);
	}

	set rotation (valueRotation){
		this._rotation = valueRotation;
	}
}