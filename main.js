var data = { posts: [] };
// keep track of which post is being viewed in the post-view
var highlightedPostIndex = null;
var STORAGE_ID = 'project-reddit';

var saveToLocalStorage = function () {
  localStorage.setItem(STORAGE_ID, JSON.stringify(data));
};

var getFromLocalStorage = function () {
  return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
};

// push new comment to comments array of the post cooresponding to postIndex
var addComment = function(el) {
  var $commentContentInput = el.siblings('.comment-content');
  var $commentAuthorInput = el.siblings('.comment-author');
  var content = $commentContentInput.val();
  var author = $commentAuthorInput.val();
  var postIndex = el.closest('.post').data('post-index');

  data.posts[postIndex].comments.push({
    content: $commentContentInput.val(),
    author: $commentAuthorInput.val()
  });

  $commentContentInput.val('');
  $commentAuthorInput.val('');
};

var editPost = function(el) {
  var updatedPost = el.siblings('input').val();
  var postIndex = el.closest('.post').data('post-index');
  var $editArea = el.closest('.edit-area');

  data.posts[postIndex].content = updatedPost;
};

var toggleComments = function(el) {
  var $commentsContainer = el.closest('.post-details').siblings('.comments');

  $commentsContainer.toggleClass('hide');
};

var toggleEditArea = function(el) {
  var $editArea = el.closest('.post-details').siblings('.edit-area');
  var postContent = $editArea.siblings('.post-content').html();
  var $editInput = $editArea.find('.edit-content');

  $editArea.toggleClass('hide');
};

var toggleViews = function() {
  $('.posts-view').toggleClass('hide');
  $('.post-view').toggleClass('hide');
};

var removePost = function(el) {
  var postIndex = el.closest('.post').data('post-index');

  data.posts.splice(postIndex, 1);
};

var removeComment = function(el) {
  var postIndex = el.closest('.post').data('post-index');
  var commentIndex = el.closest('.post-comment').data('comment-index');

  data.posts[postIndex].comments.splice(commentIndex, 1);
};

var updatePostView = function(postIndex) {
  var commentsSource = $('#comments-template').html();
  var commentsTemplate = Handlebars.compile(commentsSource);
  var $commentsContainer = $('.post-view .post-comments');
  var commentsData = {comments: data.posts[postIndex].comments};
  var newHTML = commentsTemplate(commentsData);
  var $postViewPostContent = $('.post-view .post-content');

  $postViewPostContent.empty().append(data.posts[postIndex].content);
  $commentsContainer.empty().append(newHTML);
};

var updatePostsView = function() {
  var postSource = $('#post-template').html();
  var postTemplate = Handlebars.compile(postSource);
  var $postsContainer = $('.posts');
  var newHTML = postTemplate(data);

  $postsContainer.empty();

  $postsContainer.append(newHTML);

  saveToLocalStorage();
};

var $postsContainer = $('.posts');
var $postView = $('.post-view');

// when user clicks Post, push new post to data.posts
$('#new-post-post').click('click', function() {
  var $postContentInput = $('#new-post-content');
  var $postAuthorInput = $('#new-post-author');

  data.posts.push({
    content: $postContentInput.val(),
    author: $postAuthorInput.val(),
    comments: []
  });

  updatePostsView();

  $postContentInput.val('');
  $postAuthorInput.val('');
});

// toggle comments when user clicks on toggle-post-comments link
$postsContainer.on('click', '.toggle-post-comments a', function() {
  toggleComments($(this));
});

$postsContainer.on('click', '.edit-post a', function() {
  toggleEditArea($(this));
});

$postsContainer.on('click', '.add-comment button', function() {
  addComment($(this));
  updatePostsView();
});

$postsContainer.on('click', '.glyphicon-remove', function() {
  removeComment($(this));
  updatePostsView();
});

$postsContainer.on('click', '.remove-post a', function() {
  removePost($(this));
  updatePostsView();
});

$postsContainer.on('click', '.edit-area button', function() {
  editPost($(this));
  toggleEditArea($(this));
  updatePostsView();
});

// view selected post in 'another' view using data-post-index
$postsContainer.on('click', '.post-content', function() {
  var postIndex = $(this).closest('.post').data('post-index');

  highlightedPostIndex = postIndex

  toggleViews();
  updatePostView(postIndex);
});

// remove a comment from the post-view
$postView.on('click', '.glyphicon-remove', function() {
  var commentsIndex = $(this).closest('.post-comment').data('comment-index');

  data.posts[highlightedPostIndex].comments.splice(commentsIndex, 1);

  updatePostsView();
  updatePostView(highlightedPostIndex);
});

// add a comment from the post-view
$postView.on('click', 'button', function() {
  var $commentContentInput = $(this).siblings('.comment-content');
  var $commentAuthorInput = $(this).siblings('.comment-author');

  data.posts[highlightedPostIndex].comments.push({
    content: $commentContentInput.val(),
    author: $commentAuthorInput.val()
  });

  $commentContentInput.val('');
  $commentAuthorInput.val('');

  updatePostsView();
  updatePostView(highlightedPostIndex);
});

$('.back-to-posts').click(function() {
  toggleViews();
});

$(document).ready(function() {
  data = getFromLocalStorage();
  updatePostsView();
});
