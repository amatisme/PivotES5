/********************************************************************************
** COMPONENT - SELECTDATE - 1.0.0 ***********************************************
********************************************************************************/
var selectdate_html = '';
selectdate_html += '<fieldset>';
selectdate_html += '<legend data-ng-if=selectdateCtrl.label>{{selectdateCtrl.label}}</legend>';
selectdate_html += '<ul>';
selectdate_html += '<li>';
selectdate_html += '<input type=hidden name=select-date data-ng-model=selectdateCtrl.object data-ng-required="selectdateCtrl.required && !selectdateCtrl.disabled" />';
selectdate_html += '<ul>';
selectdate_html += '<li>';
selectdate_html += '<select name=select-date-yyyy data-ng-change=selectdateCtrl.UpdateObjectDate() data-ng-model=selectdateCtrl.yyyy data-ng-disabled=selectdateCtrl.disabled>';
selectdate_html += '<option value="">Year</option>';
selectdate_html += '<option value="2019" data-ng-selected="{{\'2019\' == selectdateCtrl.yyyy}}">2019</option>';
selectdate_html += '<option value="2020" data-ng-selected="{{\'2020\' == selectdateCtrl.yyyy}}">2020</option>';
selectdate_html += '<option value="2021" data-ng-selected="{{\'2021\' == selectdateCtrl.yyyy}}">2021</option>';
selectdate_html += '<option value="2022" data-ng-selected="{{\'2022\' == selectdateCtrl.yyyy}}">2022</option>';
selectdate_html += '</select>';
selectdate_html += '</li>';
selectdate_html += '<li>';
selectdate_html += '<select name=select-date-mm data-ng-model=selectdateCtrl.mm data-ng-change="selectdateCtrl.UpdateObjectDate();selectdateCtrl.SetDays();" data-ng-show=selectdateCtrl.yyyy data-ng-disabled=selectdateCtrl.disabled>';
selectdate_html += '<option value="">Month</option>';
selectdate_html += '<option value="1" data-ng-selected="{{1 == selectdateCtrl.mm}}">Jan</option>';
selectdate_html += '<option value="2" data-ng-selected="{{2 == selectdateCtrl.mm}}">Feb</option>';
selectdate_html += '<option value="3" data-ng-selected="{{3 == selectdateCtrl.mm}}">Mar</option>';
selectdate_html += '<option value="4" data-ng-selected="{{4 == selectdateCtrl.mm}}">Apr</option>';
selectdate_html += '<option value="5" data-ng-selected="{{5 == selectdateCtrl.mm}}">May</option>';
selectdate_html += '<option value="6" data-ng-selected="{{6 == selectdateCtrl.mm}}">Jun</option>';
selectdate_html += '<option value="7" data-ng-selected="{{7 == selectdateCtrl.mm}}">Jul</option>';
selectdate_html += '<option value="8" data-ng-selected="{{8 == selectdateCtrl.mm}}">Aug</option>';
selectdate_html += '<option value="9" data-ng-selected="{{9 == selectdateCtrl.mm}}">Sep</option>';
selectdate_html += '<option value="10" data-ng-selected="{{10 == selectdateCtrl.mm}}">Oct</option>';
selectdate_html += '<option value="11" data-ng-selected="{{\'11\' == selectdateCtrl.mm}}">Nov</option>';
selectdate_html += '<option value="12" data-ng-selected="{{\'12\' == selectdateCtrl.mm}}">Dec</option>';
selectdate_html += '</select>';
selectdate_html += '</li>';
selectdate_html += '<li>';
selectdate_html += '<select name=select-date-dd data-ng-model=selectdateCtrl.dd data-ng-change=selectdateCtrl.UpdateObjectDate() data-ng-show=selectdateCtrl.yyyy data-ng-disabled=selectdateCtrl.disabled>';
selectdate_html += '<option value="">Day</option>';
selectdate_html += '<option value={{each}} data-ng-repeat="each in selectdateCtrl.days" data-ng-selected="{{each == selectdateCtrl.dd}}">{{each}}</option>';
selectdate_html += '</select>';
selectdate_html += '</li>';
selectdate_html += '<li data-ng-if=selectdateCtrl.time>';
selectdate_html += '<select name=select-time-hour data-ng-model=selectdateCtrl.hour data-ng-change=selectdateCtrl.UpdateObjectTime() data-ng-show=selectdateCtrl.dd data-ng-disabled=selectdateCtrl.disabled>';
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
selectdate_html += '</li>';
selectdate_html += '<li data-ng-if=selectdateCtrl.time>';
selectdate_html += '<select name=select-time-min data-ng-model=selectdateCtrl.min data-ng-show=selectdateCtrl.hour data-ng-change=selectdateCtrl.UpdateObjectTime() data-ng-disabled=selectdateCtrl.disabled>';
selectdate_html += '<option value="">Minute</option>';
selectdate_html += '<option value="00" data-ng-selected="{{\'00\' == selectdateCtrl.min}}">00</option>';
selectdate_html += '<option value="15" data-ng-selected="{{\'15\' == selectdateCtrl.min}}">15</option>';
selectdate_html += '<option value="30" data-ng-selected="{{\'30\' == selectdateCtrl.min}}">30</option>';
selectdate_html += '<option value="45" data-ng-selected="{{\'45\' == selectdateCtrl.min}}">45</option>';
selectdate_html += '</select>';
selectdate_html += '</li>';
selectdate_html += '</ul>';
selectdate_html += '</li>';
selectdate_html += '<li data-ng-if="selectdateCtrl.required && !selectdateCtrl.disabled">';
selectdate_html += '<i class="material-icons set" data-ng-if="selectdateCtrl.object">done</i>';
selectdate_html += '<i class="material-icons unset" data-ng-if="!selectdateCtrl.object">error_outline</i>';
selectdate_html += '</li>';
selectdate_html += '</ul>';
selectdate_html += '</fieldset>';

