/********************************************************************************
** COMPONENT - SELECTIMPACT - 1.0.0 *********************************************
********************************************************************************/
var selectimpact_html = '';
selectimpact_html += '<fieldset>';
selectimpact_html += '<legend data-ng-if=selectimpactCtrl.label>{{selectimpactCtrl.label}}</legend>';
selectimpact_html += '<ul>';
selectimpact_html += '<li>';
selectimpact_html += '<select name=select-businessunit data-ng-options="each as each.label for each in selectimpactCtrl.options" data-ng-model=selectimpactCtrl.object data-ng-required=selectimpactCtrl.required data-ng-disabled=selectimpactCtrl.disabled data-ng-change=selectimpactCtrl.Callback(selectimpactCtrl.object)>';
selectimpact_html += '<option value="">Select</option>';
selectimpact_html += '</select>';
selectimpact_html += '</li>';
selectimpact_html += '<li data-ng-if="selectimpactCtrl.required && !selectimpactCtrl.disabled">';
selectimpact_html += '<i class="material-icons set" data-ng-if="selectimpactCtrl.object">done</i>';
selectimpact_html += '<i class="material-icons unset" data-ng-if="!selectimpactCtrl.object">error_outline</i>';
selectimpact_html += '</li>';
selectimpact_html += '</ul>';
selectimpact_html += '</fieldset>';

var selectimpact_css = '';
selectimpact_css += '<style>';
selectimpact_css += 'selectimpact-component { display: block; position: relative; width: 100%; }';
selectimpact_css += 'selectimpact-component > fieldset > ul { display: table; width: 100%; }';
selectimpact_css += 'selectimpact-component > fieldset > ul > li { display: table-cell; }';
selectimpact_css += 'selectimpact-component > fieldset > ul > li:first-child { width: 100%; }';
selectimpact_css += '</style>';

function selectimpactComponentCtrl ($http)
{
  var selectimpactCtrl = this;

  selectimpactCtrl.$onInit = function() {
    $http.get('https://netservices.internal.ca/lib/TechnologyService.svc/json/kace/impact').then(function(response) {
      selectimpactCtrl.options = response.data.AllKaceImpactsResult.map(item => {
        return { 
          label: item.NAME,
          value: item.ID
        }
      }).sort();

      if(selectimpactCtrl.value) {
        selectimpactCtrl.object = selectimpactCtrl.options.filter(item => item.label == selectimpactCtrl.value)[0];
      }
    });
  }

  selectimpactCtrl.Callback = function(obj) {
    if(selectimpactCtrl.callbackFn != undefined) selectimpactCtrl.callbackFn({obj:obj});
  }
}

const selectimpactComponent = {
  controller: selectimpactComponentCtrl,
  controllerAs: 'selectimpactCtrl',
  bindings: {
    callbackFn: '&?',
    label: '<?',
    disabled: '<?',
    value: "<?",
    required: '<'
  },
  template: selectimpact_css + selectimpact_html
};

angular.module('app').component('selectimpactComponent', selectimpactComponent);
