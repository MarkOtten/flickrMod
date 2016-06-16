const flick = require('../flickrMod.js'),
      key = require('../keys');


describe('Testing the custom function',function(){
  it('should load some images',function(done){
    var load = new flick(key.flickrKey);

    load.custom(['photos.search','tags=cats','tree','per_page=4'],(err,data)=>{
      expect(err).toBe(null);
      done();
    });
  });
});


describe("Tests that searchImages works as expected",function(){
  it("Should load images for valid key, and fail for invalid key",function(done){
    var load = new flick(key.flickrKey),
        fail = new flick(key.flickrFailKey),
        fin_count = 0;

    load.searchImages('cats',3,(err,data)=>{
        expect(err).toBe(null);
        expect(JSON.parse(data)['stat']).toBe('ok');
        fin_count++;
        if(fin_count > 1)
          done();
    });

    fail.searchImages(['trees'],3,(err,data)=>{
        expect(JSON.parse(data)['stat']).toNotBe('ok');
        fin_count++;
        if(fin_count > 1)
          done();
    });
  });
});


describe("Checking the constructor",function(){
  it("Should emit init_success for valid_key and init_error for invalid key",function(done){
    var tru = new flick(key.flickrKey),
        fail = new flick(key.flickrFailKey),
        tNum = 0,
        fNum = 0;

    tru.on('init_error',(error)=>{
      done(new Error('valid key initialized unsuccessfully'));
    });

    tru.on('init_success',()=>{
      tNum++;
      if(fNum > 0)
       done();
    });

    fail.on('init_error',(error,data)=>{
       fNum++;
       if(tNum > 0)
        done();
    });

    fail.on('init_success',()=>{
      done(new Error('bad key initialized successfully'));
    });
  });


  it("Should throw an error when a flickr key is not supplied to the constructor",function(done){
    var errors = 0;
    try{
      var flic = new flickr();
    }
    catch(err){
      errors++;
    }
    finally{
      expect(errors).toBe(1);
      done();
    }
  });
});
