// Copyright 2014 Google Inc. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Left pad a string to a given length using a given character.
 *
 * @param {string} str The string to pad.
 * @param {number} length The desired length.
 * @param {string} opt_ch The optional padding character, defaults to ' '.
 * @return {string} The padded string.
 */
export var lpad = function(str, length, opt_ch) {
  str = String(str);
  opt_ch = opt_ch || ' ';

  while (str.length < length)
    str = opt_ch + str;

  return str;
};

/**
 * Left pad a number to a given length with leading zeros.
 *
 * @param {string|number} number The number to pad.
 * @param {number} length The desired length.
 * @return {string} The padded number as a string.
 */
export var zpad = function(number, length) {
  return lpad(number.toString(), length, '0');
};

/**
 * Return a string containing a given number of space characters.
 *
 * This method maintains a static cache of the largest amount of whitespace
 * ever requested.  It shouldn't be used to generate an insanely huge amount of
 * whitespace.
 *
 * @param {number} length The desired amount of whitespace.
 * @param {string} A string of spaces of the requested length.
 * //TODO(rginda): Not sure of a better way of doing this:
 * @this {*}
 */
export var getWhitespace = function(length) {
  if (length === 0)
    return '';

  var f = this.getWhitespace;
  if (!f.whitespace)
    f.whitespace = '          ';

  while (length > f.whitespace.length) {
    f.whitespace += f.whitespace;
  }

  return f.whitespace.substr(0, length);
};

/**
 * Unescape explicitly escaped characters in a string obtained from an external
 * source, e.g. typed in from the terminal by the user:
 * - replace \xDD ASCII sequnces with the matching ASCII characters.
 * - replace \uDDDD Unicode sequences with the matching Unicode characters.
 * - replace special codes such as \t and \n with the matching ASCII characters.
 *
 * @param {string} str The string to unescape.
 * @return {string} The unescaped string.
 */
export var unescape = function(str) {
  return str.replace(/\\x(\d\d)|\\u(\d\d\d\d)|\\(.)/g, function(
      match, ascii, unicode, escaped) {
    if (ascii) {
      return String.fromCharCode(ascii);
    } else if (unicode) {
      return String.fromCharCode(unicode);
    } else if (escaped) {
      switch (escaped) {
        case '0': return '\0';
        case 'n': return '\n';
        case 'r': return '\r';
        case 'v': return '\v';
        case 't': return '\t';
        case 'b': return '\b';
        case 'f': return '\f';
        default: return escaped;
      }
    }
  });
};
