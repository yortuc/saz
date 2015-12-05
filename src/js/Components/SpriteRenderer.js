import Behavior from '../Core/Behavior';
import Easing from '../utils/easing';
import Graphics from '../utils/graphics';

export default class SpriteRenderer extends Behavior {
	constructor(gameObject, data){
		super(gameObject);

		this.size = data.size || 36;
		this.transform = this.gameObject.getComponent("Transform");
		this.spriteSheet = data.spriteSheet;

		//this.elapsedTime = 0;
	}

	update(dt) {
		
		if(!this.spriteSheet) return;

		let ctx = Graphics.ctx;

		ctx.save();

		ctx.translate(this.transform.x - this.transform.width/2, this.transform.y - this.transform.height/2); 

		// shadow
		ctx.fillStyle = "#444";
		ctx.fillRect(
			2,
			2, 
			this.transform.width, 
			this.transform.height
		);

		ctx.drawImage(this.spriteSheet,0,0,this.size,this.size);

		ctx.restore();

	}

}
