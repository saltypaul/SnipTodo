import fs from 'fs';

const regHasChar = /[a-zA-Z0-9]/;
var StopWordSet;

fs.readFile(__dirname+'/stopwords', 'utf8', 
    (err, data) => {
      if (err) { throw err; }
      let StopWordArray = data.split('\n').map( str => str.trim() );
      StopWordSet = new Set(StopWordArray);
    }
);

const stopWordFilter = (token) => {
  // {word, index,...}
  // ignore case
  return ! StopWordSet.has(
    token.word.toLowerCase()
  );
};

const concatWordList = (word_list) => {
  //concat a word list to a sentence
  let sentence = new Array();
  for(let idx=0; idx<word_list.length; idx++) {
    let word = word_list[ idx ];
    if (idx ==0) {  // first word of a sentence
      //set first letter to uppercase
      sentence.push( word.substring(0, 1).toUpperCase() ); 
      sentence.push(word.substring(1));
    } else {
      // if contain char/digit, it's a word, need a space before
      if (word.match(regHasChar)) {
        sentence.push(' ');
      }
      sentence.push( word );
    }
  }
  return sentence.join('');  //join with '' to make a sentence.
};

const parseNlpResult = (body) => {
  // deal with white-spaces latter
  //body: { sentences: [ tokens:[ word ]   ]}
  let sent_list = JSON.parse(body).sentences;  // a list of sentences
  let filtered_sent_list = new Array(); // sentences after filtering
  for(let idx=0; idx<sent_list.length; idx++) {
    let token_list = sent_list[ idx ];
    let filtered_token_list = token_list.tokens.filter(stopWordFilter);
    let filtered_word_list = filtered_token_list.map( token => token.word );
    filtered_sent_list.push( concatWordList( filtered_word_list ) );
  }
  return filtered_sent_list.filter( sentence => sentence.match(regHasChar));
};

export { parseNlpResult };





