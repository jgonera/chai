/*!
 * chai
 * Copyright(c) 2011-2012 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 *
 * Primarily a refactor of: should.js
 * https://github.com/visionmedia/should.js
 * Copyright(c) 2011 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * ### BDD Style Introduction
 *
 * The BDD style is exposed through `expect` or `should` interfaces. In both
 * scenarios, you chain together natural language assertions.
 *
 *      // expect
 *      var expect = require('chai').expect;
 *      expect(foo).to.equal('bar');
 *
 *      // should
 *      var should = require('chai').should();
 *      foo.should.equal('bar');
 *
 * #### Differences
 *
 * The `expect` interface provides a function as a starting point for chaining
 * your language assertions. It works on node.js and in all browsers.
 *
 * The `should` interface extends `Object.prototype` to provide a single getter as
 * the starting point for your language assertions. It works on node.js and in
 * all browsers except Internet Explorer.
 *
 * #### Configuration
 *
 * By default, Chai does not show stack traces upon an AssertionError. This can
 * be changed by modifying the `includeStack` parameter for chai.Assertion. For example:
 *
 *      var chai = require('chai');
 *      chai.Assertion.includeStack = true; // defaults to false
 */

/*!
 * Module dependencies.
 */

var AssertionError = require('./error')
  , toString = Object.prototype.toString
  , util = require('./utils')
  , flag = util.flag;

/*!
 * Module export.
 */

module.exports = Assertion;


/*!
 * # Assertion Constructor
 *
 * Creates object for chaining.
 *
 * @api private
 */

function Assertion (obj, msg, stack) {
  flag(this, 'ssfi', stack || arguments.callee);
  flag(this, 'object', obj);
  flag(this, 'message', msg);
}

/*!
  * ## Assertion.includeStack
  *
  * User configurable property, influences whether stack trace
  * is included in Assertion error message. Default of false
  * suppresses stack trace in the error message
  *
  *     Assertion.includeStack = true;  // enable stack on error
  *
  * @api public
  */

Assertion.includeStack = false;

/*!
 * # .assert(expression, message, negateMessage, expected, actual)
 *
 * Executes an expression and check expectations. Throws AssertionError for reporting if test doesn't pass.
 *
 * @name assert
 * @param {Philosophical} expression to be tested
 * @param {String} message to display if fails
 * @param {String} negatedMessage to display if negated expression fails
 * @param {Mixed} expected value (remember to check for negation)
 * @param {Mixed} actual (optional) will default to `this.obj`
 * @api private
 */

Assertion.prototype.assert = function (expr, msg, negateMsg, expected, _actual) {
  var msg = util.getMessage(this, arguments)
    , actual = util.getActual(this, arguments)
    , ok = util.test(this, arguments);

  if (!ok) {
    throw new AssertionError({
        message: msg
      , actual: actual
      , expected: expected
      , stackStartFunction: (Assertion.includeStack) ? this.assert : flag(this, 'ssfi')
    });
  }
};

/**
 * # to
 *
 * Language chain.
 *
 * @name to
 * @api public
 */

Object.defineProperty(Assertion.prototype, 'to',
  { get: function () {
      return this;
    }
  , configurable: true
});

/**
 * # be
 *
 * Language chain.
 *
 * @name be
 * @api public
 */

Object.defineProperty(Assertion.prototype, 'be',
  { get: function () {
      return this;
    }
  , configurable: true
});

/**
 * # been
 *
 * Language chain. Also tests `tense` to past for addon
 * modules that use the tense feature.
 *
 * @name been
 * @api public
 */

Object.defineProperty(Assertion.prototype, 'been',
  { get: function () {
      flag(this, 'tense', 'past');
      return this;
    }
  , configurable: true
});

/**
 * # .a(type)
 *
 * Assert typeof. Also can be used as a language chain.
 *
 *      expect('test').to.be.a('string');
 *      expect(foo).to.be.an.instanceof(Foo);
 *
 * @name a
 * @alias an
 * @param {String} type
 * @api public
 */

