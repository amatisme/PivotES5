/** COMPONENT ACCORDION - 1.0.0 ************************************************/
var accordion_html = '';
accordion_html += '<ul data-ng-click="open=!open">';
accordion_html += '<li><span>{{accordionCtrl.label}}</span></li>';
accordion_html += '<li>';
accordion_html += '<i class="material-icons" data-ng-if=!open>add</i>';
accordion_html += '<i class="material-icons" data-ng-if=open>remove</i>';
accordion_html += '</li>';
accordion_html += '</ul>';
accordion_html += '<div data-ng-show=open>';
accordion_html += '<div data-ng-repeat="each in accordionCtrl.detail">';
accordion_html += '<div class="rich-text" data-ng-bind-html="each.data" data-ng-if="each.component == \'html\'"></div>';
accordion_html += '<img class="rich-text" data-ng-src={{each.data.url}} data-ng-if="each.component == \'image\'" />';
accordion_html += '</div>';
accordion_html += '</div>';

var accordion_css = '';
accordion_css += '<style>';
accordion_css += 'accordion-component { display: block; position: relative; border-width: 1px; border-style: solid; border-radius: 3px; margin-bottom: .5rem; }';
accordion_css += 'accordion-component * { margin: 0; padding: 0; }';
accordion_css += 'accordion-component > ul { display: table; }';
accordion_css += 'accordion-component > ul > li { display: table-cell; padding: .5rem; }';
accordion_css += 'accordion-component > ul > li:first-child { width: 100%; }';
accordion_css += 'accordion-component > ul > li:first-child > span { font-size: 1.1rem; vertical-align: middle; }';
accordion_css += 'accordion-component > ul > li:last-child { width: 1%; }';
accordion_css += 'accordion-component > ul > li:last-child > i { border-width: 1px; border-style: solid; }';
accordion_css += 'accordion-component > div { padding: 1rem; background-color: WHITESMOKE; border-top-width: 1px; border-top-style: solid; }';
accordion_css += 'accordion-component > div > div > div > ul { margin: 0 0 1rem 2rem; padding: 0;}';
accordion_css += 'accordion-component > div > div > div > ul > li { margin:0; padding: 0;}';
accordion_css += '</style>';

function AccordionComponentCtrl() {
  var accordionCtrl = this;

  accordionCtrl.Callback = function(index,obj) {
    accordionCtrl.callbackFn({obj:obj});
  }
}
const accordionComponent = {
  controller: AccordionComponentCtrl,
  controllerAs: 'accordionCtrl',
  bindings: {
    callbackFn: '&',
    object: '<',
    label: '<',
    detail: '<'
  },
  template: accordion_css + accordion_html
};
angular.module('app').component('accordionComponent', accordionComponent);


/** COMPONENT BLOCK - 1.0.0 **************************************************/
var block_html = '';
block_html += '<ul>';
block_html += '<li><span>{{blockCtrl.label}}</span></li>';
block_html += '<li>';
block_html += '<i class="material-icons" data-ng-if=blockCtrl.icon>{{blockCtrl.icon}}</i>';
block_html += '</li>';
block_html += '</ul>';
block_html += '<div data-ng-bind-html=blockCtrl.html></div>';

var block_css = '';
block_css += '<style>';
block_css += 'block-component { display: block; position: relative; }';
block_css += 'block-component * { margin: 0; padding: 0; }';
block_css += 'block-component > ul { display: table; }';
block_css += 'block-component > ul > li { display: table-cell; }';
block_css += 'block-component > ul > li:first-child { width: 100%; }';
block_css += 'block-component > ul > li:first-child > span { font-size: 1.1rem; margin-bottom: .3rem; vertical-align: middle; }';
block_css += 'block-component > ul > li:last-child { width: 1%; }';
block_css += '</style>';

function BlockComponentCtrl() {
  var blockCtrl = this;

  blockCtrl.Callback = function(index,obj) {
    blockCtrl.callbackFn({obj:obj});
  }
}
const blockComponent = {
  controller: BlockComponentCtrl,
  controllerAs: 'blockCtrl',
  bindings: {
    callbackFn: '&',
    icon: '<?',
    label: '<',
    html: '<'
  },
  template: block_css + block_html
};
angular.module('app').component('blockComponent', blockComponent);



/** COMPONENT BUTTONEVENT - 1.0.0 ********************************************/
var buttonevent_html = '';
buttonevent_html += '<button type=button data-ng-model=buttoneventCtrl.object data-ng-click=buttoneventCtrl.callback()>';
buttonevent_html += '<ul data-ng-if=buttoneventCtrl.icon>';
buttonevent_html += '<li style="vertical-align: {{buttoneventCtrl.yalign}};"><i class=material-icons style="font-size:{{buttoneventCtrl.iconsize}};">{{buttoneventCtrl.icon}}</i></li>';
buttonevent_html += '<li style="vertical-align: {{buttoneventCtrl.yalign}};">';
buttonevent_html += '<label>{{buttoneventCtrl.label}}</label>';
buttonevent_html += '<label data-ng-if=buttoneventCtrl.summary>{{buttoneventCtrl.summary}}</label>';
buttonevent_html += '</li>';
buttonevent_html += '</ul>';
buttonevent_html += '<label data-ng-if=!buttoneventCtrl.icon>{{buttoneventCtrl.label}}</label>';
buttonevent_html += '</button>';

var buttonevent_css = '';
buttonevent_css += '<style>';
buttonevent_css += 'buttonevent-component { display: block; position: relative; }';
buttonevent_css += 'buttonevent-component label { font-size: 0.9rem; opacity: 0.8; }';
buttonevent_css += 'buttonevent-component label:first-child { font-size: 1.5rem; opacity: 1; }';
buttonevent_css += 'buttonevent-component > button { display: block; width: 100%; padding: 0; margin: 0; text-align: left; }';
buttonevent_css += 'buttonevent-component > button > ul { display: table; width: 100%; padding: 0; margin: 0; }';
buttonevent_css += 'buttonevent-component > button > ul > li { display: table-cell; }';
buttonevent_css += 'buttonevent-component > button > ul > li:first-child { width: 1%; }';
buttonevent_css += 'buttonevent-component > button > ul > li:last-child { width: 100%; }';
buttonevent_css += '</style>';

function buttoneventComponentCtrl($location) {
  var buttoneventCtrl = this;

  buttoneventCtrl.$onInit = function() {
    if(!buttoneventCtrl.yalign) buttoneventCtrl.yalign = "middle"; //default
    if(!buttoneventCtrl.iconsize) buttoneventCtrl.iconsize = '24px'; //default
  }

  buttoneventCtrl.callback = function() {
    buttoneventCtrl.callbackFn({obj:
        {
            icon: buttoneventCtrl.icon,
            label: buttoneventCtrl.label,
            summary: buttoneventCtrl.summary
        }
    });
  }
}
const buttoneventComponent = {
  controller: buttoneventComponentCtrl,
  controllerAs: 'buttoneventCtrl',
  bindings: {
    callbackFn: '&?',
    object: '=',
    icon: '<?',
    label: '<',
    summary: '<?',
    yalign: '<?',
    iconsize: '<?'
  },
  template: buttonevent_css + buttonevent_html
};
angular.module('app').component('buttoneventComponent', buttoneventComponent);


/** COMPONENT BUTTONSUBMITASYNC ************************************************/
var buttonsubmitasync_html = '';
buttonsubmitasync_html += '<ul class="ui-table" responsive-block>';
buttonsubmitasync_html += '<li class="ui-stretch" responsive-block>';
buttonsubmitasync_html += '<button class="ui-stretch" type="submit" data-ng-click=buttonsubmitasyncCtrl.callback() data-ng-if=!buttonsubmitasyncCtrl.onpromise>{{buttonsubmitasyncCtrl.label}}</button>';
buttonsubmitasync_html += '<div class="ui-border ui-padding ui-text-center loader" data-ng-if=buttonsubmitasyncCtrl.onpromise>';
buttonsubmitasync_html += '<img data-ng-src="/milib/v/1.2/assets/ajax-loader.gif" />';
buttonsubmitasync_html += '</div>';
buttonsubmitasync_html += '</li>';
buttonsubmitasync_html += '</ul>';

