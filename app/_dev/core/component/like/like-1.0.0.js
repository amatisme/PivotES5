/** COMPONENT LIKE - 1.0.0 *****************************************************/
var like_html = '';
like_html += '<button data-ng-click=likeCtrl.LikeObject() data-ng-disabled=likeCtrl.IsLiked()><i class="material-icons">thumb_up</i> {{likeCtrl.object.likes.length}}</button>';
like_html += '<button data-ng-click=likeCtrl.UnlikeObject() data-ng-if=likeCtrl.IsLiked() data-ng-disabled=!likeCtrl.IsLiked()><i class="material-icons colorfg1 uiiconsmall">thumb_down</i> {{likeCtrl.object.dislikes.length}}</button>';

var like_css = '';

//CONTROLLER--------------------------------------------------------------------
function LikeComponentCtrl()
{
  var likeCtrl = this;

  likeCtrl.$onInit = function() {
  }

  likeCtrl.LikeObject = function() {
    var like = {};
    like.id = md5(Math.random() + new Date());
    console.log(likeCtrl.user);
    like.user = {};
    like.user.id = likeCtrl.user.id;
    like.user.first_name = likeCtrl.user.first_name;
    like.user.last_name = likeCtrl.user.last_name;
    like.date_created = new Date();

    if(!likeCtrl.object.likes) likeCtrl.object.likes = [];
    likeCtrl.object.likes.push(like);
    console.log(likeCtrl.object);
    likeCtrl.callbackFn({obj:likeCtrl.object});
  }

  likeCtrl.IsLiked = function() {
    var bool = false;
    angular.forEach(likeCtrl.object.likes, function(each) {
      if(each.user.id == likeCtrl.user.id) bool = true;
    });
    return bool;
  }

  likeCtrl.UnlikeObject = function() {
    console.log(likeCtrl.user);
    angular.forEach(likeCtrl.object.likes, function(each) {
      if(each.user.id == likeCtrl.user.id) likeCtrl.object.likes.pop(each);
    });
    console.log(likeCtrl.object.likes);
    likeCtrl.callbackFn({obj:likeCtrl.object});
  }
}
const likeComponent = {
  controller: LikeComponentCtrl,
  controllerAs: 'likeCtrl',
  bindings: {
    callbackFn: '&',
    user: '<',
    object: '='
  },
  template: like_css + like_html
};
angular.module('app').component('likeComponent', likeComponent);