var an = function () {
  var assert = function(type) {
    var obj = flag(this, 'object')
      , klass = type.charAt(0).toUpperCase() + type.slice(1);

    this.assert(
        '[object ' + klass + ']' === toString.call(obj)
      , 'expected #{this} to be a ' + type
      , 'expected #{this} not to be a ' + type
      , '[object ' + klass + ']'
      , toString.call(obj)
    );

    return this;
  };

  assert.__proto__ = this;
  return assert;
};

Object.defineProperty(Assertion.prototype, 'an',
  { get: an
  , configurable: true
});

Object.defineProperty(Assertion.prototype, 'a',
  { get: an
  , configurable: true
});

/**
 * # .include(value)
 *
 * Assert the inclusion of an object in an Array or substring in string.
 * Also toggles the `contain` flag for the `keys` assertion if used as property.
 *
 *      expect([1,2,3]).to.include(2);
 *
 * @name include
 * @alias contain
 * @param {Object|String|Number} obj
 * @api public
 */
var include = function () {
  flag(this, 'contains', true);

  var assert = function(val) {
    var obj = flag(this, 'object')
    this.assert(
        ~obj.indexOf(val)
      , 'expected #{this} to include ' + util.inspect(val)
      , 'expected #{this} to not include ' + util.inspect(val));

    return this;
  };

  assert.__proto__ = this;
  return assert;
};

Object.defineProperty(Assertion.prototype, 'contain',
  { get: include
  , configurable: true
});

Object.defineProperty(Assertion.prototype, 'include',
  { get: include
  , configurable: true
});


/**
 * # is
 *
 * Language chain.
 *
 * @name is
 * @api public
 */

Object.defineProperty(Assertion.prototype, 'is',
  { get: function () {
      return this;
    }
  , configurable: true
});

/**
 * # and
 *
 * Language chain.
 *
 * @name and
 * @api public
 */

Object.defineProperty(Assertion.prototype, 'and',
  { get: function () {
      return this;
    }
  , configurable: true
});

/**
 * # have
 *
 * Language chain.
 *
 * @name have
 * @api public
 */

Object.defineProperty(Assertion.prototype, 'have',
  { get: function () {
      return this;
    }
  , configurable: true
});

/**
 * # with
 *
 * Language chain.
 *
 * @name with
 * @api public
 */

Object.defineProperty(Assertion.prototype, 'with',
  { get: function () {
      return this;
    }
  , configurable: true
});

/**
 * # .not
 *
 * Negates any of assertions following in the chain.
 *
 * @name not
 * @api public
 */

Object.defineProperty(Assertion.prototype, 'not',
  { get: function () {
      flag(this, 'negate', true);
      return this;
    }
  , configurable: true
});

/**
 * # .ok
 *
 * Assert object truthiness.
 *
 *      expect('everthing').to.be.ok;
 *      expect(false).to.not.be.ok;
 *      expect(undefined).to.not.be.ok;
 *      expect(null).to.not.be.ok;
 *
 * @name ok
 * @api public
 */

Object.defineProperty(Assertion.prototype, 'ok',
  { get: function () {
      this.assert(
          flag(this, 'object')
        , 'expected #{this} to be truthy'
        , 'expected #{this} to be falsy');

      return this;
    }
  , configurable: true
});

/**
 * # .true
 *
 * Assert object is true
 *
 * @name true
 * @api public
 */

Object.defineProperty(Assertion.prototype, 'true',
  { get: function () {
      this.assert(
          true === flag(this, 'object')
        , 'expected #{this} to be true'
        , 'expected #{this} to be false'
        , this.negate ? false : true
      );

      return this;
    }
  , configurable: true
});

/**
 * # .false
 *
 * Assert object is false
 *
 * @name false
 * @api public
 */

