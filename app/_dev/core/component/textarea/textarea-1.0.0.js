/********************************************************************************
** COMPONENT - TEXTAREA - 1.0.0 *************************************************
********************************************************************************/
var textarea_html = '';
textarea_html += '<fieldset>';
textarea_html += '<legend data-ng-if=textareaCtrl.label>{{textareaCtrl.label}}</legend>';
textarea_html += '<ul>';
textarea_html += '<li>';
textarea_html += '<textarea name={{textareaCtrl.name}} maxlength={{textareaCtrl.maxlength}} rows={{textareaCtrl.rows}} placeholder={{textareaCtrl.placeholder}} data-ng-model=textareaCtrl.object data-ng-required=textareaCtrl.required data-ng-disabled=textareaCtrl.disabled></textarea>';
textarea_html += '<span data-ng-show="textareaCtrl.object.length != textareaCtrl.maxlength">{{ textareaCtrl.object.length ? (textareaCtrl.maxlength - textareaCtrl.object.length) : textareaCtrl.maxlength }}/{{textareaCtrl.maxlength}}</span>';
textarea_html += '</li>';
textarea_html += '<li data-ng-if="textareaCtrl.required && !textareaCtrl.disabled">';
textarea_html += '<i class="material-icons" data-ng-show="textareaCtrl.object.length == textareaCtrl.maxlength">error_outline</i>';
textarea_html += '</li>';
textarea_html += '<li data-ng-if="textareaCtrl.required && !textareaCtrl.disabled">';
textarea_html += '<i class="material-icons set" data-ng-if="textareaCtrl.object">done</i>';
textarea_html += '<i class="material-icons unset" data-ng-if="!textareaCtrl.object">error_outline</i>';
textarea_html += '</li>';
textarea_html += '<li data-ng-if=textareaCtrl.disabled>';
textarea_html += '<i class="material-icons" title="Owner Editable Only">block</i>';
textarea_html += '</li>';
textarea_html += '</ul>';
textarea_html += '</fieldset>';

var textarea_css = '';
textarea_css += '<style>';
textarea_css += 'textarea-component { display: block; position: relative; }';
textarea_css += 'textarea-component > fieldset { margin: 0 0 1em 0; }';
textarea_css += 'textarea-component > fieldset > ul { display: table; width: 100%; }';
textarea_css += 'textarea-component > fieldset > ul > li { display: table-cell; vertical-align:top; }';
textarea_css += 'textarea-component > fieldset > ul > li > textarea { width: 100%; }';
textarea_css += 'textarea-component > fieldset > ul > li:first-child { width: 100%; }';
textarea_css += 'textarea-component > fieldset > ul > li:last-child { width: 1%; }';
textarea_css += '</style>';

function TextareaComponentCtrl ()
{
  var textareaCtrl = this;
  textareaCtrl.$onInit = function() {
    if(!textareaCtrl.rows) textareaCtrl.rows = 8;
    if(!textareaCtrl.maxlength) textareaCtrl.maxlength = 140;
  }
  textareaCtrl.callback = function(obj) {
    if(textareaCtrl.callbackFn != undefined) textareaCtrl.callbackFn({obj:textareaCtrl.object});
  }
}
const textareaComponent = {
  controller: TextareaComponentCtrl,
  controllerAs: 'textareaCtrl',
  bindings: {
    callbackFn: '&?',
    object: '=',
    label: '<',
    disabled: '<?',
    required: '<?',
    placeholder: '<?',
    rows: '<?',
    maxlength: '<?'
  },
  template: textarea_css + textarea_html
};
angular.module('app').component('textareaComponent', textareaComponent);