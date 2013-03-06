var express = require("express");
var mongojs = require("mongojs");
//var layout = require("layout");
var app = express();

var databaseUrl = "nodeFun";
var collections = ["facts"];
var db = mongojs(databaseUrl, collections);

function tag(tagName, html, attributes) {
   result = "<" + tagName;
   for(var attr in attributes)
   {
     result += " " + attr + "='" + attributes[attr] +"'";
   }
   return result + ">" + html + "</" + tagName + ">";
}

app.get("/", function(req,res) {
	var body = tag("div","Hello!", {class:"heading"});
   	
    db.facts.find({name:/.*/}, function(err, facts) {
	   facts.forEach( function(fact) {
		   body += tag("div",fact.name, {class:"nameDiv"});
	   });
	
	   res.send(body);
    });

});

app.listen(3000);
console.log("Listening on port 3000");