'use strict';
/* @flow */

/**
 * Try to get the source code associated to this comment by using the location params to
 * get the piece of code from the source code file
 *
 * @param {?string} source the full source code
 * @param {boolean} outputCode true to, in fact, infer the source code; false not to do
 * @returns {Function} inference method
 * @private
 */
function inferSourceCode(source /*: ?string*/, outputCode /*: Boolean*/) {
  // var re = pattern && new RegExp(pattern);

  /**
   * Infers the source code from the start and end lines in <code>comment.context.los</code>
   *
   * @name inferCode
   * @param {Object} comment parsed comment
   * @returns {Object} comment with associated source code block
   */
  return function inferCode(comment /*: Comment */) {
    if (outputCode === false) {
      return comment;
    }
    if (!source) {
      return comment;
    }

    const ini = comment.context.loc.start.line;
    const end = comment.context.loc.end.line;
    comment.context.blockSource = source
      .split('\n')
      .slice(ini - 1, end)
      .join('\n');
    comment.context.blockSource = comment.context.blockSource.replace(
      /\t/g,
      '    '
    ); // .replace(/    /g, '  ');
    // console.log("blockSource", comment.context.blockSource);
    return comment;
  };
}

module.exports = inferSourceCode;