var buttonsubmitasync_css = '';
buttonsubmitasync_css += '<style>';
buttonsubmitasync_css += 'buttonsubmitasync-component { display: block; position: relative; }';
buttonsubmitasync_css += 'buttonsubmitasync-component .loader, buttonsubmitasync-component .loader * { background-color: WHITE !important; }';
buttonsubmitasync_css += 'buttonsubmitasync-component .loader { border: 3px solid RGB(82,98,114); }';
buttonsubmitasync_css += '</style>';

function ButtonSubmitAsyncComponentCtrl() {
  const buttonsubmitasyncCtrl = this;
  buttonsubmitasyncCtrl.$onInit = function() {}
  buttonsubmitasyncCtrl.callback = function() {
    buttonsubmitasyncCtrl.callbackFn();
  }
}
const buttonsubmitasyncComponent = {
  controller: ButtonSubmitAsyncComponentCtrl,
  controllerAs: 'buttonsubmitasyncCtrl',
  bindings: {
    callbackFn: '&',
    onpromise: '=',
    label: '<'
  },
  template: buttonsubmitasync_css + buttonsubmitasync_html
};
angular.module('app').component('buttonsubmitasyncComponent', buttonsubmitasyncComponent);



/** COMPONENT BUTTONSUBMIT - 1.0.0 *********************************************/
var buttonsubmit_html = '';
buttonsubmit_html += '<ul data-ng-show="buttonsubmitCtrl.validate && !buttonsubmitCtrl.object.$valid">';
buttonsubmit_html += '<li><i class="material-icons">error_outline</i></li>';
buttonsubmit_html += '<li class="palette-tint">';
buttonsubmit_html += '<span>Please fill out all required fields.</span>';
buttonsubmit_html += '</li>';
buttonsubmit_html += '</ul>';
buttonsubmit_html += '<button type=submit data-ng-click=buttonsubmitCtrl.callback() data-ng-if=buttonsubmitCtrl.object.$valid>';
buttonsubmit_html += '<span data-ng-if=buttonsubmitCtrl.label>{{buttonsubmitCtrl.label}}</span>';
buttonsubmit_html += '<span data-ng-if=!buttonsubmitCtrl.label>Submit</span>';
buttonsubmit_html += '</button>';

var buttonsubmit_css = '';
buttonsubmit_css += '<style>';
buttonsubmit_css += 'buttonsubmit-component { display: block; position: relative; }';
buttonsubmit_css += 'buttonsubmit-component label { font-size: 0.9rem; opacity: 0.8; }';
buttonsubmit_css += 'buttonsubmit-component label:first-child { font-size: 1.5rem; opacity: 1; }';
buttonsubmit_css += 'buttonsubmit-component > ul { display: table; width: 100%; padding: 0; margin: 0; background-color: ORANGERED; }';
buttonsubmit_css += 'buttonsubmit-component > ul * { color: WHITE; }';
buttonsubmit_css += 'buttonsubmit-component > ul > li { display: table-cell; padding: 1rem; }';
buttonsubmit_css += 'buttonsubmit-component > ul > li:first-child { width: 1%; }';
buttonsubmit_css += 'buttonsubmit-component > ul > li:last-child { width: 100%; }';
buttonsubmit_css += '</style>';

function buttonsubmitComponentCtrl($location) {
  var buttonsubmitCtrl = this;

  buttonsubmitCtrl.$onInit = function() {
    if(!buttonsubmitCtrl.yalign) buttonsubmitCtrl.yalign = "middle"; //default
  }

  buttonsubmitCtrl.callback = function() {
    buttonsubmitCtrl.object.$valid = false;
    buttonsubmitCtrl.callbackFn({obj:
        {
            icon: buttonsubmitCtrl.icon,
            label: buttonsubmitCtrl.label,
            summary: buttonsubmitCtrl.summary
        }
    });
  }
}
const buttonsubmitComponent = {
  controller: buttonsubmitComponentCtrl,
  controllerAs: 'buttonsubmitCtrl',
  bindings: {
    callbackFn: '&',
    object: '=',
    validate: '<',
    label: '<'
  },
  template: buttonsubmit_css + buttonsubmit_html
};
angular.module('app').component('buttonsubmitComponent', buttonsubmitComponent);


/** COMPONENT CELLCARD - 1.0.0 *************************************************/
var cellcard_html = '';
cellcard_html += '<button data-ng-click=cellcardCtrl.Callback(cellcardCtrl.uri,cardCtrl.target)>';
cellcard_html += '<img src="../milib/assets/1x1.png" style="background-image: url(\'{{cellcardCtrl.image}}\'" />';
cellcard_html += '<div>';
cellcard_html += '<label>{{cellcardCtrl.label}}</label>';
cellcard_html += '<p>{{cellcardCtrl.detail}}</p>';
cellcard_html += '</div>';
cellcard_html += '<div><a href="{{cellcardCtrl.uri}}" target="{{cellcardCtrl.target}}">LEARN MORE</a></div>';
cellcard_html += '</button>';

var cellcard_css = '';
cellcard_css += '<style>';
cellcard_css += 'cellcard-component { position: relative; display: block; width: 100%; }';
cellcard_css += 'cellcard-component img { position: relative; display: block; width: 100%; height: 175px; border-style: solid; border-width: 6px !important; border-left: none !important; border-right: none !important; border-top: none !important; }';
cellcard_css += 'cellcard-component div { width: 100%; }';
cellcard_css += '</style>';

function CellCardComponentCtrl() {
  var cellcardCtrl = this;
  cellcardCtrl.$onInit = function() {}
  cellcardCtrl.callback = function(obj) {
    if(cellcardCtrl.callbackFn) cellcardCtrl.callbackFn({obj:obj});
  }
}
const cellcardComponent = {
  controller: CellCardComponentCtrl,
  controllerAs: 'cellcardCtrl',
  bindings: {
    callbackFn: '&',
    uri: '<',
    target: '<',
    label: '<',
    description: '<',
    image: '<'
  },
  template: cellcard_css + cellcard_html
};
angular.module('app').component('cellcardComponent', cellcardComponent);


/** COMPONENT CELLEMPLOYEE - 1.0.0 *********************************************/
var cellemployee_html = '';
cellemployee_html += '<ul class="ui-table" responsive-block>';
cellemployee_html += '<li class="ui-vertical-top ui-wrap-none" responsive-block>';
cellemployee_html += '<button class="ui-cover ui-padding-right ui-padding-left" data-ng-click=cellemployeeCtrl.Callback({obj:obj}) style="background-image:url(\'/milib/v/1.2/components/cell-employee/nophoto.png\')">';
cellemployee_html += '<img data-ng-src="/milib/v/1.2/assets/1x1.png"/>';
cellemployee_html += '</button><br />';
cellemployee_html += '<emlabel-component class="font-large" searchterm=cellemployeeCtrl.search label=cellemployeeCtrl.object.name></emlabel-component><br/>';
cellemployee_html += '<ul class="ui-table ui-padding-small-top ui-padding-small-bottom">';
cellemployee_html += '<li class="ui-padding-right"><i class="material-icons">email</i></li>';
cellemployee_html += '<li class="ui-stretch">';
cellemployee_html += '<a href="mailto:{{cellemployeeCtrl.object.email}}" data-ng-if=cellemployeeCtrl.object.email>';
cellemployee_html += '<emlabel-component searchterm=cellemployeeCtrl.search label=cellemployeeCtrl.object.email></emlabel-component>';
cellemployee_html += '</a>';
cellemployee_html += '<span data-ng-if=!cellemployeeCtrl.object.email>n/a</span>';
cellemployee_html += '</li>';
cellemployee_html += '</ul>';
cellemployee_html += '</li>';
cellemployee_html += '<li class="ui-cell-space-small" responsive-block></li>';
cellemployee_html += '<li class="ui-vertical-top ui-stretch" responsive-block>';
cellemployee_html += '<ul class="ui-table ui-padding-small-bottom" data-ng-repeat="each in cellemployeeCtrl.labels">';
cellemployee_html += '<li responsive-block label><label class="font-dim ui-wrap-none">{{each.label}}</label></li>';
cellemployee_html += '<li class="ui-stretch" responsive-block><emlabel-component searchterm=cellemployeeCtrl.search label=each.value></emlabel-component></li>';
cellemployee_html += '<li data-ng-if=each.searchable><button type="icon" data-ng-click=cellemployeeCtrl.SetQuery(each.value)><i class="material-icons">search</i></button></li>';
cellemployee_html += '</ul>';
cellemployee_html += '</li>';
cellemployee_html += '</ul>';

