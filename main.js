var addComment = function() {
  var $this = $(this);
  var $commentsContainer = $this.closest('.comments').find('.post-comments');
  var $commentContentInput = $this.siblings('.comment-content');
  var $commentAuthorInput = $this.siblings('.comment-author');
  var content = $commentContentInput.val();
  var author = $commentAuthorInput.val();

  $commentsContainer.append(createComment(content, author));

  $commentContentInput.val('');
  $commentAuthorInput.val('');
};

var createPost = function(content, author) {
  var postTemplate =
    '<div class="row post">' +
      '<div class="col-md-12">' +
        '<p class="post-content">' + content + '</p>' +
        '<div class="post-details">' +
          '<span class="post-author">Posted By: <strong>' + author + '</strong></span>' +
          '<span class="remove-post"><a href="#">remove</a></span>' +
          '<span class="edit-post"><a href="#">edit</a></span>' +
          '<span class="toggle-post-comments"><a href="#">comments</a></span>' +
        '</div>' +
        '<div class="edit-area hide">' +
          '<form action="#">' +
            '<input class="form-control edit-content" type="text">' +
            '<button class="btn btn-primary">Update</button>' +
          '</form>' +
        '</div>' +
        '<div class="comments hide">' +
          '<div class="post-comments">' +
          '</div>' +
          '<div class="add-comment">' +
            '<form action="#">' +
              '<input class="form-control comment-content" type="text" placeholder="Comment Text">' +
              '<input class="form-control comment-author" type="text" placeholder="Name">' +
              '<button class="btn btn-primary">Post Comment</button>' +
            '</form>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';

  var $post = $(postTemplate);

  $post.find('.add-comment button').click(addComment);
  $post.find('.edit-post a').click(toggleEditArea);
  $post.find('.toggle-post-comments a').click(toggleComments);
  $post.find('.remove-post a').click(removePost);
  $post.find('.edit-area button').click(editPost);

  return $post;
};

var createComment = function(content, author) {
  var commentTemplate =
    '<div class="post-comment">' +
      '<span class="post-comment-content">' + content + '</span>' +
      '<span class="post-comment-author"> - <strong>' + author + '</strong></span>' +
      '<span class="glyphicon glyphicon-remove"></span>' +
    '</div>';

  var $comment = $(commentTemplate);

  $comment.find('.glyphicon-remove').click(removeComment);

  return $comment;
};

var editPost = function() {
  var $this = $(this);
  var updatedPost = $this.siblings('input').val();
  var $postContent = $this.closest('.edit-area').siblings('.post-content');
  var $editArea = $this.closest('.edit-area');

  $postContent.empty();
  $postContent.text(updatedPost);

  $editArea.addClass('hide');
};

var toggleComments = function() {
  var $commentsContainer = $(this).closest('.post-details').siblings('.comments');

  $commentsContainer.toggleClass('hide');
};

var toggleEditArea = function() {
  var $editArea = $(this).closest('.post-details').siblings('.edit-area');
  var postContent = $editArea.siblings('.post-content').html();
  var $editInput = $editArea.find('.edit-content');

  $editArea.toggleClass('hide');
  $editInput.val(postContent);
};

var removePost = function() {
  $(this).closest('.post').remove();
};

var removeComment = function() {
  $(this).closest('.post-comment').remove();
};

var $postsContainer = $('.posts');

// when user clicks Post, create post template and add to posts
$('#new-post-post').click('click', function() {
  var $postContentInput = $('#new-post-content');
  var $postAuthorInput = $('#new-post-author');

  $postsContainer.append(createPost($postContentInput.val(), $postAuthorInput.val()));

  $postContentInput.val('');
  $postAuthorInput.val('');
});
