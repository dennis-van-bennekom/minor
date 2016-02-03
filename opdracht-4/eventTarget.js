var EventTarget = function() {
  this._listeners = {};
}

EventTarget.prototype.addListener = function(a, c) {
  "undefined" == typeof this._listeners[a] && (this._listeners[a]=[]);
  this._listeners[a].push(c);
}

EventTarget.prototype.fire = function(a) {
  "string"==typeof a && (a={type:a});
  a.target || (a.target=this);
  if (!a.type) {
    throw Error("Event object missing 'type' property.");
  }

  if (this._listeners[a.type] instanceof Array) {
    for (var c = this._listeners[a.type], b = 0, d = c.length; b < d; b++) {
      c[b].call(this,a);
    }
  }
}

var ET = new EventTarget();