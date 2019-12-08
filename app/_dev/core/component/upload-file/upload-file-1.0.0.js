/** COMPONENT UPLOADFILE - 1.0.0 ***********************************************/
var uploadfile_html = '';
uploadfile_html += '<fieldset>';
uploadfile_html += '<ul class="ui-table">';
uploadfile_html += '<li class="ui-wrap-none">';
uploadfile_html += '<button data-ng-click="show=!show" data-ng-show=!show><i class="material-icons" data-ng-show=!show>photo</i> Add Photo</button>';
uploadfile_html += '<button data-ng-click="show=!show" data-ng-show=show><i class="material-icons">close</i></button>';
uploadfile_html += '</li>';
uploadfile_html += '<li class="ui-stretch">';
uploadfile_html += '<input class="ui-stretch ui-padding-small" id=uploads name=object type=file data-ng-model=uploadCtrl.object data-ng-show=show></input>';
uploadfile_html += '</li>';
uploadfile_html += '</ul>';
uploadfile_html += '</fieldset>';

var uploadfile_css = '';

function uploadfileComponentCtrl ($http)
{
  var uploadfileCtrl = this;

  //PROTOCOL METHODS FOR FORMS
  uploadfileCtrl.$onInit = function() {
    if(!uploadfileCtrl.uploads) uploadfileCtrl.uploads = []; //init object
  }
}
const uploadfileComponent = {
  controller: uploadfileComponentCtrl,
  controllerAs: 'uploadfileCtrl',
  bindings: {
    object: '=',
    label: '<',
    sublabel: '<?',
    required: '<?',
    placeholder: '<?'
  },
  template: uploadfile_css + uploadfile_html
};
angular.module('app').component('uploadfileComponent', uploadfileComponent);