Object.defineProperty(Assertion.prototype, 'false',
  { get: function () {
      this.assert(
          false === flag(this, 'object')
        , 'expected #{this} to be false'
        , 'expected #{this} to be true'
        , this.negate ? true : false
      );

      return this;
    }
  , configurable: true
});

/**
 * # .exist
 *
 * Assert object exists (null).
 *
 *      var foo = 'hi'
 *        , bar;
 *      expect(foo).to.exist;
 *      expect(bar).to.not.exist;
 *
 * @name exist
 * @api public
 */

Object.defineProperty(Assertion.prototype, 'exist',
  { get: function () {
      this.assert(
          null != flag(this, 'object')
        , 'expected #{this} to exist'
        , 'expected #{this} to not exist'
      );

      return this;
    }
  , configurable: true
});

/**
 * # .empty
 *
 * Assert object's length to be 0.
 *
 *      expect([]).to.be.empty;
 *
 * @name empty
 * @api public
 */

Object.defineProperty(Assertion.prototype, 'empty',
  { get: function () {
      var obj = flag(this, 'object')
        , expected = obj;

      if (Array.isArray(obj)) {
        expected = obj.length;
      } else if (typeof obj === 'object') {
        expected = Object.keys(obj).length;
      }

      this.assert(
          !expected
        , 'expected #{this} to be empty'
        , 'expected #{this} not to be empty');

      return this;
    }
  , configurable: true
});

/**
 * # .arguments
 *
 * Assert object is an instanceof arguments.
 *
 *      function test () {
 *        expect(arguments).to.be.arguments;
 *      }
 *
 * @name arguments
 * @api public
 */

Object.defineProperty(Assertion.prototype, 'arguments',
  { get: function () {
      var obj = flag(this, 'object');
      this.assert(
          '[object Arguments]' == Object.prototype.toString.call(obj)
        , 'expected #{this} to be arguments'
        , 'expected #{this} to not be arguments'
        , '[object Arguments]'
        , Object.prototype.toString.call(obj)
      );

      return this;
    }
  , configurable: true
});

/**
 * # .equal(value)
 *
 * Assert strict equality.
 *
 *      expect('hello').to.equal('hello');
 *
 * @name equal
 * @param {*} value
 * @api public
 */

Assertion.prototype.equal = function (val) {
  this.assert(
      val === flag(this, 'object')
    , 'expected #{this} to equal #{exp}'
    , 'expected #{this} to not equal #{exp}'
    , val );

  return this;
};

/**
 * # .eql(value)
 *
 * Assert deep equality.
 *
 *      expect({ foo: 'bar' }).to.eql({ foo: 'bar' });
 *
 * @name eql
 * @param {*} value
 * @api public
 */

Assertion.prototype.eql = function (obj) {
  this.assert(
      util.eql(obj, flag(this, 'object'))
    , 'expected #{this} to equal #{exp}'
    , 'expected #{this} to not equal #{exp}'
    , obj );

  return this;
};

/**
 * # .above(value)
 *
 * Assert greater than `value`.
 *
 *      expect(10).to.be.above(5);
 *
 * @name above
 * @alias mt
 * @param {Number} value
 * @api public
 */

Assertion.prototype.above = function (val) {
  this.assert(
      flag(this, 'object') > val
    , 'expected #{this} to be above ' + val
    , 'expected #{this} to be below ' + val);

  return this;
};

/**
 * # .below(value)
 *
 * Assert less than `value`.
 *
 *      expect(5).to.be.below(10);
 *
 * @name below
 * @alias lt
 * @param {Number} value
 * @api public
 */

Assertion.prototype.below = function (val) {
  this.assert(
      flag(this, 'object') < val
    , 'expected #{this} to be below ' + val
    , 'expected #{this} to be above ' + val);

  return this;
};

/**
 * # .within(start, finish)
 *
 * Assert that a number is within a range.
 *
 *      expect(7).to.be.within(5,10);
 *
 * @name within
 * @param {Number} start lowerbound inclusive
 * @param {Number} finish upperbound inclusive
 * @api public
 */

