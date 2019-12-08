/********************************************************************************
** COMPONENT - TEXTFIELD - 1.0.0 ************************************************
********************************************************************************/
var textfield_html = '';
textfield_html += '<fieldset>';
textfield_html += '<legend data-ng-if=textfieldCtrl.label>{{textfieldCtrl.label}}</legend>';
textfield_html += '<ul>';
textfield_html += '<li>';
textfield_html += '<input class="ui-stretch" type="{{textfieldCtrl.password ? \'password\' : \'text\'}}" name={{textfieldCtrl.name}} maxlength={{textfieldCtrl.maxlength}} placeholder={{textfieldCtrl.placeholder}} data-ng-model=textfieldCtrl.object data-ng-required=textfieldCtrl.required data-ng-pattern=textfieldCtrl.pattern data-ng-disabled=textfieldCtrl.disabled data-ng-change=textfieldCtrl.callback(textfieldCtrl.object) onkeydown="if(event.keyCode == 13) { return false;}" />';
textfield_html += '<span data-ng-if=textfieldCtrl.maxlength data-ng-show="textfieldCtrl.object.length != textfieldCtrl.maxlength">{{ textfieldCtrl.object.length ? (textfieldCtrl.maxlength - textfieldCtrl.object.length) : textfieldCtrl.maxlength }}/{{textfieldCtrl.maxlength}}</span>';
textfield_html += '</li>';
textfield_html += '<li data-ng-if="textfieldCtrl.validate">';
textfield_html += '<i class="material-icons set" data-ng-if="textfieldCtrl.object">done</i>';
textfield_html += '<i class="material-icons unset" data-ng-if="!textfieldCtrl.object" title="Format must match {{textfieldCtrl.validate}}">warning</i>';
textfield_html += '</li>';
textfield_html += '<li data-ng-if="textfieldCtrl.required && !textfieldCtrl.disabled">';
textfield_html += '<i class="material-icons set" data-ng-if="textfieldCtrl.object">done</i>';
textfield_html += '<i class="material-icons unset" data-ng-if="!textfieldCtrl.object" title="Required item">error_outline</i>';
textfield_html += '</li>';
textfield_html += '<li data-ng-if=textfieldCtrl.disabled>';
textfield_html += '<i class="material-icons" title="Owner Editable Only">block</i>';
textfield_html += '</li>';
textfield_html += '</ul>';
textfield_html += '</fieldset>';

var textfield_css = '';
textfield_css += '<style>';
textfield_css += 'textfield-component { display: block; position: relative; }';
textfield_css += 'textfield-component > fieldset > ul { display: table; width: 100%; border-bottom-style: solid; border-bottom-width: 1px; }';
textfield_css += 'textfield-component > fieldset > ul > li { display: table-cell; }';
textfield_css += 'textfield-component > fieldset > ul > li:first-child { width: 100%; }';
textfield_css += 'textfield-component > fieldset > ul > li:last-child { width: 1%; }';
textfield_css += '</style>';

function TextFieldComponentCtrl ()
{
  var textfieldCtrl = this;
  this.$onInit = function() {
    textfieldCtrl.type = 'text'; //default
    switch(textfieldCtrl.validate) {
      case 'email':
        textfieldCtrl.pattern = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
        textfieldCtrl.placeholder = "example@domain.com";
        break;
      case 'phone':
        textfieldCtrl.pattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        textfieldCtrl.placeholder = "10 digits 1234567890";
        break;
      case 'integer':
          textfieldCtrl.pattern = /^\d+$/;
          textfieldCtrl.placeholder = "eg. 123";
          break;
      case 'currency':
          textfieldCtrl.pattern = /^\$?(([1-9]\d{0,2}(,\d{3})*)|0)?\.\d{1,2}$/;
          textfieldCtrl.placeholder = "eg. 100,000.00";
          break;
      default:
        textfieldCtrl.pattern = undefined;
      break;

    }
  }

  textfieldCtrl.callback = function(obj) {
    if(textfieldCtrl.callbackFn != undefined) textfieldCtrl.callbackFn({obj:obj});
  }
}

const textfieldComponent = {
  controller: TextFieldComponentCtrl,
  controllerAs: 'textfieldCtrl',
  bindings: {
    callbackFn: '&?',
    object: '=',
    label: '<',
    password: '<?',
    sublabel: '<?',
    disabled: '<?',
    required: '<?',
    validate: '<?',
    placeholder: '<?',
    maxlength: '<?'
  },
  template: textfield_css + textfield_html
};

angular.module('app').component('textfieldComponent', textfieldComponent);
