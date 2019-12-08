/** SERVICE TEMPLATE - 1.0.2 ***************************************************/
app.service('templateService', function ($http)
{
  var srv = this;
  
  //set page title
  document.title = app.webui.title;
  
  //load globals
  srv.label = app.webui.label;
  srv.version = app.webui.version;
  srv.host = app.webui.template.host;
  srv.name = app.webui.template.name;
  srv.version = app.webui.template.version;
  srv.view = app.webui.template.view;

  //load template config
  $http.get(srv.host + '/' + srv.version + '/template/' + srv.name + '/config.json').then(function(resp) {
    srv.config = resp.data;
  });

  //callback component functions
  srv.NavCallback = function(obj) { window.open(obj.path, obj.target); }
  srv.CellStubCallback = function(obj) { ctrl.SetObjects(obj.value); }
  srv.DropMenuCallback = function(obj) { window.open(obj.url,obj.target); }
  srv.SearchCallback = function(obj) { if(obj) { ctrl.SetObjects(obj.value.$); } else { ctrl.objects = undefined; } }
});