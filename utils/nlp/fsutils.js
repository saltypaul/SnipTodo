/**
 * This module defines the logics of filtering stopwords, recombining tokens, etc.
 * 
 */

import fs from 'fs';

// The regExp checking for whether a string contains a character or digit.
const regHasChar = /[a-zA-Z0-9]/;

/**
 * The stopword set used for filtering.
 * Stopwords removing is to some degree a domain specific task.
 * And the word set used is essential. Here I use a common English stopword set 
 * found online, which contains 891 words. See the file ./stopwords for details.
 */
var StopWordSet;

// Read file and set StopWordSet.
fs.readFile(__dirname+'/stopwords', 'utf8', 
  (err, data) => {
    if (err) { throw err; }
    let StopWordArray = data.split('\n').map( str => str.trim() );
    StopWordSet = new Set(StopWordArray);
  }
);

/**
 * The filter function.
 * @param  {string} token  The word to check.
 * @return {boolean}       Whether to keep the word.
 */
const stopWordFilter = (token) => {
  // ignore case
  return ! StopWordSet.has(
    token.word.toLowerCase()
  );
};

/**
 * Concat a filtered word list back to a sentence.
 * @param  {Array} wordList list of wword.
 * @return {string}           the generated sentence.
 */
const concatWordList = (wordList) => {
  /**
   * To reduce string concat, use a buffer array to store all parts.
   * They will be combined into one string in the end.
   */
  let sentence = new Array();
  // check word by word
  for(let idx=0; idx<wordList.length; idx++) {
    let word = wordList[ idx ];
    if (idx ==0) {  
      // The first word of a sentence, set the first letter to uppercase.
      sentence.push( word.substring(0, 1).toUpperCase() );
      sentence.push(word.substring(1));
    } else {
      // If contains char or digit, it's a word, need a space before it.
      if (word.match(regHasChar)) {
        sentence.push(' ');
      }
      sentence.push( word );
    }
  }
  //Join all parts with '' to make whole string.
  return sentence.join('');  
};

/**
 * Entrance of parsing nlp results.
 * @param  {object} body returned data by nlp server.
 * @return {Array}      A list of sentences.
 */
const parseNlpResult = (body) => {
  /**
   * body format: 
   * { sentences: [ sent1, sent2 ], ... }
   * sentence: { index, tokens }
   * tokens: [ word1, word2, ... ]
   * word: { index, text, ... }
   */
  
  // A list of sentences.
  let sentList = JSON.parse(body).sentences;
  // The sentence list after filtering.
  let sentListFiltered = new Array();

  for(let idx=0; idx<sentList.length; idx++) {
    let tokenList = sentList[ idx ];
    // Filter out tokens that correspond to some stopwords
    let tokenListFiltered = tokenList.tokens.filter( stopWordFilter );
    // Map tokens to words, extract the word field of a token.
    let wordListFiltered = tokenListFiltered.map( token => token.word );
    // Concat a list of words to a sentence and push it to the sentence list.
    sentListFiltered.push( concatWordList( wordListFiltered ) );
  }
  // Filter out sentences without any character or digit.
  return sentListFiltered.filter( sentence => sentence.match(regHasChar));
};

export { parseNlpResult };





