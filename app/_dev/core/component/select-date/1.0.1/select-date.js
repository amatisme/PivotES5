/********************************************************************************
** COMPONENT - SELECTDATE - 1.0.1 ***********************************************
********************************************************************************/
var selectdate_html = '';
selectdate_html += '<fieldset>';
selectdate_html += '<legend data-ng-if=selectdateCtrl.label>{{selectdateCtrl.label}}</legend>';
selectdate_html += '<ul>';
selectdate_html += '<li>';
selectdate_html += '<input type=hidden name=select-date data-ng-model=selectdateCtrl.object data-ng-required="selectdateCtrl.required && !selectdateCtrl.disabled" />';
selectdate_html += '<select name=select-date-yyyy data-ng-model=selectdateCtrl.yyyy data-ng-options="each as each for each in selectdateCtrl.years" data-ng-change=selectdateCtrl.UpdateYear() data-ng-disabled=selectdateCtrl.disabled>';
selectdate_html += '<option value="">Year</option>';
selectdate_html += '</select>';
selectdate_html += '<select name=select-date-mm data-ng-model=selectdateCtrl.mm data-ng-options="each.value as each.label for each in selectdateCtrl.months" data-ng-change="selectdateCtrl.UpdateMonth();" data-ng-show=selectdateCtrl.yyyy data-ng-disabled=selectdateCtrl.disabled>';
selectdate_html += '<option value="">Month</option>';
selectdate_html += '</select>';
selectdate_html += '<select name=select-date-dd data-ng-model=selectdateCtrl.dd data-ng-options="each as each for each in selectdateCtrl.days" data-ng-change=selectdateCtrl.UpdateDay() data-ng-show=selectdateCtrl.mm data-ng-disabled=selectdateCtrl.disabled>';
selectdate_html += '<option value="">Day</option>';
selectdate_html += '</select>';
selectdate_html += '<select data-ng-if=selectdateCtrl.time name=select-time-hour data-ng-model=selectdateCtrl.hour data-ng-change=selectdateCtrl.UpdateObjectTime() data-ng-show=selectdateCtrl.dd data-ng-disabled=selectdateCtrl.disabled>';
selectdate_html += '<option value="">Hour</option>';
selectdate_html += '<option value="01" data-ng-selected="{{\'01\' == selectdateCtrl.hour}}">1 a.m.</option>';
selectdate_html += '<option value="02" data-ng-selected="{{\'02\' == selectdateCtrl.hour}}">2 a.m.</option>';
selectdate_html += '<option value="03" data-ng-selected="{{\'03\' == selectdateCtrl.hour}}">3 a.m.</option>';
selectdate_html += '<option value="04" data-ng-selected="{{\'04\' == selectdateCtrl.hour}}">4 a.m.</option>';
selectdate_html += '<option value="05" data-ng-selected="{{\'05\' == selectdateCtrl.hour}}">5 a.m.</option>';
selectdate_html += '<option value="06" data-ng-selected="{{\'06\' == selectdateCtrl.hour}}">6 a.m.</option>';
selectdate_html += '<option value="07" data-ng-selected="{{\'07\' == selectdateCtrl.hour}}">7 a.m.</option>';
selectdate_html += '<option value="08" data-ng-selected="{{\'08\' == selectdateCtrl.hour}}">8 a.m.</option>';
selectdate_html += '<option value="09" data-ng-selected="{{\'09\' == selectdateCtrl.hour}}">9 a.m.</option>';
selectdate_html += '<option value="10" data-ng-selected="{{\'10\' == selectdateCtrl.hour}}">10 a.m.</option>';
selectdate_html += '<option value="11" data-ng-selected="{{\'11\' == selectdateCtrl.hour}}">11 a.m.</option>';
selectdate_html += '<option value="00" data-ng-selected="{{\'00\' == selectdateCtrl.hour}}">12 a.m.</option>';
selectdate_html += '<option value="13" data-ng-selected="{{\'13\' == selectdateCtrl.hour}}">1 p.m.</option>';
selectdate_html += '<option value="14" data-ng-selected="{{\'14\' == selectdateCtrl.hour}}">2 p.m.</option>';
selectdate_html += '<option value="15" data-ng-selected="{{\'15\' == selectdateCtrl.hour}}">3 p.m.</option>';
selectdate_html += '<option value="16" data-ng-selected="{{\'16\' == selectdateCtrl.hour}}">4 p.m.</option>';
selectdate_html += '<option value="17" data-ng-selected="{{\'17\' == selectdateCtrl.hour}}">5 p.m.</option>';
selectdate_html += '<option value="18" data-ng-selected="{{\'18\' == selectdateCtrl.hour}}">6 p.m.</option>';
selectdate_html += '<option value="19" data-ng-selected="{{\'19\' == selectdateCtrl.hour}}">7 p.m.</option>';
selectdate_html += '<option value="20" data-ng-selected="{{\'20\' == selectdateCtrl.hour}}">8 p.m.</option>';
selectdate_html += '<option value="21" data-ng-selected="{{\'21\' == selectdateCtrl.hour}}">9 p.m.</option>';
selectdate_html += '<option value="22" data-ng-selected="{{\'22\' == selectdateCtrl.hour}}">10 p.m.</option>';
selectdate_html += '<option value="23" data-ng-selected="{{\'23\' == selectdateCtrl.hour}}">11 p.m.</option>';
selectdate_html += '<option value="12" data-ng-selected="{{\'12\' == selectdateCtrl.hour}}">12 p.m.</option>';
selectdate_html += '</select>';
selectdate_html += '<select data-ng-if=selectdateCtrl.time name=select-time-min data-ng-model=selectdateCtrl.min data-ng-show=selectdateCtrl.hour data-ng-change=selectdateCtrl.UpdateObjectTime() data-ng-disabled=selectdateCtrl.disabled>';
selectdate_html += '<option value="">Minute</option>';
selectdate_html += '<option value="00" data-ng-selected="{{\'00\' == selectdateCtrl.min}}">00</option>';
selectdate_html += '<option value="15" data-ng-selected="{{\'15\' == selectdateCtrl.min}}">15</option>';
selectdate_html += '<option value="30" data-ng-selected="{{\'30\' == selectdateCtrl.min}}">30</option>';
selectdate_html += '<option value="45" data-ng-selected="{{\'45\' == selectdateCtrl.min}}">45</option>';
selectdate_html += '</select>';
selectdate_html += '</li>';
selectdate_html += '<li data-ng-if="selectdateCtrl.required && !selectdateCtrl.disabled">';
selectdate_html += '<i class="material-icons set" data-ng-if="selectdateCtrl.object">done</i>';
selectdate_html += '<i class="material-icons unset" data-ng-if="!selectdateCtrl.object">error_outline</i>';
selectdate_html += '</li>';
selectdate_html += '</ul>';
selectdate_html += '</fieldset>';

