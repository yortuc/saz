export default {
	init: function(){
		this.ctx = document.getElementById("canvas").getContext("2d");
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