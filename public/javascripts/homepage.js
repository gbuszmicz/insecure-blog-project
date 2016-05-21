

$('button').on('click', function(e) {
  var action = $(this).attr("data-action");
  var postId = $(this).attr("data-postid");
  var postLink = $(this).attr("data-link");
  if(action === 'edit') editPost(postLink);
  if(action === 'delete') deletePost(postId);
  return;
});

function editPost(postLink) {
  window.location= postLink+"/edit";
}

function deletePost(postId) {
  console.log(postId)
  if(confirm("Are you sure you want to delete this post?")) {
    var url = "/p/"+postId+"/delete"
    $.ajax({
      type: "GET",
      url: url,
      data: postId,

      success: function(data, status) {
        if(data.status == "Success") {
          $("#post-"+postId).remove();
        }
        if(data.status == "Error") {
          alert("Error removing post. Please try again")
        }
      },
      error: function(err) {
        console.log(err)
        alert(err)
      }
    });
  }
}