const https = require('https'),
 			eventEmitter = require('events'),
 			util = require('util'),
 			flicUrlBegin = 'https://api.flickr.com/services/rest/?method=flickr.',
			flicUrlEnd = '&format=json&nojsoncallback=?';


//constructor
function Flickr(key){
	if(key === undefined)
		throw new Error('please pass flickr key as constructor argument');

	eventEmitter.call(this);
	this.key = key;

	this.custom("test.echo",(error,data)=>{
		if(error)
			this.emit('init_error',error,null);
		else if(JSON.parse(data)['stat'] === 'fail')
			this.emit('init_error',null,JSON.parse(data));
		else
			this.emit('init_success');
		});
}
util.inherits(Flickr,eventEmitter);
module.exports = Flickr;


Flickr.prototype.custom = function(urlPieces,callback){
	if(arguments.length !== 2)
		throw new Error('Please pass in urlPieces and a callback function to the custom function');
	getInfo(flicUrlBegin + adjustTerms(urlPieces) + '&api_key=' + this.key + flicUrlEnd,callback,this);
};


Flickr.prototype.searchImages = function(searchTerms,numImagesPerPage,callback){
	if(arguments.length !== 3)
		throw new Error('Please pass in searchTerms, numImages and a callback function to the searchImages function');
	getInfo(flicUrlBegin + 'photos.search&api_key=' + this.key + '&tags=' + adjustTerms(searchTerms) + '&per_page=' + numImagesPerPage + flicUrlEnd,callback,this);
};


function getInfo(searchString,callback,thisArg){
	var data = "";
  	https.get(searchString, (res) => {
    	res.on('data', (d) => {
      	thisArg.emit('data',d);
        	data += d;
        });

      res.on('end',() => {
      	thisArg.emit('end');
			 		callback(null,data);
        });

    }).on('error', (e) => {
    	return callback(e,data);
    });
};


//if an array of arguments was passed in, return a formatted string to be used in the get request
function adjustTerms(searchTerms){
	if(Array.isArray(searchTerms)){
		var temp = searchTerms[0];
		for(var i = 1; i < searchTerms.length; i++)
			temp += "&" + searchTerms[i];
		searchTerms = temp;
	}
	return searchTerms;
};
