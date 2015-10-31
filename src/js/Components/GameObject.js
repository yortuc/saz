// GameObject

export default class GameObject {
	constructor(comp) {
		this.components = [];
		comp.map(
			c => this.addComponent(c)
		);
	}

	addComponent (component) {
		component.gameObject = this;
		this.components.push(component);
	}

	getComponent (typeInfo){
		for(var i=0; i<this.components.length; i++){
			let c = this.components[i];
			if(c.constructor.name === typeInfo){
				return c;
			}
		}
	}

	update (dt, ctx) { 
		//console.log(dt);
		this.components.map(c=> c.update(dt, ctx));
	}
}