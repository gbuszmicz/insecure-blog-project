function isValid(str){
  return !/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(str);
}

$('form[data-async]').on('submit', function(event) {
  event.preventDefault();
  $( ".message").removeClass("active");
  var $form = $(this);
  var $target = $form[0].action;

  var username = $("#username").val();
  var password = md5($("#password").val());
  if(!isValid(username)) {
    $( ".message").html("Special chars not allowed");
    $( ".message").addClass("active");
    return;
  }

  $.ajax({
    type: $form[0].method,
    url: $form[0].action,
    data: { username:username, password:password },

    success: function(data, status) {
      if(data.status == "Success") {
        window.location.href = data.redirect_to;
      }
      if(data.status == "Error") {
        $( ".message").html(data.message);
        $( ".message").addClass("active");
      }
    },
    error: function(err) {
      console.log(err)
    }
  });
  
});