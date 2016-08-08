/**
 * Jin
 * [LocationHelper url辅助类]
 * @param {[type]} url [description]
 *
 * eq:
 *    var location = new LocationHelper();
 */
function LocationHelper( url ){
  var location =  document.createElement("a");
      location.href =  url ? url : window.location.href;

  this.url      = location.href.split('?')[0];
  this.hash     = location.hash;
  this.host     = location.host,
  this.hostname = location.hostname;
  this.href     = location.href;
  this.origin   = location.origin;
  this.pathname = location.pathname;
  this.port     = location.port;
  this.protocol = location.protocol;
  this.search   = location.search;
  this.source   = location;
  this.params   = {};
  this.setParams();
};
/**
 * [mergeParams 合并参数]
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
LocationHelper.prototype.mergeParams = function(params) {
    if ( ({}).toString.call(params) !== '[object Object]' ) return this;

    for (var name in params ) {
      if ( params.hasOwnProperty(name) ) {
        this.params[name] = params[name];
      }
    }
    return this;
};
/**
 * [setParams 设置参数]
 */
LocationHelper.prototype.setParams = function(params) {
  if ( ({}).toString.call(params) === '[object Object]' ) return this.mergeParams(params);

  var arr = [] , paramsArr = typeof params === 'string' ? params : this.search.replace(/^\?/,'').split('&');

  for ( var i = 0; i < paramsArr.length; i++ ) {
    arr = paramsArr[i].split('=');
    this.params[arr[0]] = arr[1];
  }
  return this;
};
/**
 * [getParams 获取参数]
 * @return {[type]} [description]
 */
LocationHelper.prototype.getParams = function() {
  return this.params;
};
/**
 * [serialize 序列化]
 * @param  {[type]} traditional [true : 传统的会添加到url后面，类似与get请求]
 * @return {[type]}             [description]
 */
LocationHelper.prototype.serialize = function(traditional) {
  if ( traditional ) {
    var result = [] , params = this.getParams();
    for (var name in params ) {
      if ( params.hasOwnProperty(name) ) {
        result.push(name+'='+params[name]);
      }
    }
    return this.url +'?'+ result.join('&');
  }
  return {url : this.url , params : this.getParams()};
};

module.exports = LocationHelper;