var cellemployee_css = '';
cellemployee_css += '<style>';
cellemployee_css += 'cellemployee-component { position: relative; display: block; }';
cellemployee_css += 'cellemployee-component > ul > li:first-child > button { width: 66px; height: 66px; }';
cellemployee_css += 'cellemployee-component > ul > li:first-child { width: 1%; }';
cellemployee_css += 'cellemployee-component > ul > li:last-child { width: 60%; }';
cellemployee_css += 'cellemployee-component [label] { width: 30%; }';
cellemployee_css += '</style>';

function CellEmployeeComponentCtrl($http) {
  var cellemployeeCtrl = this;
  cellemployeeCtrl.$onInit = function() {
    var na = 'n/a';
    var email = (cellemployeeCtrl.object.email ?  cellemployeeCtrl.object.email : na);
    var tel = (cellemployeeCtrl.object.tel ?  cellemployeeCtrl.object.tel : na);
    var cel = (cellemployeeCtrl.object.cel ?  cellemployeeCtrl.object.cel : na);
    var position = (cellemployeeCtrl.object.position ?  cellemployeeCtrl.object.position : na);
    var location = (cellemployeeCtrl.object.location ?  cellemployeeCtrl.object.location : na);
    var unit = (cellemployeeCtrl.object.business_unit ?  cellemployeeCtrl.object.business_unit : na);
    cellemployeeCtrl.labels = [
      {label:"Tel", value:cellemployeeCtrl.object.tel,searchable:null},
      {label:"Cell", value:cellemployeeCtrl.object.cel,searchable:null},
      {label:"Position", value:cellemployeeCtrl.object.position,searchable:true},
      {label:"Business Unit", value:cellemployeeCtrl.object.business_unit,searchable:true},
      {label:"Location", value:cellemployeeCtrl.object.location,searchable:true}
    ];
  }

  cellemployeeCtrl.SetQuery = function(obj) {
    if(!cellemployeeCtrl.search) cellemployeeCtrl.search = { value: {$:""} };
    cellemployeeCtrl.search.value.$ = obj;
  }

  cellemployeeCtrl.Callback = function(obj) {
    cellemployeeCtrl.callbackFn({obj:obj});
  }
}
const cellemployeeComponent = {
  controller: CellEmployeeComponentCtrl,
  controllerAs: 'cellemployeeCtrl',
  bindings: {
    callbackFn: '&',
    object: '<',
    search: '=?'
  },
  template: cellemployee_css + cellemployee_html
};
angular.module('app').component('cellemployeeComponent', cellemployeeComponent);


/** COMPONENT CELLPARAM - 1.0.0 ************************************************/
var cellparam_html = '';
cellparam_html += '<ul data-ng-repeat="(key,value) in cellparamCtrl.object" data-ng-if="key!=\'token\'">';
cellparam_html += '<li data-ng-if="!cellparamCtrl.isArray(value)">';
cellparam_html += '<b>{{key}}:</b> {{value}}';
cellparam_html += '</li>';
cellparam_html += '<li data-ng-if="cellparamCtrl.isArray(value)">';
cellparam_html += '<span>{{key}}:</span><br>';
cellparam_html += '<span data-ng-repeat="each in value">{{each}}</br></span>';
cellparam_html += '</li>';
cellparam_html += '</ul>';

var cellparam_css = '';

function CellParamComponentCtrl()
{
  var itemCtrl = this;
  itemCtrl.$onInit = function() {}
  itemCtrl.isArray  = function(arg) {
    return Array.isArray(arg);
  }
}
const cellparamComponent = {
  controller: CellParamComponentCtrl,
  controllerAs: 'cellparamCtrl',
  bindings: {
    callbackFn: '&?',
    object: '<'
  },
  template: cellparam_css + cellparam_html
};
angular.module('app').component('cellparamComponent', cellparamComponent);


/** COMPONENT CELLSTUB - 1.0.1 *************************************************/
var cellstub_html = '';
cellstub_html += '<ul>';
cellstub_html += '<li>';
cellstub_html += '<label id=cellstub-label data-ng-if=cellstubCtrl.object.label><b>{{cellstubCtrl.object.label}}</b></label>';
cellstub_html += '<label id=cellstub-sublabel data-ng-if=cellstubCtrl.object.sublabel>{{cellstubCtrl.object.sublabel}}</label>';
cellstub_html += '<label id=cellstub-description data-ng-if=cellstubCtrl.object.description>{{cellstubCtrl.object.description}}</label>';
cellstub_html += '<div>';
cellstub_html += '<ul data-ng-if=cellstubCtrl.object.detail>';
cellstub_html += '<li data-ng-repeat="(key,value) in cellstubCtrl.object.detail"><span>{{key}}</span>:';
cellstub_html += '<button type=text data-ng-if=value.searchable data-ng-click=cellstubCtrl.Callback({value:{$:value.label}})>{{value.label}}</button>';
cellstub_html += '<span data-ng-if=!value.searchable>{{value.label}}</span>';
cellstub_html += '</li>';
cellstub_html += '</ul>';
cellstub_html += '</div>';
cellstub_html += '</li>';
cellstub_html += '<li>';
cellstub_html += '<button data-ng-if=cellstubCtrl.button data-ng-click=cellstubCtrl.Callback(cellstubCtrl.object)>';
cellstub_html += '<ul>';
cellstub_html += '<li style="width:100%;">{{cellstubCtrl.button.label}}</li>';
cellstub_html += '<li><i class="material-icons" data-ng-if=cellstubCtrl.button.icon>{{cellstubCtrl.button.icon}}</i></li>';
cellstub_html += '</ul>';
cellstub_html += '</button>';
cellstub_html += '</li>';
cellstub_html += '</ul>';

var cellstub_css = '';
cellstub_css += '<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">';
cellstub_css += '<style>';
cellstub_css += 'cellstub-component { position: relative; display: block; padding: 1rem 0; }';
cellstub_css += 'cellstub-component ul { display: table; margin: 0; padding: 0; }';
cellstub_css += 'cellstub-component ul li { display: table-cell; vertical-align: top; }';
cellstub_css += 'cellstub-component > ul > li:nth-child(1) { width: 100%; }';
cellstub_css += 'cellstub-component > ul > li:nth-child(1) > div > ul > li { font-size: .9em; padding-right: 1em; }';
cellstub_css += 'cellstub-component > ul > li:nth-child(1) > div > ul > li > span { opacity: .7; }';
cellstub_css += 'cellstub-component > ul > li:nth-child(1) label > b { padding: .1em 0; }';
cellstub_css += 'cellstub-component > ul > li:nth-child(2) button { background-color: RGB(0,0,0); color: RGB(255,255,255); padding: .5rem 1rem; font-size: .9rem; font-family: inherit; opacity:.5; }';
cellstub_css += 'cellstub-component > ul > li:nth-child(2) button:hover { opacity:1; }';
cellstub_css += 'cellstub-component > ul > li:nth-child(2) button li { vertical-align: middle; }';
cellstub_css += 'cellstub-component > ul > li:nth-child(2) button li:nth-child(1) { padding-right: .5rem; }';
cellstub_css += '</style>';

