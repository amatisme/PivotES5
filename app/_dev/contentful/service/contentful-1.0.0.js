app.service('contentfulService', function ($q,$http,$filter)
{
  var srv = this;
  srv.uri = "https://cdn.contentful.com/spaces/[YOUR_SPACEID_HERE]";
  srv.header = {headers:{'Content-Type':'application/json','Authorization': 'Bearer [YOUR_API_TOKEN_HERE]'}};

  this.GetEntries = function() {
    var deferred = $q.defer();
    $http.get(srv.uri + "entries/", srv.header).then(function (response) {
      //store
      srv.entries = response.data.items;
      //collect
      var articles = $filter('filter')(response.data.items, {sys:{contentType:{sys:{id:'article'}}}});
      var accordions = $filter('filter')(response.data.items, {sys:{contentType:{sys:{id:'accordian'}}}});
      var menus = $filter('filter')(response.data.items, {sys:{contentType:{sys:{id:'menu'}}}});
      var galleries = $filter('filter')(response.data.items, {sys:{contentType:{sys:{id:'gallery'}}}});
      var blocks = $filter('filter')(response.data.items, {sys:{contentType:{sys:{id:'block'}}}});
      //map
      deferred.resolve({
        articles: articles.map(obj => srv.MapArticle(obj,obj.sys.id)),
        accordions: accordions.map(obj => srv.MapAccordion(obj,obj.sys.id)),
        menus: menus.map(obj => srv.MapMenu(obj,obj.sys.id)),
        galleries: galleries.map(obj => srv.MapGallery(obj,obj.sys.id)),
        blocks: blocks.map(obj => srv.MapBlock(obj,obj.sys.id))
      });
    });
    return deferred.promise;
  }

  this.GetAssets = function() {
    var deferred = $q.defer();
    $http.get(srv.uri + "assets/", srv.header).then(function (response) {
      //map
      srv.assets = response.data.items.map(obj => srv.MapAsset(obj,obj.sys.id));
      deferred.resolve(srv.assets);
    });
    return deferred.promise;
  }

  this.parseRichText = function(obj) {
    var deferred = $q.defer();
    //retrieve the object and insert into node array at index
    var contentArray = [];
    for(var i = 0; i < obj.content.length; i++) {
      switch(obj.content[i].nodeType) {
        case "embedded-asset-block":
          contentArray.push(undefined); //claim array index during async
          srv.GetRichTextAsset(obj.content[i].data.target.sys.id,i).then(function (asset) {
            if(asset.index !== -1) contentArray[asset.index] = {component:'image',data:asset.data};
          });
        break;
        case "embedded-entry-block":
          contentArray.push(undefined); //claim array index during async
          srv.GetRichTextEntry(obj.content[i].data.target.sys.id,i).then(function (entry) {
            if(entry.index !== -1) contentArray[entry.index] = {component:entry.component,data:entry.data};
          });
        break;
        default:
          contentArray.push({component:'html',data:srv.parseRichTextNode(obj.content[i])});
        break;
      }
    }
    var output = "";
    for(var i = 0; i < contentArray.length; i++) { output+= contentArray[i]; }
    deferred.resolve(contentArray);
    return deferred.promise;
  }

  this.GetRichTextAsset = function(id,index) {
    var deferred = $q.defer();
    var obj = $filter('filter')(srv.assets, {id: id})[0];
    deferred.resolve({
      index: index,
      data: obj
    });
    return deferred.promise;
  }

  this.GetRichTextEntry = function(id,index) {
    var deferred = $q.defer();
    //filter out object
    var obj = $filter('filter')(srv.entries, {sys:{id: id}})[0];
    switch(obj.sys.contentType.sys.id) {
      case "accordian":
        //parse rich text
        srv.parseRichText(obj.fields.text).then(function (text) {
          obj.fields.text = text;
          deferred.resolve({
            index:index,
            component: "accordion",
            data: srv.MapAccordion(obj)
          });
        });
        break;
      case "gallery":
        // parse rich text
        srv.parseRichText(obj.fields.assets).then(function (assets) {
          obj.fields.assets = assets
          deferred.resolve({
            index:index,
            component: "gallery",
            data: srv.MapGallery(obj)
          });
        });
        break;
      case "note":
        deferred.resolve({
          index:index,
          component: "note",
          data: srv.MapNote(obj)
        });
        break;
      default: break;
    }
    return deferred.promise;
  }

  this.parseRichTextNode = function(obj) {
    var output = "";
    if(obj.nodeType != "text") {
      for(var i = 0; i < obj.content.length; i++) {
        var tag = "";
        switch(obj.nodeType) {
          case "blockquote": tag = "blockquote"; break;
          case "paragraph": tag = "p"; break;
          case "unordered-list": tag = "ul"; break;
          case "list-item": tag = "li"; break;
          case "hyperlink": tag = "a"; break;
          case "heading-1": tag = "h1"; break;
          case "heading-2": tag = "h2"; break;
          case "heading-3": tag = "h3"; break;
          case "heading-4": tag = "h4"; break;
          case "heading-5": tag = "h5"; break;
          case "heading-6": tag = "h6"; break;
          default: break;
        }
        //render node
        if(tag && i == 0) output += '<' + tag + (tag == "a" ? ' href="' + obj.data.uri + '"' : '') + '>';
        output += srv.parseRichTextNode(obj.content[i]);
        if(tag && i == (obj.content.length - 1)) output += '</' + tag + '>';
      }
    } else if(obj.marks) { //render final text with marks
      if(obj.marks.length) {
        for(var i = 0; i < obj.marks.length; i++) {
          var tag = "";
          switch(obj.marks[i].type) {
            case "bold": tag = "b"; break;
            case "italic": tag = "i"; break;
            case "underline": tag = "u"; break;
            default: break;
          }
          if(tag && i == 0) output += '<' + tag + '>';
          output += obj.value;
          if(tag && i == (obj.marks.length - 1)) output += '</' + tag + '>';
        }
      } else {
        output += obj.value;
      }
    } else {
      output += obj.value;
    }
    return output;
  }

  this.MapArticle = function(obj,id) {
    var menu_id = (obj.fields.menuId ? obj.fields.menuId : undefined);
    var aside_image_id = (obj.fields.asideImage ? obj.fields.asideImage.sys.id : undefined);
    var body_image_id = (obj.fields.bodyImage ? obj.fields.bodyImage.sys.id : undefined);
    return {
      id: id,
      name: obj.fields.name,
      label: obj.fields.label,
      title: obj.fields.title,
      business_unit: obj.fields.businessUnit,
      blocks: obj.fields.blocks,
      notes: obj.fields.notes,
      content: obj.fields.content,
      enhanced: (obj.fields.template == 'Landing' ? true : false),
      aside_image_id: aside_image_id,
      body_image_id: body_image_id,
      menu_id: menu_id
    }
  }

  this.MapMenu = function(obj,id) {
    return {
      id: id,
      name: obj.fields.name,
      label: obj.fields.label,
      description: obj.fields.description,
      data: obj.fields.data,
      image: obj.fields.image,
      type: obj.fields.type
    }
  }

  this.MapBlock = function(obj,id) {
    return {
      id: id,
      name: obj.fields.name,
      label: obj.fields.label,
      icon: obj.fields.labelIcon,
      detail: obj.fields.detail,
      style: obj.fields.style
    }
  }

  this.MapAsset = function(obj,id) {
    return {
      id: id,
      url: obj.fields.file.url,
      type: obj.fields.file.contentType,
      size: obj.fields.file.details.size,
      image: obj.fields.file.details.image,
      description: obj.fields.description
    }
  }

  this.MapAccordion = function(obj,id) {
    var content = (obj.fields.text ? obj.fields.text : obj.fields.content);
    return {
      id: id,
      label: obj.fields.label,
      title: obj.fields.title,
      content: content
    }
  }

  this.MapGallery = function(obj,id) {
    return {
      id: id,
      name: obj.fields.name,
      title: obj.fields.title,
      images: obj.fields.assets
    }
  }

  this.MapNote = function(obj,id) {
    return {
      id: id,
      label: obj.fields.label,
      detail: obj.fields.detail
    }
  }
});
