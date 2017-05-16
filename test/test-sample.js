/** @namespace */
var Obj = {
  /** @lends Obj.prototype */

  /** Just a property test */
  testProp: 1,

  /**
   * Just a private property
   * @private
   */
  _privProp: 'private',

  /**
   * Just a private method!!!
   * @returns {number} pi number
   * @private
   */
  _privMeth: function() {
    return 3.141595;
  },

  /**
   * This is test one
   * @param {string} one param one
   * @returns {number} the número uno
   */
  testOne: function(one /*: string*/) {
    return 1;
  },

  /**
   * Just Two
   * @param {number} two param 2
   * @returns {number} another número
   */
  testTwo: function(two /*: number*/) {
    return two * 2;
  }
};

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
   */
  update(y = 12) {
    console.log('update');
  }
}

/**
  * @namespace
  * @property {object}  defaults               - The default values for parties.
  * @property {number}  defaults.players       - The default number of players.
  * @property {string}  defaults.level         - The default level for the party.
  * @property {object}  defaults.treasure      - The default treasure.
  * @property {number}  defaults.treasure.gold - How much gold the party starts with.
  */
/* @namespace */
var config = {
  /** @lends config */
  /**
   * Defaults for configuration
   * @type {object}
   */
  defaults: {
    /*
     * Default number of players
     * @type {number}
     */
    players: 1,
    /*
     * Default level
     * @type {string}
     */
    level: 'beginner',
    treasure: {
      gold: 0
    }
  },

  /**
   * Method configuration
   * @param {object} cfg configuration object
   * @returns {boolean} depending on true
   */
  configMeth: function(cfg) {
    return true;
  }
};

/**
 * Just an utility class or so...
 * @class
 */
var Util = Class.extend({
  /** @lends Util.prototype */
  /**
   * An utility util
   * @type {string}
   */
  utility: '',

  /**
   * Repeat <tt>str</tt> several times.
   * @param {string} str The string to repeat.
   * @param {number} [times=1] How many times to repeat the string.
   * @returns {string}
   */
  repeat: function(str, times) {
    if (times === undefined || times < 1) {
      times = 1;
    }
    return new Array(times + 1).join(str);
  }
});