function CellStubComponentCtrl() {
  var cellstubCtrl = this;

  cellstubCtrl.$onInit = function() {
    if(!cellstubCtrl.icon) cellstubCtrl.icon = 'keyboard_arrow_right'; //default
  }

  cellstubCtrl.Callback = function(obj) {
    if(cellstubCtrl.callbackFn) cellstubCtrl.callbackFn({obj:obj});
  }
}
const cellstubComponent = {
  controller: CellStubComponentCtrl,
  controllerAs: 'cellstubCtrl',
  bindings: {
    callbackFn: '&?',
    search: '<?',
    icon: '<?',
    button: '<?',
    object: '<'
  },
  template: cellstub_css + cellstub_html
};
angular.module('app').component('cellstubComponent', cellstubComponent);


/** COMPONENT CHART - 1.0.0 ****************************************************/
var chart_html = '';

var chart_css = '';
chart_css += '<style>';
chart_css += 'chart-component { display: hidden; position: relative; background-color: red !important; }';
chart_css += '</style>';

function ChartComponentCtrl() {
  var chartCtrl = this;
  chartCtrl.$onInit = function() {
    //set element
    var elem = document.getElementsByName(chartCtrl.elem)[0];
    elem.setAttribute("id", chartCtrl.elem);

    //get master width of li
    var charts = document.getElementsByClassName("canvasjs-chart");
    var width = charts.item(0).clientWidth;

    //config canvasjs
    chartCtrl.config.height = width;
    chartCtrl.config.width = (chartCtrl.config.height * 0.8);

    //set height of li containers
    for(i = 0; i < charts.length; i++) document.getElementsByClassName("canvasjs-chart")[i].style.height = (width * 1.25) + "px";

    //render chart
    var chart = new CanvasJS.Chart(chartCtrl.elem, chartCtrl.config);
    chart.render();
  }
}
const chartComponent = {
  controller: ChartComponentCtrl,
  controllerAs: 'chartCtrl',
  bindings: {
    config: '<',
    elem: '<'
  },
  template: chart_css + chart_html
};
angular.module('app').component('chartComponent', chartComponent);


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


/** COMPONENT CRUMB - 1.0.0 ****************************************************/
var crumb_html = '';
crumb_html += '<ul>';
crumb_html += '<li data-ng-repeat="each in crumbCtrl.objects">';
crumb_html += '<button type=button data-ng-click=crumbCtrl.Callback(each) data-ng-if=each.path>';
crumb_html += '/ {{each.label}}';
crumb_html += '</button>';
crumb_html += '<span data-ng-if=!each.path>';
crumb_html += '/ {{each.label}}';
crumb_html += '</span>';
crumb_html += '</li>';
crumb_html += '</ul>';

var crumb_css = '';
crumb_css += '<style>';
crumb_css += 'crumb-component * { padding:0; margin:0; }';
crumb_css += 'crumb-component { display: block; position: relative;}';
crumb_css += 'crumb-component > ul { display: table; }';
crumb_css += 'crumb-component > ul > li { display: table-cell; font-size: .9em; }';
crumb_css += 'crumb-component > ul > li:last-child { width: 100%; }';
crumb_css += 'crumb-component > ul > li > button { background-color: transparent; color: RGB(0,0,255); text-align: left; min-width:0; min-height:0; white-space: nowrap; margin-right:.5em; }';
crumb_css += 'crumb-component > ul > li > span { opacity: .8; }';
crumb_css += '</style>';

function CrumbComponentCtrl($location) {
  var crumbCtrl = this;
  crumbCtrl.$onInit = function() {
    crumbCtrl.path = $location.path();
  }
  crumbCtrl.Callback = function(obj) {
    if(crumbCtrl.callbackFn) crumbCtrl.callbackFn({obj:obj});
  }
}
const crumbComponent = {
  controller: CrumbComponentCtrl,
  controllerAs: 'crumbCtrl',
  bindings: {
    callbackFn: '&?',
    objects: '<'
  },
  template: crumb_css + crumb_html
};
angular.module('app').component('crumbComponent', crumbComponent);


/** COMPONENT DROPMENU - 1.0.0 *************************************************/
var dropmenu_html = '';
dropmenu_html += '<div data-ng-mouseleave=dropmenuCtrl.hoverOut()>';
dropmenu_html += '<ul>';
dropmenu_html += '<li data-ng-repeat="each in dropmenuCtrl.objects">';
dropmenu_html += '<button data-ng-mouseover="dropmenuCtrl.hoverIn($index);" data-ng-click=dropmenuCtrl.Callback(each) data-ng-class="{active: $index == dropmenuCtrl.index}">';
dropmenu_html += '<ul>';
dropmenu_html += '<li>';
dropmenu_html += '{{each.label}}';
dropmenu_html += '</li>';
dropmenu_html += '<li>';
dropmenu_html += '<i class="material-icons" data-ng-if="dropmenuCtrl.index!=$index && dropmenuCtrl.objects[$index]">keyboard_arrow_down</i>';
dropmenu_html += '<i class="material-icons" data-ng-if="dropmenuCtrl.index==$index && dropmenuCtrl.objects[$index]">keyboard_arrow_up</i>';
dropmenu_html += '</li>';
dropmenu_html += '</ul>';
dropmenu_html += '</button>';
dropmenu_html += '</li>';
dropmenu_html += '</ul>';
dropmenu_html += '<div data-ng-show="dropmenuCtrl.index==$index" data-ng-mouseleave=dropmenuCtrl.hoverOut() data-ng-repeat="each in dropmenuCtrl.objects" data-ng-class="dropmenuCtrl.index==$index ? \'fadein\' : \'fadeout\'">';
dropmenu_html += '<button title={{link.detail}} data-ng-click=dropmenuCtrl.Callback(link) data-ng-repeat="link in each.links">';
dropmenu_html += '{{link.label}}';
dropmenu_html += '</button>';
dropmenu_html += '</div>';
dropmenu_html += '</div>';

var dropmenu_css = '';
dropmenu_css += '<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">';
dropmenu_css += '<style>';
dropmenu_css += 'dropmenu-component { display: inline-block; position: relative; min-width: 120px;}';
dropmenu_css += 'dropmenu-component * { background-color: transparent; border: none; padding:0; margin:0; }';
dropmenu_css += 'dropmenu-component ul { display:table; width: 100%;}';
dropmenu_css += 'dropmenu-component ul li { display:table-cell; vertical-align: top;}';
dropmenu_css += 'dropmenu-component > div > ul > li > button { padding: 18px; white-space: nowrap; height:60px; width:100%;}';
dropmenu_css += 'dropmenu-component > div > ul > li > button.active { background-color:RGB(55,55,55) !important; }';
dropmenu_css += 'dropmenu-component > div > ul > li > button > ul > li:first-child { width: 100%;}';
dropmenu_css += 'dropmenu-component > div > div { display:none; flex-direction: column; flex-wrap: wrap; position: absolute; top:60px; left:0; z-index:99; width: 100%; background-color:RGB(255,255,255);}';
dropmenu_css += 'dropmenu-component > div > div.fadein { animation: fadein .5s; animation-fill-mode: forwards; }';
dropmenu_css += 'dropmenu-component > div > div.fadeout { animation: fadeout .5s; }';
dropmenu_css += 'dropmenu-component > div > div > button { height: 60px; margin: 0 3px; padding: 18px; color: RGB(0,0,0);}';
dropmenu_css += '/* ANIMATE */';
dropmenu_css += '@keyframes fadein {';
dropmenu_css += 'from { opacity: 0; display: flex; } to { opacity: 1; }';
dropmenu_css += '}';
dropmenu_css += '@keyframes fadeout {';
dropmenu_css += 'from { opacity: 1; } to { opacity: 0; display: none; }';
dropmenu_css += '}';
dropmenu_css += '/* RESPONSIVE */';
dropmenu_css += '@media only screen and (max-width: 414px) {';
dropmenu_css += 'dropmenu-component > button { width: 100%; }';
dropmenu_css += '}';
dropmenu_css += '</style>';

