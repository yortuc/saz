// GameObject

export default class GameObject {
	constructor(comp = []) {
		this.components = [];
		comp.map(
			c => this.addComponent(c)
		);
	}

	addComponent (component) {
		component.gameObject = this;
		console.log(component.constructor.name);
		component.init();
		this.components.push(component);
		return component;
	}

	add (component) {
		component.gameObject = this;
		component.init();
		this.components.push(component);
		return this;
	}

	getComponent (typeInfo){
		for(var i=0; i<this.components.length; i++){
			let c = this.components[i];
			if(c.constructor.name === typeInfo){
				return c;
			}
		}
	}

	getSiblings (){
		let parent = this.parent;
		if(!parent) return null;

		let siblings = parent.children.filter(s=> {
			return s !== this;
		}.bind(this));

		return siblings;
	}

	update (dt) { 
		this.components.map(c => c.update(dt));
	}
}