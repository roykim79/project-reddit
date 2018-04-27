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
        '<p class="post-content">' +content + '</p>' +
        '<div class="post-details">' +
          '<span class="post-author">Posted By: <strong>' + author + '</strong></span>' +
          '<span class="remove-post"><a href="#">remove</a></span>' +
          '<span class="toggle-post-comments"><a href="#">comments</a></span>' +
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

  $post.find('button').click(addComment);
  $post.find('.toggle-post-comments a').click(toggleComments);
  $post.find('.remove-post a').click(removePost);

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

var toggleComments = function() {
  var $this = $(this);
  var $commentsContainer = $this.closest('.post-details').siblings('.comments');

  $commentsContainer.toggleClass('hide');
};

var removePost = function() {
  $(this).closest('.post').remove();
};

var removeComment = function() {
  $(this).closest('.post-comment').remove();
};

var $postsContainer = $('.posts');

// when user clicks Post, create post template and add to posts
$('#new-post-post').on('click', function() {
  var $postContentInput = $('#new-post-content');
  var $postAuthorInput = $('#new-post-author');

  $postsContainer.append(createPost($postContentInput.val(), $postAuthorInput.val()));

  $postContentInput.val('');
  $postAuthorInput.val('');
});