function DropMenuComponentCtrl() {
  var dropmenuCtrl = this;

  dropmenuCtrl.$onInit = function() {
  }

  dropmenuCtrl.hoverIn = function(index){
    dropmenuCtrl.hover = true;
    dropmenuCtrl.index = index;
  };

  dropmenuCtrl.hoverOut = function(){
    dropmenuCtrl.hover = undefined;
    dropmenuCtrl.index = undefined;
  };

  dropmenuCtrl.Callback = function(obj) {
    if(dropmenuCtrl.callbackFn) dropmenuCtrl.callbackFn({obj:obj});
  }
}
const dropmenuComponent = {
  controller: DropMenuComponentCtrl,
  controllerAs: 'dropmenuCtrl',
  bindings: {
    callbackFn: '&?',
    labels: '<',
    objects: '<?'
  },
  template: dropmenu_css + dropmenu_html
};
angular.module('app').component('dropmenuComponent', dropmenuComponent);


/** COMPONENT GALLERY - 1.0.0 **************************************************/
var gallery_html = '';
gallery_html += '<label>{{galleryCtrl.label}}</label>';
gallery_html += '<div>';
gallery_html += '<button data-ng-click=galleryCtrl.SetImage($index) data-ng-repeat="each in galleryCtrl.images" data-ng-if="each.component == \'image\'" data-ng-init=galleryCtrl.SetImage(0)>';
gallery_html += '<img data-ng-src={{each.data.url}} />';
gallery_html += '</button>';
gallery_html += '</div>';
gallery_html += '<img class="rich-text" data-ng-src={{galleryCtrl.image.data.url}} title={{galleryCtrl.image.data.description}}  />';
gallery_html += '<p>{{galleryCtrl.image.data.description}}</p>';

var gallery_css = '';
gallery_css += '<style>';
gallery_css += 'gallery-component { display: block; position: relative; background-color: DIMGRAY; border-radius: 3px; padding-bottom: 1rem; margin-bottom: .5rem; }';
gallery_css += 'gallery-component > label { padding: 1rem; font-size: 1.1rem; vertical-align: middle; color: WHITESMOKE; }';
gallery_css += 'gallery-component > p { font-size: .9rem; color: WHITESMOKE; padding: 0 1rem; margin: 0; }';
gallery_css += 'gallery-component > img { padding: 1rem 1rem 0 1rem; width: 100%; }';
gallery_css += 'gallery-component > div { padding: 0 1rem; border-bottom-style: solid; display: table; width: 100%; border-bottom-width: 1px; }';
gallery_css += 'gallery-component > div > button { display: table-cell; width: 30px; height: 30px; padding: 0; margin: 0 .2rem 0 0;}';
gallery_css += 'gallery-component > div > button > img { width: 30px; height: 30px; opacity: .6;}';
gallery_css += 'gallery-component > div > button > img:hover { opacity: 1; }';
gallery_css += '</style>';

function GalleryComponentCtrl() {
  var galleryCtrl = this;

  galleryCtrl.$onInit = function() {
    galleryCtrl.SetImage(0);
  }

  galleryCtrl.SetImage = function(index) {
    galleryCtrl.image = galleryCtrl.images[index];
  }

  galleryCtrl.Callback = function(index,obj) {
    galleryCtrl.callbackFn({obj:obj});
  }
}
const galleryComponent = {
  controller: GalleryComponentCtrl,
  controllerAs: 'galleryCtrl',
  bindings: {
    callbackFn: '&',
    object: '<',
    label: '<',
    images: '<'
  },
  template: gallery_css + gallery_html
};
angular.module('app').component('galleryComponent', galleryComponent);



/** COMPONENT HERO - 1.0.0 ***************************************************/
var hero_html = '';
hero_html += '<div style="background-image: url(\'{{heroCtrl.image}}\')">';
hero_html += '<ul>';
hero_html += '<li>';
hero_html += '<div data-ng-if=heroCtrl.label>';
hero_html += '<label data-ng-if=heroCtrl.label>{{heroCtrl.label}}</label>';
hero_html += '<span data-ng-if=heroCtrl.description>{{heroCtrl.description}}</span>';
hero_html += '<button type="action" data-ng-if=heroCtrl.button data-ng-click=heroCtrl.Callback()>';
hero_html += '{{heroCtrl.button}}';
hero_html += '</button>';
hero_html += '</div>';
hero_html += '</li>';
hero_html += '</ul>';

var hero_css = '';
hero_css += '<style>';
hero_css += 'hero-component { display: block; position: relative; margin: 0; padding: 0; width: 100%; }';
hero_css += 'hero-component * { padding: 0; margin: 0; }';
hero_css += 'hero-component > div { display: flex; align-items: flex-end; width: 100%; height: 25em; background-size: cover; background-repeat: no-repeat; background-position: center center; }';
hero_css += 'hero-component > div > ul { display: table; width: 100%; padding: 2rem; background-color: WHITE; margin: 0 auto; width: 90vw; max-width: 990px; }';
hero_css += 'hero-component > div > ul > li { display: table-cell; vertical-align: bottom; }';
hero_css += 'hero-component > div > ul > li:first-child { width: 100%; }';
hero_css += 'hero-component > div > ul > li:first-child > label { display: block; }';
hero_css += 'hero-component > div > ul > li:first-child > label:first-child { font-size: 2em; }';
hero_css += 'hero-component > div > ul > li > div > label { font-size: 2em; }';
hero_css += 'hero-component > div > ul > li > div > button { margin-top: 18px; }';
hero_css += '@media only screen and (max-width: 768px) {';
hero_css += 'hero-component > div { background-size: contain; }';
hero_css += '}';
hero_css += '</style>';

function HeroComponentCtrl ($http,$window)
{
  var heroCtrl = this;
  heroCtrl.Go = function(arg) { $window.location.href = arg; }
  heroCtrl.Callback = function() { heroCtrl.callbackFn(); }
}
const heroComponent = {
  controller: HeroComponentCtrl,
  controllerAs: 'heroCtrl',
  bindings: {
    callbackFn: '&?',
    label: '<?',
    description: '<?',
    image: '<?',
    button: '<?'
  },
  template: hero_css + hero_html
};
angular.module('app').component('heroComponent', heroComponent);


/** COMPONENT LIKE - 1.0.0 *****************************************************/
var like_html = '';
like_html += '<button data-ng-click=likeCtrl.LikeObject() data-ng-disabled=likeCtrl.IsLiked()><i class="material-icons">thumb_up</i> {{likeCtrl.object.likes.length}}</button>';
like_html += '<button data-ng-click=likeCtrl.UnlikeObject() data-ng-if=likeCtrl.IsLiked() data-ng-disabled=!likeCtrl.IsLiked()><i class="material-icons colorfg1 uiiconsmall">thumb_down</i> {{likeCtrl.object.dislikes.length}}</button>';

var like_css = '';

function LikeComponentCtrl()
{
  var likeCtrl = this;

  likeCtrl.$onInit = function() {
  }

  likeCtrl.LikeObject = function() {
    var like = {};
    like.id = md5(Math.random() + new Date());
    console.log(likeCtrl.user);
    like.user = {};
    like.user.id = likeCtrl.user.id;
    like.user.first_name = likeCtrl.user.first_name;
    like.user.last_name = likeCtrl.user.last_name;
    like.date_created = new Date();

    if(!likeCtrl.object.likes) likeCtrl.object.likes = [];
    likeCtrl.object.likes.push(like);
    console.log(likeCtrl.object);
    likeCtrl.callbackFn({obj:likeCtrl.object});
  }

  likeCtrl.IsLiked = function() {
    var bool = false;
    angular.forEach(likeCtrl.object.likes, function(each) {
      if(each.user.id == likeCtrl.user.id) bool = true;
    });
    return bool;
  }

  likeCtrl.UnlikeObject = function() {
    console.log(likeCtrl.user);
    angular.forEach(likeCtrl.object.likes, function(each) {
      if(each.user.id == likeCtrl.user.id) likeCtrl.object.likes.pop(each);
    });
    console.log(likeCtrl.object.likes);
    likeCtrl.callbackFn({obj:likeCtrl.object});
  }
}
const likeComponent = {
  controller: LikeComponentCtrl,
  controllerAs: 'likeCtrl',
  bindings: {
    callbackFn: '&',
    user: '<',
    object: '='
  },
  template: like_css + like_html
};
angular.module('app').component('likeComponent', likeComponent);



