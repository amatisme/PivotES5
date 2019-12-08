/** COMPONENT RADIO - 1.0.0 ****************************************************/
var radio_html = '';
radio_html += '<fieldset>';
radio_html += '<legend class="font-medium" data-ng-if=radioCtrl.label>{{radioCtrl.label}}</legend>';
radio_html += '<ul class="ui-table">';
radio_html += '<li class="ui-stretch ui-padding-small-top ui-padding-small-bottom">';
radio_html += '<div class="ui-vertical-middle" data-ng-repeat="each in radioCtrl.options">';
radio_html += '<input type=radio name={{each.name}} value={{each.value}} data-ng-model=radioCtrl.object data-ng-required=radioCtrl.required data-ng-change=radioCtrl.callback(radioCtrl.object)>{{each.label}}</input>';
radio_html += '</div>';
radio_html += '</li>';
radio_html += '<li class="ui-padding-left" data-ng-if=radioCtrl.required>';
radio_html += '<i class="material-icons set" data-ng-if="radioCtrl.object">done</i>';
radio_html += '<i class="material-icons unset" data-ng-if="!radioCtrl.object">error_outline</i>';
radio_html += '</li>';
radio_html += '</ul>';
radio_html += '</fieldset>';

var radio_css = '';

function RadioComponentCtrl ()
{
  var radioCtrl = this;
  this.$onInit = function() {}

  radioCtrl.callback = function(obj) {
    if(radioCtrl.callbackFn) radioCtrl.callbackFn({obj:obj});
  }
}
const radioComponent = {
  controller: RadioComponentCtrl,
  controllerAs: 'radioCtrl',
  bindings: {
    callbackFn: '&?',
    object: '=',
    label: '<',
    sublabel: '<?',
    required: '<?',
    options: '<',
    name: '<'
  },
  template: radio_css + radio_html
};
angular.module('app').component('radioComponent', radioComponent);