Assertion.prototype.within = function (start, finish) {
  var obj = flag(this, 'object')
    , range = start + '..' + finish;

  this.assert(
      obj >= start && obj <= finish
    , 'expected #{this} to be within ' + range
    , 'expected #{this} to not be within ' + range);

  return this;
};

/**
 * # .instanceof(constructor)
 *
 * Assert instanceof.
 *
 *      var Tea = function (name) { this.name = name; }
 *        , Chai = new Tea('chai');
 *
 *      expect(Chai).to.be.an.instanceof(Tea);
 *
 * @name instanceof
 * @param {Constructor}
 * @alias instanceOf
 * @api public
 */

Assertion.prototype.instanceOf = function (constructor) {
  var name = util.getName(constructor);
  this.assert(
      flag(this, 'object') instanceof constructor
    , 'expected #{this} to be an instance of ' + name
    , 'expected #{this} to not be an instance of ' + name);

  return this;
};

/**
 * # .property(name, [value])
 *
 * Assert that property of `name` exists, optionally with `value`.
 *
 *      var obj = { foo: 'bar' }
 *      expect(obj).to.have.property('foo');
 *      expect(obj).to.have.property('foo', 'bar');
 *      expect(obj).to.have.property('foo').to.be.a('string');
 *
 * @name property
 * @param {String} name
 * @param {*} value (optional)
 * @returns value of property for chaining
 * @api public
 */

Assertion.prototype.property = function (name, val) {
  var obj = flag(this, 'object')
    , value = util.getPathValue(name, obj)
    , negate = flag(this, 'negate');

  if (negate && undefined !== val) {
    if (undefined === value) {
      throw new Error(util.inspect(obj) + ' has no property ' + util.inspect(name));
    }
  } else {
    this.assert(
        undefined !== value
      , 'expected #{this} to have a property ' + util.inspect(name)
      , 'expected #{this} to not have property ' + util.inspect(name));
  }

  if (undefined !== val) {
    this.assert(
        val === value
      , 'expected #{this} to have a property ' + util.inspect(name) + ' of #{exp}, but got #{act}'
      , 'expected #{this} to not have a property ' + util.inspect(name) + ' of #{act}'
      , val
      , value
    );
  }

  flag(this, 'object', value);
  return this;
};

/**
 * # .ownProperty(name)
 *
 * Assert that has own property by `name`.
 *
 *      expect('test').to.have.ownProperty('length');
 *
 * @name ownProperty
 * @alias haveOwnProperty
 * @param {String} name
 * @api public
 */

Assertion.prototype.ownProperty = function (name) {
  var obj = flag(this, 'object');
  this.assert(
      obj.hasOwnProperty(name)
    , 'expected #{this} to have own property ' + util.inspect(name)
    , 'expected #{this} to not have own property ' + util.inspect(name));
  return this;
};

/**
 * # .length(val)
 *
 * Assert that object has expected length.
 *
 *      expect([1,2,3]).to.have.length(3);
 *      expect('foobar').to.have.length(6);
 *
 * @name length
 * @alias lengthOf
 * @param {Number} length
 * @api public
 */

Assertion.prototype.length = function (n) {
  var obj = flag(this, 'object');
  new Assertion(obj).to.have.property('length');
  var len = obj.length;

  this.assert(
      len == n
    , 'expected #{this} to have a length of #{exp} but got #{act}'
    , 'expected #{this} to not have a length of #{act}'
    , n
    , len
  );

  return this;
};

/**
 * # .match(regexp)
 *
 * Assert that matches regular expression.
 *
 *      expect('foobar').to.match(/^foo/);
 *
 * @name match
 * @param {RegExp} RegularExpression
 * @api public
 */

Assertion.prototype.match = function (re) {
  var obj = flag(this, 'object');
  this.assert(
      re.exec(obj)
    , 'expected #{this} to match ' + re
    , 'expected #{this} not to match ' + re);

  return this;
};