/** COMPONENT NAV - 1.0.0 ******************************************************/
var nav_html = '';
nav_html += '<button title="View Labels" data-ng-click="navCtrl.hide=!navCtrl.hide">';
nav_html += '<i class="material-icons" data-ng-if=navCtrl.hide>menu</i>';
nav_html += '<i class="material-icons" data-ng-if=!navCtrl.hide>close</i>';
nav_html += '</button>';
nav_html += '<button title={{each.label}} data-ng-click=navCtrl.Callback(each) data-ng-repeat="each in navCtrl.objects" data-ng-class="{active: each.path == navCtrl.path}">';
nav_html += '<div><i class="material-icons">{{each.icon}}</i></div>';
nav_html += '<div data-ng-show=!navCtrl.hide>{{each.label}}</div>';
nav_html += '</button>';

var nav_css = '';
nav_css += '<style>';
nav_css += 'nav-component { display: block; position: relative; }';
nav_css += 'nav-component * { background-color: transparent; border: none; }';
nav_css += 'nav-component > button { display: table; width: 100%; padding: .7rem; white-space: nowrap; opacity:0.7; }';
nav_css += 'nav-component > button > div { display: table-cell; vertical-align: middle; width: 1%; }';
nav_css += 'nav-component > button > div:last-child { width: 99%; padding-left: 9px; text-align: left; }';
nav_css += 'nav-component > button.active, nav-component > button:hover { opacity:1; }';
nav_css += 'nav-component > button.size-lock { width: 1%; }';
nav_css += '/* START RESPONSIVE */';
nav_css += '@media only screen and (max-width: 414px) {';
nav_css += 'nav-component > button { width: 100%; }';
nav_css += '}';
nav_css += '/* END RESPONSIVE */';
nav_css += '</style>';

function NavComponentCtrl($location) {
  var navCtrl = this;

  navCtrl.$onInit = function() {
    navCtrl.path = $location.path();
    navCtrl.state = true;

    //hide if mobile
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    if(w <= 768) navCtrl.hide = true;
  }

  navCtrl.Callback = function(obj) {
    if(navCtrl.callbackFn) navCtrl.callbackFn({obj:obj});
  }
}

const navComponent = {
  controller: NavComponentCtrl,
  controllerAs: 'navCtrl',
  bindings: {
    callbackFn: '&?',
    objects: '<',
    hide: '='
  },
  template: nav_css + nav_html
};

angular.module('app').component('navComponent', navComponent);




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


/** COMPONENT NOTIFICATION - 1.0.0 *****************************************************/
var notification_html = '';
notification_html += '<ul>';
notification_html += '<li data-ng-if=notificationCtrl.icon><i class="material-icons">{{notificationCtrl.icon}}</i></li>';
notification_html += '<li>';
notification_html += '<label data-ng-if=notificationCtrl.label>{{notificationCtrl.label}}</label>';
notification_html += '<span>{{notificationCtrl.detail}}</span>';
notification_html += '</li>';
notification_html += '</ul>';

var notification_css = '';
notification_css += '<style>';
notification_css += 'notification-component { display: block; position: relative; }';
notification_css += 'notification-component > ul { display: table; margin: 0; padding: 0; }';
notification_css += 'notification-component > ul > li { display: table-cell; padding: 1em; vertical-align:top; }';
notification_css += 'notification-component > ul > li:first-child { width:1%; }';
notification_css += 'notification-component > ul > li:last-child { background-color:rgba(0,0,0,0.12); }';
notification_css += 'notification-component > ul > li:last-child * { background-color: transparent; }';
notification_css += 'notification-component > ul > li > label { display: block; font-size: 1.5em; }';
notification_css += 'notification-component > ul > li > span { font-size:.9em; opacity: 0.7; }';
notification_css += '</style>';

function NotificationComponentCtrl() {
  var notificationCtrl = this;
  notificationCtrl.Callback = function(index,obj) {
    notificationCtrl.callbackFn({obj:obj});
  }
}
const notificationComponent = {
  controller: NotificationComponentCtrl,
  controllerAs: 'notificationCtrl',
  bindings: {
    callbackFn: '&',
    icon: '<?',
    label: '<?',
    detail: '<'
  },
  template: notification_css + notification_html
};
angular.module('app').component('notificationComponent', notificationComponent);


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



/** COMPONENT TAB - 1.0.0 ******************************************************/
var tab_html = '';
tab_html += '<ul>';
tab_html += '<li data-ng-repeat="each in tabCtrl.objects">';
tab_html += '<button data-ng-class="{\'active\' : tabCtrl.index == $index}" data-ng-click=tabCtrl.Callback($index,each)>';
tab_html += '{{each}}';
tab_html += '</button>';
tab_html += '</li>';
tab_html += '<li class="ui-stretch"></li>';
tab_html += '</ul>';

var tab_css = '';
tab_css += '<style>';
tab_css += 'tab-component * { margin: 0; padding: 0; }';
tab_css += 'tab-component { display: block; position: relative; border-bottom-style: solid; border-bottom-width: 3px; }';
tab_css += 'tab-component > ul { display: table; }';
tab_css += 'tab-component > ul > li { display: table-cell; }';
tab_css += 'tab-component > ul > li:last-child { width: 100%; }';
tab_css += 'tab-component > ul > li > button { border: none; min-height: 3.5rem; min-width: 6rem; background-color: transparent; white-space: nowrap; }';
tab_css += 'tab-component > ul > li > button.active { background-color: RGB(0,0,0); color: RGB(255,255,255); }';
tab_css += '@media only screen and (max-width: 375px) {';
tab_css += 'tab-component > ul, tab-component > ul > li, tab-component > ul > li > button { display: block; width: 100%; }';
tab_css += '}';
tab_css += '</style>';

function TabComponentCtrl() {
  var tabCtrl = this;
  tabCtrl.index = 0;

  tabCtrl.Callback = function(index,obj) {
    tabCtrl.index = index;
    tabCtrl.callbackFn({obj:{label:obj,index:index}});
  }
}
const tabComponent = {
  controller: TabComponentCtrl,
  controllerAs: 'tabCtrl',
  bindings: {
    callbackFn: '&',
    objects: '<'
  },
  template: tab_css + tab_html
};
angular.module('app').component('tabComponent', tabComponent);




/** COMPONENT - TEXTFIELD - 1.0.0 **********************************************/
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



/** COMPONENT TILE - 1.0.0 *****************************************************/
var tile_html = '';
tile_html += '<button class="ui-stretch" type="tile" data-ng-click="tileCtrl.Callback(tileCtrl.labels.label)"">';
tile_html += '<ul class="ui-table">';
tile_html += '<li class="ui-vertical-top" data-ng-if=tileCtrl.icon><i class=material-icons>{{tileCtrl.icon}}</i></li>';
tile_html += '<li class="ui-vertical-top ui-padding-left ui-stretch ui-text-left">';
tile_html += '<label class="font-medium" data-ng-if=tileCtrl.labels.label>{{tileCtrl.labels.label}}</label>';
tile_html += '<label data-ng-if=tileCtrl.labels.detail data-ng-bind-html=tileCtrl.labels.detail></label>';
tile_html += '<label data-ng-if=tileCtrl.labels.description data-ng-bind-html=tileCtrl.labels.description></label>';
tile_html += '</li>';
tile_html += '</ul>';
tile_html += '</button>';

