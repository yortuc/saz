// GameObject

export default class GameObject {
	constructor(children=[]) {
		this.components = [];
		this.children = [];
		children.map( child => this.addChild(child) );
	}

	addComponent (component) {
		this.components.push(component);
		component.gameObject = this;
		return component;
	}

	addChild (child){
		this.children.push(child);
		child.parent = this;
		return child;
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
		this.components.map(c => c.update && c.update(dt));
		this.children.map(c => c.update && c.update(dt));
	}
}