var selectdate_css = '';
selectdate_css += '<style>';
selectdate_css += 'selectdate-component { display: block; position: relative; }';
selectdate_css += 'selectdate-component > fieldset > ul { display: table; width:100%; }';
selectdate_css += 'selectdate-component > fieldset > ul > li { display: table-cell; }';
selectdate_css += 'selectdate-component > fieldset > ul > li:last-child { width: 1%; }';
selectdate_css += 'selectdate-component > fieldset > ul > li > ul { display: table; padding: 0; }';
selectdate_css += 'selectdate-component > fieldset > ul > li > ul > li { display: table-cell; }';
selectdate_css += 'selectdate-component > fieldset > ul > li > ul > li:last-child { width: 100%; }';
selectdate_css += '</style>';

function selectdateCtrl()
{
  var selectdateCtrl = this;

  selectdateCtrl.$onInit = function() {
    if(selectdateCtrl.object) {
      var date = new Date(selectdateCtrl.object);
      selectdateCtrl.mm = date.getMonth();
      selectdateCtrl.dd = date.getDay();
      selectdateCtrl.yyyy = date.getFullYear();
    }
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

  selectdateCtrl.SetDays = function() {
    selectdateCtrl.dd = undefined;
    var days = new Date(selectdateCtrl.yyyy, selectdateCtrl.mm, 0).getDate();
    var arr = [];
    for(var i = 0; i < days; i++) arr.push(i + 1);
    selectdateCtrl.days = arr;
  }

  selectdateCtrl.UpdateObjectDate = function() {
    if(selectdateCtrl.yyyy && selectdateCtrl.mm && !selectdateCtrl.dd) selectdateCtrl.SetDays();
    if(selectdateCtrl.yyyy && selectdateCtrl.mm && selectdateCtrl.dd) {
      if(!selectdateCtrl.time) {
        selectdateCtrl.object = new Date(selectdateCtrl.yyyy,(selectdateCtrl.mm - 1),selectdateCtrl.dd);
        if(selectdateCtrl.callbackFn != undefined) selectdateCtrl.callbackFn({obj:selectdateCtrl.object});
      }
    }
  }

  selectdateCtrl.UpdateObjectTime = function() {
    if(selectdateCtrl.yyyy && selectdateCtrl.mm && selectdateCtrl.dd && selectdateCtrl.hour && selectdateCtrl.min) {
      selectdateCtrl.object = new Date(selectdateCtrl.yyyy,(selectdateCtrl.mm - 1),selectdateCtrl.dd,selectdateCtrl.hour,selectdateCtrl.min);
      if(selectdateCtrl.callbackFn != undefined) selectdateCtrl.callbackFn({obj:selectdateCtrl.object});
    }
  }

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
    time: '<?'
  },
  template: selectdate_css + selectdate_html
};

angular.module('app').component('selectdateComponent', selectdateComponent);
