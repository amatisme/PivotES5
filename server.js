// set up ======================================================================
const path = require('path');
const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require("body-parser");

//create app
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : 'tmp'
}));

//pivot google cloud
const PivotFireStore = require('./pivot.firestore.js');
const PivotStorage = require('./pivot.storage.js');
var pivotFireStore = new PivotFireStore();
var pivotStorage = new PivotStorage();

//post
app.post('/user', cors(), function(req ,res) {
  console.log(req.body);
  pivotFireStore.addDocument('users', ['first','last', 'born'], req.body).then(response => {
    res.send(response);
  });
});

app.post('/client', cors(), function(req ,res) {
  pivotFireStore.addDocument('client', ['name','token'], req.body).then(response => {
    res.send(response);
  });
});

app.post('/upload', cors(), function(req ,res) {
  console.log('Attempting to upload file.');
  // console.log(req);

  pivotStorage.uploadFile(req.files.foo).then(response => {
    if(!response.error) {
      pivotFireStore.addDocument('upload', [], {
        name: response.params.id, 
        size: response.params.size, 
        url: response.params.mediaLink
      }).then(resp => {
        res.send({
          upload: response,
          object: resp
        });
      });
    } else {
      res.send(response);
    }
  });
});

//get
app.get('/upload', cors(), function(req ,res) {
  var file = path.join(__dirname, './fileupload.html');
  res.sendFile(file);
});

app.get('/:store/all', cors(), function(req ,res) {
  pivotFireStore.getDocuments(req.params.store).then(response => {
    res.send(response);
  });
});

app.get('/:version/js/core', cors(), function(req ,res) {
  var file = path.join(__dirname, './app/_build', req.params.version, 'js/pivot.core.min.js');
  res.sendFile(file);
});

app.get('/:version/js/component', cors(), function(req ,res) {
  var file = path.join(__dirname, './app/_build', req.params.version, 'js/pivot.component.min.js');
  res.sendFile(file);
});

app.get('/:version/js/contentful', cors(), function(req ,res) {
  var file = path.join(__dirname, './app/_build', req.params.version, 'js/pivot.contentful.min.js');
  res.sendFile(file);
});

app.get('/:version/js/jira', cors(), function(req ,res) {
  var file = path.join(__dirname, './app/_build', req.params.version, 'js/pivot.jira.min.js');
  res.sendFile(file);
});

app.get('/:version/js/netservice', cors(), function(req ,res) {
  var file = path.join(__dirname, './app/_build', req.params.version, 'js/pivot.netservice.js');
  res.sendFile(file);
});

app.get('/:version/html/:filename', cors(), function(req ,res) {
  var file = path.join(__dirname, './app/_build', req.params.version, 'html', req.params.filename);
  res.sendFile(file);
});

app.get('/:version/css/style.css', cors(), function(req ,res) {
  var file = path.join(__dirname, './app/_build', req.params.version, 'css/pivot.min.css');
  res.sendFile(file);
});

app.get('/:version/template/:template/style.css', cors(), function(req ,res) {
  var file = path.join(__dirname, './app/_build/', req.params.version, 'template', req.params.template, 'style.min.css');
  res.sendFile(file);
});

app.get('/:version/template/:template/:filename', cors(), function(req ,res) {
  var file = path.join(__dirname, './app/_build/', req.params.version, 'template', req.params.template, req.params.filename);
  res.sendFile(file);
});

//http server
const server = app.listen(8070, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Listening at http://' + host + ':' + port);
});