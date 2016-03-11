//Define some LINQ like functions that will help us write more neat code.
var linqFunctions = {
	linqWhere : function(whr){
		var result = new Array();
		for (var i = 0; i < this.length; i++){
			if (whr(this[i]))
				result.push(this[i]);
		}
		return result;
	},
	linqAny : function(whr){
		if (typeof whr !== "function"){
			return this.length > 0;
		}
		for (var i = 0; i < this.length; i++){
			if (whr(this[i]))
				return true;
		}
		return false;
	},
	linqAll : function(whr){
		for (var i = 0; i < this.length; i++){
			if (!whr(this[i]))
				return false;
		}
		return true;
	},
	linqFirstOrDefault : function(whr){
		if (typeof whr !== "function"){
			return this.length > 0 ? this[0] : null;
		}
		for (var i = 0; i < this.length; i++){
			if (whr(this[i]))
				return this[i];
		}
		return null;
	},	
	linqSingleOrDefault : function(whr){
		if (typeof whr !== "function"){
			if (this.length == 1)
				return this[0];
			return null;
		}
		for (var i = 0; i < this.length; i++){
			if (whr(this[i]))
				return this[i];
		}
		return null;
	},
	linqSingle : function(whr){
		var result = this.singleOrDefault(whr);
		if (result == null)
			throw {};
		return result;
	},
	linqSelectMany : function(sel){
		var result = new Array();
		for(var i = 0; i < this.length; i++){
			var item = this[i];
			var subArr = sel(item) || new Array();
			result = result.concat(subArr);
		}
		return result;
	},
	linqSelect : function(sel){
		var result = new Array();
		for(var i = 0; i < this.length; i++){
			result.push(sel(this[i]));
		}
		return result;
	},
	linqSkip : function(count){
		var result = new Array();
		for(var i = Math.min(count, this.length); i < this.length; i++){
			result.push(this[i]);
		}
		return result;
	},
	linqTake : function(count){
		var result = new Array();
		for(var i = 0; i < Math.min(count, this.length); i++){
			result.push(this[i]);
		}
		return result;
	},
	linqExcept : function(a) {
		return this.filter(function(i) {return a.indexOf(i) < 0;});
	},
	linqDistinct : function(){
		return this.filter(function(value, index, self) {
			return self.indexOf(value) === index;
		});
	},
	linqSum : function(sel){
		var result = this;
		if (typeof sel === "function")
			result = result.select(sel);
			
		return result.reduce(function(a, b) {
			return a + b;
		});
	},
	linqOrderBy : function(ord){
		return this.sort(function(a,b){
			var first = a;
			var second = b;
			if (typeof ord === "function"){
				first = ord(a);
				second = ord(b);
			}
			if (typeof first === "string"){
				first = first.toLowerCase();
				second = second.toLowerCase();
				
				return first < second ? -1 : first > second ? 1 : 0;
			}
			return first - second;
		});
	},
	linqOrderByDesc : function(ord){
		return this.orderBy(ord).reverse();
	},
	linqCount: function(whr){
		if (typeof whr === "function")
			return this.where(whr).length;
		return this.length;
	},
	linqIntersect: function(collection){
		var result = new Array();
		for(var i = 0; i < this.length; i++){
			if (collection.indexOf(this[i]) > -1)
				result.push(this[i]);
		}
		return result;
	}
};

function getLinqOperationName(str){
	str = str.replace('linq', '');
	if (str.length <= 1) {
        str = str.toLowerCase();
    } else {
        str = str.substring(0, 1).toLowerCase() + str.substring(1);
    }
	return str;
}

if (typeof Object.defineProperty == 'function'){
	try {
		for(var i in linqFunctions){
			Object.defineProperty(Array.prototype, getLinqOperationName(i), {
				value: linqFunctions[i],
				enumerable: false
			});
		}
	}catch(e){
	};
}

for(var i in linqFunctions){
	var linqOperationName = getLinqOperationName(i);
	if (!Array.prototype[linqOperationName])
		Array.prototype[linqOperationName] = linqFunctions[i];
}