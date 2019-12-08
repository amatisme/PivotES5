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
