/********************************************************************************
** COMPONENT - SELECTAUDIENCE - 1.0.0 *******************************************
********************************************************************************/
var selectaudience_html = '';
selectaudience_html += '<fieldset>';
selectaudience_html += '<legend data-ng-if=selectaudienceCtrl.label>{{selectaudienceCtrl.label}}</legend>';
selectaudience_html += '<ul>';
selectaudience_html += '<li>';
selectaudience_html += '<select name=selectaudience data-ng-model=selectaudienceCtrl.object data-ng-required=selectaudienceCtrl.required data-ng-disabled=selectaudienceCtrl.disabled data-ng-change=selectaudienceCtrl.callback(selectaudienceCtrl.object)>';
selectaudience_html += '<option value="">Select</option>';
selectaudience_html += '<option value="{{each}}" data-ng-selected="{{each == selectaudienceCtrl.object}}" data-ng-repeat="each in selectaudienceCtrl.options">{{each.label}}</option>';
selectaudience_html += '</select>';
selectaudience_html += '</li>';
selectaudience_html += '<li data-ng-if="selectaudienceCtrl.required && !selectaudienceCtrl.disabled">';
selectaudience_html += '<i class="material-icons set" data-ng-if="selectaudienceCtrl.object">done</i>';
selectaudience_html += '<i class="material-icons unset" data-ng-if="!selectaudienceCtrl.object">error_outline</i>';
selectaudience_html += '</li>';
selectaudience_html += '</ul>';
selectaudience_html += '</fieldset>';

var selectaudience_css = '';
selectaudience_css += '<style>';
selectaudience_css += 'selectaudience-component { display: block; position: relative; }';
selectaudience_css += 'selectaudience-component > fieldset > ul { display: table; width:100%; }';
selectaudience_css += 'selectaudience-component > fieldset > ul > li { display: table-cell; }';
selectaudience_css += 'selectaudience-component > fieldset > ul > li:first-child { width: 100%; }';
selectaudience_css += '</style>';

function selectaudienceCtrl($http)
{
  var selectaudienceCtrl = this;

  selectaudienceCtrl.$onInit = function() {
    $http.get('https://netservices.internal.ca/lib/ProjectService.svc/json/project/audience').then(function(response) {
      var data = response.data;
      selectaudienceCtrl.options = data.map(function(obj) {
        return {
          id:obj.AudienceID,
          label:obj.Label,
          value:obj.Value
        }});
    });
  }
  selectaudienceCtrl.callback = function(obj) {
    if(selectaudienceCtrl.callbackFn !=undefined) selectaudienceCtrl.callbackFn({obj:obj});
  }
}

const selectaudienceComponent = {
  controller: selectaudienceCtrl,
  controllerAs: 'selectaudienceCtrl',
  bindings: {
    callbackFn: '&?',
    label: '<',
    disabled: '<?',
    required: '<'
  },
  template: selectaudience_css + selectaudience_html
};

angular.module('app').component('selectaudienceComponent', selectaudienceComponent);
