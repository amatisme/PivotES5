/** COMPONENT NOTE - 1.0.0 *****************************************************/
var note_html = '';
note_html += '<div>';
note_html += '<span data-ng-if=noteCtrl.label>{{noteCtrl.label}}:&nbsp;</span>';
note_html += '{{noteCtrl.detail}}';
note_html += '</div>';

var note_css = '';
note_css += '<style>';
note_css += 'note-component { display: block; position: relative; margin-bottom: 1rem; }';
note_css += 'note-component > div { background-color: RGB(250, 250, 210); padding: 1rem; font-family: monospace; }';
note_css += 'note-component > div > span { font-weight: bold; }';
note_css += '</style>';

function NoteComponentCtrl() {
  var noteCtrl = this;

  noteCtrl.Callback = function(index,obj) {
    noteCtrl.callbackFn({obj:obj});
  }
}
const noteComponent = {
  controller: NoteComponentCtrl,
  controllerAs: 'noteCtrl',
  bindings: {
    callbackFn: '&',
    label: '<?',
    detail: '<'
  },
  template: note_css + note_html
};
angular.module('app').component('noteComponent', noteComponent);