/**
 * # .string(string)
 *
 * Assert inclusion of string in string.
 *
 *      expect('foobar').to.have.string('bar');
 *
 * @name string
 * @param {String} string
 * @api public
 */

Assertion.prototype.string = function (str) {
  var obj = flag(this, 'object');
  new Assertion(obj).is.a('string');

  this.assert(
      ~obj.indexOf(str)
    , 'expected #{this} to contain ' + util.inspect(str)
    , 'expected #{this} to not contain ' + util.inspect(str));

  return this;
};

/**
 * # .keys(key1, [key2], [...])
 *
 * Assert exact keys or the inclusing of keys using the `contain` modifier.
 *
 *      expect({ foo: 1, bar: 2 }).to.have.keys(['foo', 'bar']);
 *      expect({ foo: 1, bar: 2, baz: 3 }).to.contain.keys('foo', 'bar');
 *
 * @name keys
 * @alias key
 * @param {String|Array} Keys
 * @api public
 */

Assertion.prototype.keys = function(keys) {
  var obj = flag(this, 'object')
    , str
    , ok = true;

  keys = keys instanceof Array
    ? keys
    : Array.prototype.slice.call(arguments);

  if (!keys.length) throw new Error('keys required');

  var actual = Object.keys(obj)
    , len = keys.length;

  // Inclusion
  ok = keys.every(function(key){
    return ~actual.indexOf(key);
  });

  // Strict
  if (!flag(this, 'negate') && !flag(this, 'contains')) {
    ok = ok && keys.length == actual.length;
  }

  // Key string
  if (len > 1) {
    keys = keys.map(function(key){
      return util.inspect(key);
    });
    var last = keys.pop();
    str = keys.join(', ') + ', and ' + last;
  } else {
    str = util.inspect(keys[0]);
  }

  // Form
  str = (len > 1 ? 'keys ' : 'key ') + str;

  // Have / include
  str = (flag(this, 'contains') ? 'contain ' : 'have ') + str;

  // Assertion
  this.assert(
      ok
    , 'expected #{this} to ' + str
    , 'expected #{this} to not ' + str
    , keys
    , Object.keys(obj)
  );

  return this;
}

/**
 * # .throw(constructor)
 *
 * Assert that a function will throw a specific type of error, or specific type of error
 * (as determined using `instanceof`), optionally with a RegExp or string inclusion test
 * for the error's message.
 *
 *      var err = new ReferenceError('This is a bad function.');
 *      var fn = function () { throw err; }
 *      expect(fn).to.throw(ReferenceError);
 *      expect(fn).to.throw(Error);
 *      expect(fn).to.throw(/bad function/);
 *      expect(fn).to.not.throw('good function');
 *      expect(fn).to.throw(ReferenceError, /bad function/);
 *      expect(fn).to.throw(err);
 *      expect(fn).to.not.throw(new RangeError('Out of range.'));
 *
 * Please note that when a throw expectation is negated, it will check each
 * parameter independently, starting with error constructor type. The appropriate way
 * to check for the existence of a type of error but for a message that does not match
 * is to use `and`.
 *
 *      expect(fn).to.throw(ReferenceError).and.not.throw(/good function/);
 *
 * @name throw
 * @alias throws
 * @alias Throw
 * @param {ErrorConstructor} constructor
 * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
 * @api public
 */