var tile_css = '';
tile_css += '<style>';
tile_css += 'tile-component { display: inline-block; position: relative; vertical-align: middle; width: 100%; }';
tile_css += 'tile-component button, tile-component button *, tile-component:hover { cursor: pointer; }';
tile_css += 'tile-component label:first-child { line-height: 135%; }';
tile_css += 'tile-component label:last-child { opacity: 0.8; }';
tile_css += '</style>';

function TileComponentCtrl()
{
  var tileCtrl = this;
  tileCtrl.Callback = function(obj) {
    if(tileCtrl.callbackFn) tileCtrl.callbackFn({obj:obj});
  }
}
const tileComponent = {
  controller: TileComponentCtrl,
  controllerAs: 'tileCtrl',
  bindings: {
    callbackFn: '&?',
    labels: '<',
    image: '<?',
    icon: '<?'
  },
  template: tile_css + tile_html
};

angular.module('app').component('tileComponent', tileComponent);




/** COMPONENT UPLOADFILE - 1.0.0 ***********************************************/
var uploadfile_html = '';
uploadfile_html += '<fieldset>';
uploadfile_html += '<ul class="ui-table">';
uploadfile_html += '<li class="ui-wrap-none">';
uploadfile_html += '<button data-ng-click="show=!show" data-ng-show=!show><i class="material-icons" data-ng-show=!show>photo</i> Add Photo</button>';
uploadfile_html += '<button data-ng-click="show=!show" data-ng-show=show><i class="material-icons">close</i></button>';
uploadfile_html += '</li>';
uploadfile_html += '<li class="ui-stretch">';
uploadfile_html += '<input id=upload-file name=object type=file data-ng-model=uploadfileCtrl.object data-ng-show=show></input>';
uploadfile_html += '<button type=button data-ng-click=uploadfileCtrl.uploadFile()>upload</button>';
uploadfile_html += '</li>';
uploadfile_html += '</ul>';
uploadfile_html += '</fieldset>';

var uploadfile_css = '';



function uploadfileComponentCtrl ($http)
{
  var uploadfileCtrl = this;

  //PROTOCOL METHODS FOR FORMS
  uploadfileCtrl.$onInit = function() {
    if(!uploadfileCtrl.uploads) uploadfileCtrl.uploads = []; //init object
  }

  uploadfileCtrl.uploadFile = function() {
    console.log('attempting to upload.');
    console.log(uploadfileCtrl.object);
    let photo = document.getElementById("upload-file").files[0];
    console.log(photo);
    
    $http.post("http://localhost:8070/upload", photo, {headers:{ 'Content-Type': 'application/x-www-form-urlencoded' }}).then(function (response) {
      console.log(response);
    });
  }
}
const uploadfileComponent = {
  controller: uploadfileComponentCtrl,
  controllerAs: 'uploadfileCtrl',
  bindings: {
    object: '=',
    label: '<',
    sublabel: '<?',
    required: '<?',
    placeholder: '<?'
  },
  template: uploadfile_css + uploadfile_html
};
angular.module('app').component('uploadfileComponent', uploadfileComponent);

angular.module('app').directive('upload-on-change', function() {
  // console.log('attempting to upload.');
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var onChangeHandler = scope.$eval(attrs.uploadOnChange);
      element.on('change', onChangeHandler);
      element.on('$destroy', function() {
        element.off();
      });

    }
  };
});




/********************************************************************************
** COMPONENT - SIGNOUT - 1.0.0 **************************************************
********************************************************************************/
var signout_html = '';
signout_html += '<div>';
signout_html += '<button data-ng-click=signoutCtrl.SetInfo()>';
signout_html += '<i class="material-icons" title="Signed in as {{signoutCtrl.user.first_name}} {{signoutCtrl.user.last_name}}">how_to_reg</i>';
signout_html += '<span data-ng-if=signoutCtrl.showname>Hello, {{signoutCtrl.user.first_name}}</span>';
signout_html += '</button>';
signout_html += '<button data-ng-click=signoutCtrl.Signout() title="Sign Out"><i class="material-icons">exit_to_app</i>Signout</button>';
signout_html += '</div>';

var signout_css = '';
signout_css += '<style>';
signout_css += 'signout-component { display: block; position: relative; }';
signout_css += 'signout-component > div { display: table; padding: 0 1rem; white-space: nowrap; }';
signout_css += 'signout-component > div > button { display: table-cell; white-space: nowrap; min-height: 60px; min-width: 60px; font-size: .8rem; }';
signout_css += 'signout-component > div > button:nth-child(2) { padding-left: 1rem; }';
signout_css += '</style>';

function signoutCtrl($route)
{
  var signoutCtrl = this;
  signoutCtrl.$onInit = function() {}

  signoutCtrl.SetInfo = function() {
    signoutCtrl.info = !signoutCtrl.info;
  }

  signoutCtrl.Signout = function() {
    window.localStorage.removeItem("authorized_apikey");
    window.localStorage.removeItem(md5("authorized_user"));
    $route.reload();
  }
}

const signoutComponent = {
  controller: signoutCtrl,
  controllerAs: 'signoutCtrl',
  bindings: {
    user: '<',
    showname: '<?'
  },
  template: signout_css + signout_html
};

angular.module('app').component('signoutComponent', signoutComponent);



/** COMPONENT SELECT - 1.0.0 ***************************************************/
var select_html = '';
select_html += '<fieldset>';
select_html += '<legend data-ng-if=selectCtrl.label>{{selectCtrl.label}}</legend>';
select_html += '<ul>';
select_html += '<li style="width:1%;" data-ng-if="selectCtrl.icon">';
select_html += '<i class="material-icons">{{selectCtrl.icon}}</i>';
select_html += '</li>';
select_html += '<li>';
select_html += '<select name=object data-ng-model=selectCtrl.object data-ng-options="each as each.label for each in selectCtrl.options" data-ng-change=selectCtrl.callback(selectCtrl.object) data-ng-required=selectCtrl.required>';
select_html += '<option value="">Please Select</option>';
select_html += '</select>';
select_html += '</li>';
select_html += '<li data-ng-if="selectCtrl.required">';
select_html += '<i class="material-icons unset" data-ng-if="!selectCtrl.object">error_outline</i>';
select_html += '<i class="material-icons set" data-ng-if=selectCtrl.object>done</i>';
select_html += '</li>';
select_html += '</ul>';
select_html += '</fieldset>';

var select_css = '';
select_css += '<style>';
select_css += 'select-component { display: block; position: relative; }';
select_css += 'select-component > fieldset > ul { display: table; width: 100%; }';
select_css += 'select-component > fieldset > ul > li { display: table-cell; }';
select_css += 'select-component > fieldset > ul > li:first-child { width: 100%; }';
select_css += '</style>';

function SelectComponentCtrl()
{
  var selectCtrl = this;

  selectCtrl.callback = function(obj) {
    if(selectCtrl.callbackFn != undefined) selectCtrl.callbackFn({obj:obj});
  }

  selectCtrl.Validate = function(arg) {
    return (selectCtrl.object ? true : false);
  }
}

const selectComponent = {
  controller: SelectComponentCtrl,
  controllerAs: 'selectCtrl',
  bindings: {
    callbackFn: '&?',
    object: '=',
    label: '<',
    options: '<',
    sublabel: '<?',
    disabled: '<?',
    required: '<?',
    icon: '<?'
  },
  template: select_css + select_html
};

angular.module('app').component('selectComponent', selectComponent);



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
    time: '<?',
    future: '<?',
    futureyears: '<?'
  },
  template: selectdate_css + selectdate_html
};

angular.module('app').component('selectdateComponent', selectdateComponent);