var selectdate_css = '';
selectdate_css += '<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">';
selectdate_css += '<style>';
selectdate_css += 'selectdate-component { display: block; position: relative; }';
selectdate_css += 'selectdate-component > fieldset { margin: 0; padding: 1rem; }';
selectdate_css += 'selectdate-component > fieldset > ul { display: table; width:100%; margin: 0; padding: 0; }';
selectdate_css += 'selectdate-component > fieldset > ul > li { display: table-cell; vertical-align: top; }';
selectdate_css += 'selectdate-component > fieldset > ul > li > select { margin-right: .25rem; }';
selectdate_css += 'selectdate-component > fieldset > ul > li:last-child { width: 1%; }';
selectdate_css += '</style>';

function selectdateCtrl()
{
  var selectdateCtrl = this;

  selectdateCtrl.$onInit = function() {
    if(!selectdateCtrl.futureyears) selectdateCtrl.futureyears = 5;
    selectdateCtrl.SetYears();
    if(selectdateCtrl.object) {
      var date = new Date(selectdateCtrl.object);
      selectdateCtrl.mm = date.getMonth();
      selectdateCtrl.dd = date.getDay();
      selectdateCtrl.yyyy = date.getFullYear();
    }
  }

  selectdateCtrl.$onChange = function() {
    console.log('checking');
  }

  selectdateCtrl.$doCheck = function() {
    if(selectdateCtrl.object == undefined) {
      if(selectdateCtrl.currentDate) {
        selectdateCtrl.mm = undefined;
        selectdateCtrl.dd = undefined;
        selectdateCtrl.yyyy = undefined;
        selectdateCtrl.currentDate = undefined;
      }
    } else {
      selectdateCtrl.currentDate = true; //set so we can check later
    }
  };

  selectdateCtrl.SetYears = function() {
    selectdateCtrl.object = undefined;
    
    const d = new Date();
    var years = [];
      
    const start = (selectdateCtrl.future ? d.getFullYear() : 1900);
    const end = (selectdateCtrl.future ? (d.getFullYear() + selectdateCtrl.futureyears - 1) : d.getFullYear());
    for(var i = start; i <= end; i++) years.push(i);
    selectdateCtrl.years = years;
  }

  selectdateCtrl.SetMonths = function() {
    selectdateCtrl.object = undefined;
    const d = new Date();
    selectdateCtrl.months = [
      { value: 1, label:"Jan" },
      { value: 2, label:"Feb" },
      { value: 3, label:"Mar" },
      { value: 4, label:"Apr" },
      { value: 5, label:"May" },
      { value: 6, label:"Jun" },
      { value: 7, label:"Jul" },
      { value: 8, label:"Aug" },
      { value: 9, label:"Sep" },
      { value: 10, label:"Oct" },
      { value: 11, label:"Nov" },
      { value: 12, label:"Dec" }
    ];
    if(selectdateCtrl.future) if(selectdateCtrl.yyyy == d.getFullYear()) selectdateCtrl.months = selectdateCtrl.months.filter(each => each.value >= (d.getMonth() + 1));
  }
  
  selectdateCtrl.SetDays = function() {
    selectdateCtrl.object = undefined;
    selectdateCtrl.dd = undefined;
    const d = new Date();
    
    var days = new Date(selectdateCtrl.yyyy, selectdateCtrl.mm, 0).getDate();
    
    selectdateCtrl.days = [];
    for(var i = 0; i < days; i++) selectdateCtrl.days.push(i + 1);
    if(selectdateCtrl.future) if(selectdateCtrl.mm == (d.getMonth() + 1)) selectdateCtrl.days = selectdateCtrl.days.filter(day => day >= d.getDate());
  }

  selectdateCtrl.UpdateYear = function() {
    selectdateCtrl.SetMonths();
    selectdateCtrl.object = undefined;
    selectdateCtrl.mm = undefined;
    selectdateCtrl.dd = undefined;
  }

  selectdateCtrl.UpdateMonth = function() {
    selectdateCtrl.SetDays();
    selectdateCtrl.object = undefined;
    selectdateCtrl.dd = undefined;
  }
  
  selectdateCtrl.UpdateDay = function() {
    if(!selectdateCtrl.dd) selectdateCtrl.object = undefined;
    if(selectdateCtrl.yyyy && selectdateCtrl.mm && selectdateCtrl.dd) {
      if(!selectdateCtrl.time) {
        selectdateCtrl.object = new Date(selectdateCtrl.yyyy,(selectdateCtrl.mm - 1),selectdateCtrl.dd);
        if(selectdateCtrl.callbackFn != undefined) selectdateCtrl.callbackFn({obj:selectdateCtrl.object});
      }
    }
  }

  // selectdateCtrl.UpdateObjectTime = function() {
  //   if(selectdateCtrl.yyyy && selectdateCtrl.mm && selectdateCtrl.dd && selectdateCtrl.hour && selectdateCtrl.min) {
  //     selectdateCtrl.object = new Date(selectdateCtrl.yyyy,(selectdateCtrl.mm - 1),selectdateCtrl.dd,selectdateCtrl.hour,selectdateCtrl.min);
  //     if(selectdateCtrl.callbackFn != undefined) selectdateCtrl.callbackFn({obj:selectdateCtrl.object});
  //   }
  // }

  selectdateCtrl.Clear = function() {
    console.log('clearing');
  }
}

const selectdateComponent = {
  controller: selectdateCtrl,
  controllerAs: 'selectdateCtrl',
  bindings: {
    callbackFn: '&?',
    object: '=',
    label: '<?',
    disabled: '<?',
    required: '<',
    time: '<?',
    future: '=?',
    futureyears: '<?'
  },
  template: selectdate_css + selectdate_html
};

angular.module('app').component('selectdateComponent', selectdateComponent);
