<h2>flickrMod</h2>
 This Nodejs module simplifies searching flickr for images.
  Upon completion it returns a JSON containing image information that flickr has supplied.
 If there is an error, it is a flickr error message,  <a href="https://www.flickr.com/services/api/flickr.photos.search.html"> click here for error message details </a>

<h2>Example</h2>
<code>
const search = require('flickrMod');

search.getList('search-term(s)',num-images,'flickr-key',(error,data)=>{

        if(error)
        	//handle error

        var flic = JSON.parse(data);
});

</code>
<ol>
<li>search-term(s) : a string ex 'tower' or an array of strings [ 'tower' , 'clock' ,….]</li>
<li>num-images : number of images to be returned. [1-500]</li>
<li>flickr-key : api key associated with your flickr account</li>
</ol>

<h2>License</h2>
 Copyright (c) 2016  Mark Otten

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
