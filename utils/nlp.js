import request from 'request';
import { parseNlpResult } from './fsutils';

const properties = {
  'annotators': 'tokenize,ssplit', 
  'outputFormat': 'json'
};

const url = 'http://localhost:9000/?properties=' + JSON.stringify(properties);

export default function removeStopWord(text_base) {
  // return a promise for caller to handle
  return new Promise(
    function(resolve, reject){

      //coreNLP.process(text_base, (err, result) => {
      //for test
      request({
          method: 'PUT',
          preambleCRLF: true,
          postambleCRLF: true,
          uri: url,
          body: text_base,
        },
        (error, response, body) => {
          if (error) {
            reject(error);
          } else {
            let text_list = parseNlpResult(body);
            resolve(text_list);
          }
        }
      );
    }
  );
}