/** COMPONENT SELECTYESNO - 1.0.0 **********************************************/
var selectyesno_html = '';
selectyesno_html += '<fieldset>';
selectyesno_html += '<legend data-ng-if=selectyesnoCtrl.label>{{selectyesnoCtrl.label}}</legend>';
selectyesno_html += '<ul>';
selectyesno_html += '<li>';
selectyesno_html += '<select name=select-identity data-ng-model=selectyesnoCtrl.object data-ng-required=selectyesnoCtrl.required data-ng-options="each as each.label for each in selectyesnoCtrl.options" data-ng-change=selectyesnoCtrl.callback(selectyesnoCtrl.object)>';
selectyesno_html += '<option value="">Please Select</option>';
selectyesno_html += '</select>';
selectyesno_html += '</li>';
selectyesno_html += '<li data-ng-if="selectyesnoCtrl.required">';
selectyesno_html += '<i class="material-icons set" data-ng-if="selectyesnoCtrl.object">done</i>';
selectyesno_html += '<i class="material-icons unset" data-ng-if="!selectyesnoCtrl.object">error_outline</i>';
selectyesno_html += '</li>';
selectyesno_html += '</ul>';
selectyesno_html += '</fieldset>';

var selectyesno_css = '';
selectyesno_css += '<style type="text/css">';
selectyesno_css += 'selectyesno-component { display: block; position: relative; width: 100%; }';
selectyesno_css += 'selectyesno-component > fieldset > ul { display: table; width:100%; }';
selectyesno_css += 'selectyesno-component > fieldset > ul > li { display: table-cell; }';
selectyesno_css += 'selectyesno-component > fieldset > ul > li:first-child { width: 100%; }';
selectyesno_css += '</style>';

function selectyesnoCtrl()
{
  var selectyesnoCtrl = this;
  
  selectyesnoCtrl.$onInit = function() {
    selectyesnoCtrl.options = [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" }
    ];
  }

  selectyesnoCtrl.callback = function(obj) {
    if(selectyesnoCtrl.callbackFn != undefined) selectyesnoCtrl.callbackFn({obj:obj});
  }
}

const selectyesnoComponent = {
  controller: selectyesnoCtrl,
  controllerAs: 'selectyesnoCtrl',
  bindings: {
    callbackFn: '&?',
    label: '<',
    disabled: '<?',
    required: '<',
    object: '='
  },
  template: selectyesno_css + selectyesno_html
};

angular.module('app').component('selectyesnoComponent', selectyesnoComponent);


/********************************************************************************
** COMPONENT - SELECTREADWRITE - 1.0.0 ******************************************
********************************************************************************/
var selectreadwrite_html = '';
selectreadwrite_html += '<fieldset>';
selectreadwrite_html += '<legend data-ng-if=selectreadwriteCtrl.label>{{selectreadwriteCtrl.label}}</legend>';
selectreadwrite_html += '<ul>';
selectreadwrite_html += '<li>';
selectreadwrite_html += '<select name=select-identity data-ng-model=selectreadwriteCtrl.object data-ng-required=selectreadwriteCtrl.required data-ng-options="each as each.label for each in selectreadwriteCtrl.options" data-ng-change=selectreadwriteCtrl.callback(selectreadwriteCtrl.object)>';
selectreadwrite_html += '<option value="">Please Select</option>';
selectreadwrite_html += '</select>';
selectreadwrite_html += '</li>';
selectreadwrite_html += '<li data-ng-if="selectreadwriteCtrl.required">';
selectreadwrite_html += '<i class="material-icons set" data-ng-if="selectreadwriteCtrl.object">done</i>';
selectreadwrite_html += '<i class="material-icons unset" data-ng-if="!selectreadwriteCtrl.object">error_outline</i>';
selectreadwrite_html += '</li>';
selectreadwrite_html += '</ul>';
selectreadwrite_html += '</fieldset>';

var selectreadwrite_css = '';
selectreadwrite_css += '<style type="text/css">';
selectreadwrite_css += 'selectreadwrite-component { display: block; position: relative; width: 100%; }';
selectreadwrite_css += 'selectreadwrite-component > fieldset > ul { display: table; width:100%; }';
selectreadwrite_css += 'selectreadwrite-component > fieldset > ul > li { display: table-cell; }';
selectreadwrite_css += 'selectreadwrite-component > fieldset > ul > li:first-child { width: 100%; }';
selectreadwrite_css += '</style>';

function selectreadwriteCtrl()
{
  var selectreadwriteCtrl = this;
  
  selectreadwriteCtrl.$onInit = function() {
    selectreadwriteCtrl.options = [
        { label: "Read", value: "read" },
        { label: "Write", value: "write" },
        { label: "Both", value: "readwrite" }
    ];
  }

  selectreadwriteCtrl.callback = function(obj) {
    if(selectreadwriteCtrl.callbackFn != undefined) selectreadwriteCtrl.callbackFn({obj:obj});
  }
}

const selectreadwriteComponent = {
  controller: selectreadwriteCtrl,
  controllerAs: 'selectreadwriteCtrl',
  bindings: {
    callbackFn: '&?',
    label: '<',
    disabled: '<?',
    required: '<',
    object: '='
  },
  template: selectreadwrite_css + selectreadwrite_html
};

angular.module('app').component('selectreadwriteComponent', selectreadwriteComponent);



/** COMPONENT SEARCHKEYWORD - 1.0.1 ********************************************/
var searchkeyword_html = '';
searchkeyword_html += '<ul>';
searchkeyword_html += '<li><i class="material-icons">search</i></li>';
searchkeyword_html += '<li>';
searchkeyword_html += '<input autofocus placeholder={{searchkeywordCtrl.placeholder}} type=text class="ui-stretch" data-ng-model=searchkeywordCtrl.query.value.$ data-ng-change=searchkeywordCtrl.SetSearch(searchkeywordCtrl.query) data-ng-model-options="{debounce: 1000}">';
searchkeyword_html += '</li>';
searchkeyword_html += '<li data-ng-if=searchkeywordCtrl.count>';
searchkeyword_html += '{{searchkeywordCtrl.count}}';
searchkeyword_html += '</li>';
searchkeyword_html += '<li data-ng-if=searchkeywordCtrl.query.value.$>';
searchkeyword_html += '<button data-ng-click=searchkeywordCtrl.Cancel()><i class="material-icons set">close</i></button>';
searchkeyword_html += '</li>';
searchkeyword_html += '</ul>';

var searchkeyword_css = '';
searchkeyword_css += '<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">';
searchkeyword_css += '<style>';
searchkeyword_css += 'searchkeyword-component { display: block; position: relative; }';
searchkeyword_css += 'searchkeyword-component > ul { display: table; margin: 0; padding: 0;}';
searchkeyword_css += 'searchkeyword-component > ul > li { display: table-cell; margin: 0; padding: 0;}';
searchkeyword_css += 'searchkeyword-component > ul > li > input { padding: 0 .5rem;}';
searchkeyword_css += '</style>';

function SearchKeywordComponentCtrl($routeParams) {
  var searchkeywordCtrl = this;

  searchkeywordCtrl.$onInit = function() {
    if(!$routeParams.query) searchkeywordCtrl.query = undefined;
    if($routeParams.query) searchkeywordCtrl.query = {value:{$:$routeParams.query}};
  }
  searchkeywordCtrl.SetSearch = function(arg) {
    if(arg == undefined || arg && !(arg.value.$).length) {
      searchkeywordCtrl.query = undefined;
    }
    if(arg && (arg.value.$).length > 2) {
      if(searchkeywordCtrl.callbackFn) searchkeywordCtrl.callbackFn({obj:searchkeywordCtrl.query});
      searchkeywordCtrl.query = arg;
    }
  }
  searchkeywordCtrl.SearchActive = function() {
    var bool = false;
    if(searchkeywordCtrl.query) bool = true;
    return bool;
  }
  searchkeywordCtrl.Cancel = function() {
    if(searchkeywordCtrl.callbackFn) searchkeywordCtrl.callbackFn({obj:undefined});
    searchkeywordCtrl.query = undefined;
  }
}
const searchkeywordComponent = {
  controller: SearchKeywordComponentCtrl,
  controllerAs: 'searchkeywordCtrl',
  bindings: {
    callbackFn: '&?',
    query: '=',
    placeholder: '<?',
    count:'<?'
  },
  template: searchkeyword_css + searchkeyword_html
};
angular.module('app').component('searchkeywordComponent', searchkeywordComponent);