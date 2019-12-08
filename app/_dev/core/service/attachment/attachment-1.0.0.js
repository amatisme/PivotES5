app.service('attachmentService', function ($q) {
  this.SetAttachments = function(doc) {
    var deferred = $q.defer();
    var fileInput = document.getElementById('uploads');
    if(fileInput != null) {
      var files = fileInput.files;
      if(files.length > 0) {

        //check that files do not exceed size limit
        var total_size = 0;
        for (var i = 0; i < files.length; i++) total_size = total_size + files[i].size;

        if(total_size < 10485760) { //less then 10MB
          var attachments = {};
          for (var i = 0; i < files.length; i++) { //for multiple files
            (function(file) {
              var name = file.name;
              var reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onloadend = function(e) {
                var dataUrl = reader.result;
                var base64 = dataUrl.split(',')[1]; //this took all day!
                attachments[name] = {};
                attachments[name].content_type = file.type;
                attachments[name].data = base64;
                if(Object.keys(attachments).length == files.length) {
                  deferred.resolve({ok:attachments});
                }
              };
              reader.onerror = function (error) {
                console.log('Error: ', error);
              };
            })(files[i]);
          }
        } else {
          console.log({error:'Current file size exceeds 10MB.'});
          deferred.resolve({error:'Current file size exceeds 10MB.'});
        }
      } else {
        deferred.resolve(false);
      }
    } else {
      deferred.resolve(false);
    }
    return deferred.promise;
  }
});
