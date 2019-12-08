/********************************************************************************
** COMPONENT - CHECKBOXAPPROVAL - 1.0.0 *****************************************
********************************************************************************/
var checkboxapproval_html = '';
checkboxapproval_html += '<fieldset>';
checkboxapproval_html += '<legend data-ng-if=checkboxapprovalCtrl.label>Approval</legend>';
checkboxapproval_html += '<ul>';
checkboxapproval_html += '<li>';
checkboxapproval_html += '<input type=checkbox name=checkbox-approver data-ng-model=checkboxapprovalCtrl.object data-ng-required=true></input>';
checkboxapproval_html += '</li>';
checkboxapproval_html += '<li>';
checkboxapproval_html += '<label style="font-weight:bold;">Yes, I acknowledge the approval of my Manager or Supervisor.</label>';
checkboxapproval_html += '<label type=disclaimer style="margin:.1em 0; font-size:0.9em;" data-ng-if=checkboxapprovalCtrl.object>{{checkboxapprovalCtrl.disclaimer}}</label>';
checkboxapproval_html += '</li>';
checkboxapproval_html += '<li>';
checkboxapproval_html += '<i class="material-icons set" data-ng-if="checkboxapprovalCtrl.object">done</i>';
checkboxapproval_html += '<i class="material-icons unset" data-ng-if="!checkboxapprovalCtrl.object">error_outline</i>';
checkboxapproval_html += '</li>';
checkboxapproval_html += '</ul>';
checkboxapproval_html += '</fieldset>';

var checkboxapproval_css = '';
checkboxapproval_css += '<style type="text/css">';
checkboxapproval_css += 'checkboxapproval-component { display: block; position: relative; width: 100%; }';
checkboxapproval_css += 'checkboxapproval-component > fieldset > ul { display: table; width:100%; }';
checkboxapproval_css += 'checkboxapproval-component > fieldset > ul > li { display: table-cell; width: 100%; vertical-align: top; }';
checkboxapproval_css += 'checkboxapproval-component > fieldset > ul > li:first-child { width: 1%; padding-right: 1em; }';
checkboxapproval_css += 'checkboxapproval-component > fieldset > ul > li:last-child { width: 1%; }';
checkboxapproval_css += 'checkboxapproval-component > fieldset > ul > li > input[checkbox] { width: 1em; height: 1em; }';
checkboxapproval_css += '</style>';

function CheckboxApprovalCtrl()
{
  var checkboxapprovalCtrl = this;
  this.disclaimer = "Upon submission of this form, a notification will be sent to your email plus your Manager or Supervisors email. A workflow will be initiated under your name and you assume responsibility for this submission and the consequent actions initiated.";
  
  checkboxapprovalCtrl.callback = function(obj) {
    if(checkboxapprovalCtrl.callbackFn != undefined) checkboxapprovalCtrl.callbackFn({obj:obj});
  }
}
const checkboxapprovalComponent = {
  controller: CheckboxApprovalCtrl,
  controllerAs: 'checkboxapprovalCtrl',
  bindings: {
    object: '='
  },
  template: checkboxapproval_css + checkboxapproval_html
};
angular.module('app').component('checkboxapprovalComponent', checkboxapprovalComponent);