'use strict';

var test = require('tap').test,
  parse = require('../../../lib/parsers/javascript'),
  inferName = require('../../../lib/infer/name'),
  inferSource = require('../../../lib/infer/sourcecode');


/**
 *
 * @param fn
 * @returns {Object}
 */
function toComment(fn) {
  var extractedComms = parse({
    source: '(' + fn.toString() + ')'
  }, {});
  // return extractedComms[0];
  return extractedComms[extractedComms.length-1];
}


/**
 * Calls the inference function to simulate their behaviour
 * @param {Function} fn a commented piece of code
 * @param {RegExp} fullSource the source code
 * @param {boolean} outputSrc true or false to retrieve the source. Default: true
 * @returns {*} the scope qualifier, one of private, public
 */
function evaluate(fn, fullSource, outputSrc) {
  // return inferAccess(re)(inferName(toComment(fn)));
  outputSrc = outputSrc || true;
  var comment = toComment(fn);
  var commentSrc = inferSource(fullSource, outputSrc)(comment);
  return commentSrc;
}


// TEST ///////////////////////////////////////////////////////////////////////////&
test('infer source code for functions/methods', function (t) {

  // Top level function
  var fnTest = function () {
    /** Test */
    function _name() {
      return true;
    }
  };
  var fnTestStr = fnTest.toString();
  var resEvaluate = evaluate(fnTest, fnTestStr);
  t.match(resEvaluate.context.blockSource, /_name\(\)\s+\{\s+return\s+\w*;\s+\}/);

  // Object member
  fnTest = function () {
    var obj = {};
    /**
     * Just nothing
     * @param {string} aParam
     * @returns {string}
     */
    obj.testFn = function (aParam/* :string*/) {
      return 'Test '+aParam;
    };
  };
  resEvaluate = evaluate(fnTest, fnTest.toString());
  t.match(resEvaluate.context.blockSource, /obj\.testFn\s+=\s+function\s*\(.*\)/);

  // Object literal, ES5 classic notation
  fnTest = function () {
    var obj = {
      /** @lends obj.prototype */

      /**
       * Just nothing
       * @param {string} aParam
       * @returns {string}
       */
      testFn: function (aParam/* :string*/) {
        return 'Test ' + aParam;
      }
    };
    return obj;
  };
  resEvaluate = evaluate(fnTest, fnTest.toString());
  t.match(resEvaluate.context.blockSource, /testFn:\s*function\s*\(.*\)\s*\{/);


  // Object literal, ES6 shorthand notation
  fnTest = function () {
    var obj = {
      /** @lends obj.prototype */

      /**
       * Just nothing
       * @param {string} aParam
       * @returns {string}
       */
      testFn(aParam/* :string*/) {
        return 'Test ' + aParam;
      }
    };
    return obj;
  };
  resEvaluate = evaluate(fnTest, fnTest.toString());
  // t.match(resEvaluate.context.blockSource, /testFn:\s*function\s*\(.*\)\s*\{/);
  t.match(resEvaluate.context.blockSource, /testFn\s*\(.*\)\s*\{/);

  // ES6 classes
  var classTest = function () {
    /** @class Mesh */
    class Mesh {
      /**
       * Class constructor
       * @param {*} geometry just that, a geometry jizzz
       * @constructor
       */
      constructor(geometry) {
        this.geometry = geometry;
      }

      /**
       * An update method...
       * @param {number} y updates the geometry
       * @returns {string}
       */
      update(y = 12) {
        return 'update';
      }
    }
  };
  resEvaluate = evaluate(classTest, classTest.toString());
  t.match(resEvaluate.context.blockSource, /update\s*\(.*\)\s*\{[.\s]+/);

  t.end();
});
