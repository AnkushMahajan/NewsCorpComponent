/**
 * Created by Ankush on 4/9/2016.
 */

var context ={};

function CustomList(configObj){
    context.itemsVisible = configObj.items?configObj.items:10;
    if(configObj.JSONURL){
        context.JSONURL = configObj.JSONURL;
    }else{
        throw "URL or JSON File Path is required!!";
    }

}

CustomList.prototype.createElem = function(){

    var newsListContext = {};

    //Inherit from base HTMLELEMENT --> change it extend from DIV or UL if templating doesn't work out well
    newsListContext.newsElemProto = Object.create(HTMLElement.prototype);

    newsListContext.newsElemProto.attachedCallback = function(){
        var shadow = this.createShadowRoot();
        context.getJSON(function(request){
            context.JSONObject = JSON.parse(request.responseText);
            var temp = context.JSONObject;

            //show the default/configured number of visible news
            if(context.JSONObject.length > context.itemsVisible){
                temp = context.JSONObject.splice(0,context.itemsVisible);
            }
            context.templateData = {};
            context.templateData.JSONObjectForTemplate = temp;
            $.get("../NewsCorpComponent/templates/ListBuilder.html", function(template, textStatus, jqXhr){
                var template = $(template).filter("#listBuilder").html();
                var formedHtml = Mustache.render(template, context.templateData);
                shadow.innerHTML = formedHtml;
            });
            
        }, errorHandler);


    };

    newsListContext.NewsList = document.registerElement("news-list",{
        prototype: newsListContext.newsElemProto
    });

    var newNewsList = document.createElement("news-list");

    document.body.appendChild(newNewsList);
};

context.getJSON = function(successCallBack, errorCallBack){
    var request = new XMLHttpRequest();

    //pass true as third param to ensure the call is async
    request.open("GET", context.JSONURL, true);
    request.send(null);

    request.onreadystatechange = function() {
        if (request.readyState === 4 && request.status === 200) {
            //call back to process data once request has resolved with status 200
            successCallBack(request);
        }else if(request.readyState === 4 && request.status == 404){
            errorCallBack(request);
        }
    };

}


// failure error callback
function errorHandler(request){
    context.error.JSONError ="Unable to fetch data";
}

//Testing the initial setup
var elem = new CustomList({
    JSONURL: "dummy.json"
});

elem.createElem();

