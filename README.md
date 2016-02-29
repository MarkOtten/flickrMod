<h2>flickrMod</h2>
 This Nodejs module simplifies searching flickr for images and using the flickr api in general. It also Extends EventEmitter, and exposes on: ‘data’ and ’end’ to the user.
  Upon completion it returns a JSON containing information that flickr has supplied.
 If there is an error, it is a flickr error message,  <a href="https://www.flickr.com/services/api/"> look up error message here </a>

<h2>Example</h2>
<h3>Searching for images</h3>
<code>const flic = require('flickrMod');

var search = new flic(‘flickr-key’);

search.searchImages(‘search-term(s)',num-images,(error,data)=>{
        
	if(error)
        	//handle error

        var img = JSON.parse(data);
});
search.on('data', (d)=>{....});
search.on(‘end’, ()=>{......});
</code><ul>
<li>search-term(s) : a string ex 'tower' or an array of strings [ 'tower' , 'clock' ,….]</li>
<li>num-images : number of images to be returned. [1-500]</li>
<li>flickr-key : api key associated with your flickr account</li>
</ul>
<h3>Other API</h3>
 The rest of the flicker api can be used in a similar manner by using the custom function. The first argument is an array that consists of the flickr method that is to be 
invoked followed by the accompanying method arguments.
<code>search.custom([‘flickr_api_method’,’method_argument0',....,’method_argument_n’],(error,data)=>{

	if(error)
        	//handle error

        var val = JSON.parse(data);
});
</code>

<h2>License</h2>
 Copyright (c) 2016  Mark Otten

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
