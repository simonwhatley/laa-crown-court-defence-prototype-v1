// https://www.npmjs.com/package/nunjucks-numeral-filter
let numeralFilter = require('nunjucks-numeral-filter');
// https://www.npmjs.com/package/nunjucks-date-filter
let dateFilter = require('nunjucks-date-filter');

module.exports = function (env) {
  /**
   * Instantiate object used to store the methods registered as a
   * 'filter' (of the same name) within nunjucks. You can override
   * gov.uk core filters by creating filter methods of the same name.
   * @type {Object}
   */
  let filters = {}

  filters.numeral = numeralFilter;
  filters.date = dateFilter;

  /* ------------------------------------------------------------------
    add your methods to the filters obj below this comment block:
    @example:

    filters.sayHi = function(name) {
        return 'Hi ' + name + '!'
    }

    Which in your templates would be used as:

    {{ 'Paul' | sayHi }} => 'Hi Paul'

    Notice the first argument of your filters method is whatever
    gets 'piped' via '|' to the filter.

    Filters can take additional arguments, for example:

    filters.sayHi = function(name,tone) {
      return (tone == 'formal' ? 'Greetings' : 'Hi') + ' ' + name + '!'
    }

    Which would be used like this:

    {{ 'Joel' | sayHi('formal') }} => 'Greetings Joel!'
    {{ 'Gemma' | sayHi }} => 'Hi Gemma!'

    For more on filters and how to write them see the Nunjucks
    documentation.

  ------------------------------------------------------------------ */

  function parseTravelType(type) {

  }

  filters.travelType = parseTravelType;

  function parseTravelReason(reason) {

  }

  filters.travelReason = parseTravelReason;

  /**
   * Convert an integer to its words representation
   *
   * @author McShaman (http://stackoverflow.com/users/788657/mcshaman)
   * @source http://stackoverflow.com/questions/14766951/convert-digits-into-words-with-javascript
   * @source https://ourcodeworld.com/articles/read/353/how-to-convert-numbers-to-words-number-spelling-in-javascript
   */
  function numberLiteralFilter(n, custom_join_character) {

      let string = n.toString(),
          units, tens, scales, start, end, chunks, chunksLen, chunk, ints, i, word, words;

      let and = custom_join_character || 'and';

      /* Is number zero? */
      if (parseInt(string) === 0) {
          return 'zero';
      }

      /* Array of units as words */
      units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];

      /* Array of tens as words */
      tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

      /* Array of scales as words */
      scales = ['', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion', 'decillion', 'undecillion', 'duodecillion', 'tredecillion', 'quatttuor-decillion', 'quindecillion', 'sexdecillion', 'septen-decillion', 'octodecillion', 'novemdecillion', 'vigintillion', 'centillion'];

      /* Split user arguemnt into 3 digit chunks from right to left */
      start = string.length;
      chunks = [];
      while (start > 0) {
          end = start;
          chunks.push(string.slice((start = Math.max(0, start - 3)), end));
      }

      /* Check if function has enough scale words to be able to stringify the user argument */
      chunksLen = chunks.length;
      if (chunksLen > scales.length) {
          return '';
      }

      /* Stringify each integer in each chunk */
      words = [];
      for (i = 0; i < chunksLen; i++) {

          chunk = parseInt(chunks[i]);

          if (chunk) {

              /* Split chunk into array of individual integers */
              ints = chunks[i].split('').reverse().map(parseFloat);

              /* If tens integer is 1, i.e. 10, then add 10 to units integer */
              if (ints[1] === 1) {
                  ints[0] += 10;
              }

              /* Add scale word if chunk is not zero and array item exists */
              if ((word = scales[i])) {
                  words.push(word);
              }

              /* Add unit word if array item exists */
              if ((word = units[ints[0]])) {
                  words.push(word);
              }

              /* Add tens word if array item exists */
              if ((word = tens[ints[1]])) {
                  words.push(word);
              }

              /* Add hundreds word if array item exists */
              if ((word = units[ints[2]])) {
                  words.push(word + ' hundred');
              }

              /* Add 'and' string after units or tens integer if: */
              if (ints[0] || ints[1]) {

                  /* Chunk has a hundreds integer or chunk is the first of multiple chunks */
                  // if (ints[2] || !i && chunksLen) {
                  //     words.push(and);
                  // }

              }

          }

      }

      // return words.reverse().join(' ');
      return words.reverse().join(' ');

  }

  filters.numberLiteral = numberLiteralFilter;

  /* ------------------------------------------------------------------
    keep the following line to return your filters to the app
  ------------------------------------------------------------------ */
  return filters;
}
