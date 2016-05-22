/*
 * @status:   the status to return: Error or Success
 * @message:  message associated with @status
 * @obj:      optional more things to return
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
