$('form[data-async]').on('submit', function(event) {
  event.preventDefault();
  $( ".message").removeClass("active");
  var $form = $(this);

  $.ajax({
    type: $form[0].method,
    url: $form[0].action,
    data: $form.serialize(),

    success: function(data, status) {
      if(data.status == "Success") {
        window.location.href = data.redirect_to;
      }
      if(data.status == "Error" || data.status == 400) {
        $( ".message").html(data.message);
        $( ".message").addClass("active");
      }
    },
    error: function(err) {
      if(err.status == 400) {
        $( ".message").html("Error 400 - "+err.statusText);
        $( ".message").addClass("active");
      }
      console.log(err)
    }
  });
  
});