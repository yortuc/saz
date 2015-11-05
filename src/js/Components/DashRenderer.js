// RectangleRenderer 
import Graphics from '../utils/graphics';
import Behavior from './Behavior';

export default class RectangleRenderer extends Behavior {
	constructor(gameObject, data){
		super(gameObject);

		data = data || {};

		this.transform = this.gameObject.getComponent("Transform");
		this.color = data.color || "black";
		this.offset = 0;
		this.expand = data.expand || 1;
	}

	update(dt) {
		let ctx = Graphics.ctx;

		ctx.save();
		
		ctx.translate(this.transform.x - this.transform.width/2, this.transform.y - this.transform.height/2);
		ctx.strokeStyle = this.color;
		ctx.strokeWidth = 2;
		ctx.setLineDash([4, 2]);
		ctx.lineDashOffset = -this.offset;
		
		ctx.strokeRect(this.transform.width/2-this.expand,this.transform.height/2-this.expand, 
					   this.transform.width + 2*this.expand, this.transform.height + 2*this.expand);

		ctx.restore();

		this.offset++;
		if (this.offset > 16) {
			this.offset = 0;
		}
	}
}
