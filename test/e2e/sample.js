var casper = casper;

casper.test.begin("testing casper site", function(test){
  
  casper.start('http://google.com', function() {
    this.fill('form[action="/search"]', { q: 'foobar' }, true);
  });

  casper.then(function() {
    test.assert(true);
    this.echo('Page: ' + this.getTitle());
  })

  casper.run(function(){
    test.done()
  });

});

