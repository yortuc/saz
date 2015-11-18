import Geometry from './geometry';

export default {
	init: function(width, height){
		this.width = width;
		this.height = height;

		this.ctx = document.getElementById("canvas").getContext("2d");
	},

	clearScene: function(){
		this.ctx.clearRect(0, 0, this.width, this.height);
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