# Asyncify

> Makes a function conform to node-style callback convention

__Install:__

```
npm install asyncify
```

__Usage:__

```javascript
var async = require('async');
require('asyncify');

var doSomeWork = function( t ){
  console.log("doin' work");
  $('.page-title').text( t );
};

async.series([
  console.log.async( console, 1, 2 )
, doSomeWork.async( null, 'Ohyeaaaah' )
, console.log.async().bind( console, 'also, use bind' )
, console.log.async( console, 'complete, ':)' )
]);

// => 1, 2
// => doin' work
// => also, use bind
// => complete :)
```