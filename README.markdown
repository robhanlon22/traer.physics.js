traer.physics.js
================

traer.physics.js is a JavaScript port of [Traer Physics][0], a Java
library originally written for use with [Processing][1]. Similarly, the
main purpose of traer.physics.js is to be used with [Processing.js][2],
although I'm sure you could find a creative use of it to some other end.


Building
--------

Simple, just run build.rb:
  
    $ ruby build.rb

Or, if you'd like a minified version, minified by [Closure Compiler][3]:

    $ ruby build.rb --minify

That's it! You've now got a JavaScript version of Traer Physics that you
can use for your own nefarious purposes.

Author
------
Rob Hanlon, aka @ohwillie. All original credit is due to Jeff Traer.

[0]: http://www.cs.princeton.edu/~traer/physics/
[1]: http://processing.org/
[2]: http://processingjs.org/
[3]: http://closure-compiler.appspot.com/home
