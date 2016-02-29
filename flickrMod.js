const https = require('https');
const eventEmitter = require('events');
const util = require('util');

//pieces of the flickr url
const flicUrlBegin = 'https://api.flickr.com/services/rest/?method=flickr.',flicUrlEnd = '&format=json&nojsoncallback=?';



//constructor
function Flickr(key){
	if(key == undefined)
		throw new Error('please pass flickr key as constructor argument');

	eventEmitter.call(this);
	this.key = key;
}
util.inherits(Flickr,eventEmitter);
module.exports = Flickr;



Flickr.prototype.custom = function(urlPieces,callback){
        this.getInfo(flicUrlBegin + adjustTerms(urlPieces) + '&api_key=' + this.key + flicUrlEnd,callback);
}



Flickr.prototype.searchImages = function(searchTerms,numImages,callback){
	this.getInfo(flicUrlBegin + 'photos.search&api_key=' + this.key + '&tags=' + adjustTerms(searchTerms) + '&per_page=' + numImages + flicUrlEnd,callback);
}



Flickr.prototype.getInfo = function(searchString,callback){
	var data = "";
        https.get(searchString, (res) => {
                res.on('data', (d) => {
                        this.emit('data',d);
                        data += d;
                });

                res.on('end',() => {
                       	 this.emit('end');
			 callback(false,data);
                });

        }).on('error', (e) => {
                callback(e,data);
        });
}



//if an array of arguments was passed in, return a formatted string to be used in the get request
function adjustTerms(searchTerms){
        if( searchTerms.constructor == Array){
                var temp = searchTerms[0];
                for(var i = 1; i < searchTerms.length; i++)
                        temp += "&" + searchTerms[i];
                searchTerms = temp;
        }
	return searchTerms;
}
