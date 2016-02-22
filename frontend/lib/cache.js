var Link = function (key, value, prev, next) {
  this.key = key
  this.value = value
  this.prev = prev
  this.next = next
}

var List = function () {
  this.head = new Link();
  this.tail = new Link();
  this._connect(this.head, this.tail)
}

List.prototype._connect = function (link1, link2) {
  link1.next = link2;
  link2.prev = link1
}

List.prototype.empty = function () {
  return this.head.next === this.tail
}

List.prototype.first = function () {
  if (this.empty()) {
    return undefined;
  }

  return this.head.next;
}

List.prototype.last = function () {
  if (this.empty()) {
    return undefined;
  }

  return this.tail.prev;
}

List.prototype.push = function (key, value) {
  var link = new Link(key, value)
  var tail = this.tail;
  var prev = this.tail.prev;

  this._connect(prev, link)
  this._connect(link, tail)

  return link;
}

List.prototype.shift = function () {
  return this.remove(this.first());
}

List.prototype.remove = function (link) {
  this._connect(link.prev, link.next)

  link.next = null;
  link.prev = null;

  return link;
}

var Cache = function (maxLength) {
  this.store = new List();
  this.map = {};
  this.max = maxLength
  this.length = 0;
}

Cache.prototype.includes = function (key) {
  return !!this.map[key]
}

Cache.prototype.remove = function (key) {
  link = this.store.remove(this.map[key])
  delete this.map[key]
  this.length --;
  return link
}

Cache.prototype.add = function (key, value) {
  if (this.includes(key)) {
    this.remove(key)
  }

  var link = this.store.push(key, value);
  this.map[key] = link
  this.length ++;

  if (this.length > this.max) {
    this._eject()
    this.length -- ;
  }

  return link;
}

Cache.prototype._eject = function () {
  var link = this.store.shift()
  delete this.map[link.key];
}

module.exports = Cache
