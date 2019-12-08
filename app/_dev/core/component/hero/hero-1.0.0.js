/********************************************************************************
** COMPONENT - HERO - 1.0.0 *****************************************************
********************************************************************************/
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