/********************************************************************************
** COMPONENT - TEXTAREALOG - 1.0.0 **********************************************
********************************************************************************/
var textarealog_html = '';
textarealog_html += '<fieldset>';
textarealog_html += '<legend>Log Changes:</legend>';
textarealog_html += '<ul>';
textarealog_html += '<li>';
textarealog_html += '<textarea name=textarealog-log maxlength=255 rows=3 placeholder={{textarealog.placeholder}} data-ng-model=textarealogCtrl.log></textarea><br/>';
textarealog_html += '<span>{{ textarealogCtrl.log.length ? (textarealogCtrl.log.length - 255) : 255 }}</span>';
textarealog_html += '</li>';
textarealog_html += '<li>';
textarealog_html += '<button type=button data-ng-if=textarealogCtrl.log data-ng-click=textarealogCtrl.Append()><i class="material-icons">add</i></button>';
textarealog_html += '</li>';
textarealog_html += '</ul>';
textarealog_html += '<div data-ng-if=textarealogCtrl.logs>';
textarealog_html += '<ul data-ng-repeat="each in textarealogCtrl.logs">';
textarealog_html += '<li><nobr><span>{{each.date_created | DynamicDate }}</span></nobr></li>';
textarealog_html += '<li style="width: 100%;"><span>{{each.entry}}</span></li>';
textarealog_html += '<li><span>{{each.username}}</span></li>';
textarealog_html += '</ul>';
textarealog_html += '</div>';
textarealog_html += '</fieldset>';

var textarealog_css = '';
textarealog_css += '<style>';
textarealog_css += 'textarealog-component { display: block; position: relative; width: 100%; }';
textarealog_css += 'textarealog-component > fieldset ul { display: table; width: 100%; }';
textarealog_css += 'textarealog-component > fieldset ul li { display: table-cell; vertical-align: top; }';
textarealog_css += 'textarealog-component > fieldset > ul > li:first-child { width: 100%; }';
textarealog_css += 'textarealog-component > fieldset > ul > li:first-child > textarea { width: 90%; }';
textarealog_css += 'textarealog-component > fieldset > ul > li:last-child { width: 1%; }';
textarealog_css += 'textarealog-component > fieldset > div { padding: 1rem; }';
textarealog_css += 'textarealog-component > fieldset > div > ul { border: none; }';
textarealog_css += 'textarealog-component > fieldset > div > ul > li:first-child { padding-right: 1rem; }';
textarealog_css += 'textarealog-component > fieldset > div > ul > li:last-child { padding-left: 1rem; }';
textarealog_css += '</style>';

function textarealogComponentCtrl ()
{
  var textarealogCtrl = this;
  
  textarealogCtrl.Append = function() {
    if(!textarealogCtrl.logs) textarealogCtrl.logs = [];
    textarealogCtrl.logs.push({
      date_created: new Date(),
      username: textarealogCtrl.username,
      entry: textarealogCtrl.log
    });
    textarealogCtrl.log = undefined;
    textarealogCtrl.object = textarealogCtrl.logs;
  }

  textarealogCtrl.callback = function(obj) {
    if(textarealogCtrl.callbackFn != undefined) textarealogCtrl.callbackFn({obj:textarealogCtrl.object});
  }
}

const textarealogComponent = {
  controller: textarealogComponentCtrl,
  controllerAs: 'textarealogCtrl',
  bindings: {
    callbackFn: '&?',
    username: '<',
    object: '='
  },
  template: textarealog_css + textarealog_html
};

angular.module('app').component('textarealogComponent', textarealogComponent);