Assertion.prototype.Throw = function (constructor, msg) {
  var obj = flag(this, 'object');
  new Assertion(obj).is.a('function');

  var thrown = false
    , desiredError = null
    , name = null;

  if (arguments.length === 0) {
    msg = null;
    constructor = null;
  } else if (constructor && (constructor instanceof RegExp || 'string' === typeof constructor)) {
    msg = constructor;
    constructor = null;
  } else if (constructor && constructor instanceof Error) {
    desiredError = constructor;
    constructor = null;
    msg = null;
  } else if (typeof constructor === 'function') {
    name = (new constructor()).name;
  } else {
    constructor = null;
  }

  try {
    obj();
  } catch (err) {
    // first, check desired error
    if (desiredError) {
      this.assert(
          err === desiredError
        , 'expected #{this} to throw ' + util.inspect(desiredError) + ' but ' + util.inspect(err) + ' was thrown'
        , 'expected #{this} to not throw ' + util.inspect(desiredError)
      );
      return this;
    }
    // next, check constructor
    if (constructor) {
      this.assert(
          err instanceof constructor
        , 'expected #{this} to throw ' + name + ' but a ' + err.name + ' was thrown'
        , 'expected #{this} to not throw ' + name );
      if (!msg) return this;
    }
    // next, check message
    if (err.message && msg && msg instanceof RegExp) {
      this.assert(
          msg.exec(err.message)
        , 'expected #{this} to throw error matching ' + msg + ' but got ' + util.inspect(err.message)
        , 'expected #{this} to throw error not matching ' + msg
      );
      return this;
    } else if (err.message && msg && 'string' === typeof msg) {
      this.assert(
          ~err.message.indexOf(msg)
        , 'expected #{this} to throw error including #{exp} but got #{act}'
        , 'expected #{this} to throw error not including #{act}'
        , msg
        , err.message
      );
      return this;
    } else {
      thrown = true;
    }
  }

  var expectedThrown = name ? name : desiredError ? util.inspect(desiredError) : 'an error';

  this.assert(
      thrown === true
    , 'expected #{this} to throw ' + expectedThrown
    , 'expected #{this} to not throw ' + expectedThrown);

  return this;
};

/**
 * # .respondTo(method)
 *
 * Assert that object/class will respond to a method.
 *
 *      expect(Klass).to.respondTo('bar');
 *      expect(obj).to.respondTo('bar');
 *
 * @name respondTo
 * @param {String} method
 * @api public
 */

Assertion.prototype.respondTo = function (method) {
  var obj = flag(this, 'object')
    , context = ('function' === typeof obj)
      ? obj.prototype[method]
      : obj[method];

  this.assert(
      'function' === typeof context
    , 'expected #{this} to respond to ' + util.inspect(method)
    , 'expected #{this} to not respond to ' + util.inspect(method)
    , 'function'
    , typeof context
  );

  return this;
};

/**
 * # .satisfy(method)
 *
 * Assert that passes a truth test.
 *
 *      expect(1).to.satisfy(function(num) { return num > 0; });
 *
 * @name satisfy
 * @param {Function} matcher
 * @api public
 */

Assertion.prototype.satisfy = function (matcher) {
  var obj = flag(this, 'object');
  this.assert(
      matcher(obj)
    , 'expected #{this} to satisfy ' + util.inspect(matcher)
    , 'expected #{this} to not satisfy' + util.inspect(matcher)
    , this.negate ? false : true
    , matcher(obj)
  );

  return this;
};

/**
 * # .closeTo(expected, delta)
 *
 * Assert that actual is equal to +/- delta.
 *
 *      expect(1.5).to.be.closeTo(1, 0.5);
 *
 * @name closeTo
 * @param {Number} expected
 * @param {Number} delta
 * @api public
 */

Assertion.prototype.closeTo = function (expected, delta) {
  var obj = flag(this, 'object');
  this.assert(
      (obj - delta === expected) || (obj + delta === expected)
    , 'expected #{this} to be close to ' + expected + ' +/- ' + delta
    , 'expected #{this} not to be close to ' + expected + ' +/- ' + delta);

  return this;
};

/*!
 * Aliases.
 */

(function alias(name, as){
  Assertion.prototype[as] = Assertion.prototype[name];
  return alias;
})
('equal', 'eq')
('above', 'mt')
('below', 'lt')
('length', 'lengthOf')
('keys', 'key')
('ownProperty', 'haveOwnProperty')
('above', 'greaterThan')
('below', 'lessThan')
('Throw', 'throws')
('Throw', 'throw')
('instanceOf', 'instanceof');
