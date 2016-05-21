/*
 * @status: the status to return: Error or Success generally
 * @message: message asociated to the status
 * @obj: option more thing to return
 */
var returnJson = function(status, message, obj) {
  var json = {
    status: status,
    message: message
  }
  // Merge json with obj
  if(obj) {
    for (var attrname in obj) { 
      json[attrname] = obj[attrname] 
    }
  }
  return json;
}
module.exports = returnJson;
