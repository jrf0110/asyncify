/**
 * Makes a function conform to node-style callback convention
 * Why? To make them instantly composable with async control-flows.
 *
 * Example with async.js:
 *
 * var doSomeWork = function( t ){
 *   console.log("doin' work");
 *   $('.page-title').text( t );
 * };
 *
 * utils.async.series([
 *   console.log.async( console, 1, 2 )
 * , doSomeWork.async(null, 'Ohyeaaaah')
 * , console.log.async().bind( console, 'also, use bind' )
 * , console.log.async( console, 'complete, ':)' )
 * ]);
 *
 * => 1, 2
 * => doin' work
 * => also, use bind
 * => complete :)
 * 
 * @return {Function} The new async-style function
 */
 
Object.defineProperty( Function.prototype, 'async', {
  enumerable: false
, value: function(){
    var this_ = this, args = Array.prototype.slice.call( arguments, 1 );
    var context = arguments[0];
 
    return function(){
      args = args.concat( Array.prototype.slice.call( arguments ) );
 
      var callback = function(){};
      if ( typeof args[ args.length -1 ] === 'function' ){
        callback = args.pop();
      }
 
      callback( null, this_.apply( context || this, args ) );
    };
  }
});