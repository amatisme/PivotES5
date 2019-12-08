/** SERVICE FORM - 1.0.0 *******************************************************/
app.service('formService', function ()
{
  var srv = this;
  srv.forms = app.pivot.forms;
  if(srv.forms.length == 1) srv.form = app.pivot.forms[0];

  srv.SetUser = function(obj) {
    srv.user = obj;
  }
  
  srv.SetForm = function(obj) {
    srv.form = obj;
    if(!srv.form.types) { //is final option
      srv.type = obj;
      srv.notification = srv.form.notification;
      srv.validate = srv.form.validate;
    }
  }

  srv.UnsetForm = function() {
    if(srv.type) srv.type = undefined;
    if(srv.notification) srv.notification = false;
    if(srv.validate) srv.validate = false;
    srv.form = undefined;
    srv.submit = undefined;
    srv.object = undefined;
    srv.crumb = undefined;
  }

  srv.SetCrumb = function(str) {
    if(!srv.crumb) srv.crumb = [];
    srv.crumb.push(str);
  }

  srv.UnsetCrumb = function(index) {
    (index == 0 ? this.UnsetForm() : this.UnsetType());
  }

  srv.SetType = function(str) {
    srv.type = str;
    srv.SetValidate();
    srv.SetNotification();
  }

  srv.UnsetType = function() {
    srv.type = undefined;
    srv.notification = undefined;
    srv.validate = undefined;
    srv.object = undefined;
    srv.crumb.pop();
  }

  srv.SetNotification = function() {
    srv.notification = srv.form.notification;
  }

  srv.SetValidate = function() {
    srv.validate = true;
  }

  srv.AuthorizeByGroups = function(group,groups) {
    if(!groups) return true;
    return groups.filter(name => group.includes(name)).length != 0;
  }
});