const https = require('https');


exports.getList = function(searchTerms,numImages,apiKey,callback){
        var data = "";

        if( searchTerms.constructor == Array){
                var temp = searchTerms[0];
                for(var i = 1; i < searchTerms.length; i++)
                        temp += "&" + searchTerms[i];
                searchTerms = temp;
        }

        https.get('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + apiKey + '&tags=' + searchTerms + '&per_page=' + numImages + '&format=json&nojsoncallback=?', (res) => {

                res.on('data', (d) => {
                        data += d;
                });

                res.on('end',() => {
                        callback(false,data);
                });

        }).on('error', (e) => {
                callback(e,data);
        });
}
