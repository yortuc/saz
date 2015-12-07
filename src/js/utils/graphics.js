import Geometry from './geometry';

export default {
	init: function(width, height){
		this.width = width;
		this.height = height;

		this.canvas = document.getElementById("canvas");
		this.ctx = canvas.getContext("2d");

		this.bgImage = null;
	},

	clearScene: function(){
		this.ctx.clearRect(0, 0, this.width, this.height);

		if(this.bgImage) {
			this.ctx.drawImage(bgImage, 0,0, this.canvas.width, this.canvas.height);
		}
	},

	setSceneBg: function(bgImage) {
		this.bgImage = bgImage;
	},

	line: function (p1, p2, color) {
		this.ctx.save();
		this.ctx.strokeStyle = color || "red";
		this.ctx.beginPath();
		this.ctx.moveTo(p1.x,p1.y);
		this.ctx.lineTo(p2.x,p2.y);
		this.ctx.stroke();
		this.ctx.restore();
	}
}