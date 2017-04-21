/**
 * This module is where NLP services are called.
 *
 * Most NLP tasks are computationally intensive, 
 * so it is better practice to have a dedicated cluster
 * just for supporting NLP tasks. And use another server/cluster
 * for serving resource and dispatching API calls to the NLP cluster.
 *
 * Stanford CoreNLP is implemented with Java, and it's shipped with a server
 * program. It's nice to access to the core by other languages, but that doesn't
 * seem too meaningful since those are just wrappers and many of them are outdated
 * and not maintained anymore.
 * 
 * Thus here I just run the Java server and make API calls to it by http requests.
 */

import request from 'request';
import { parseNlpResult } from './fsutils';

import { URL_NLP_SERVER } from '../constants/urls';

export default function removeStopWord(textBase) {
  // Return a Promise, for callers to handle.
  return new Promise(
    function(resolve, reject){
      /**
       * This call will tokenize the text.
       * Results are parsed later.
       */
      request({
          method: 'PUT',
          preambleCRLF: true,
          postambleCRLF: true,
          uri: URL_NLP_SERVER,
          body: textBase,
        },
        (error, response, body) => {
          if (error) {
            reject(error);
          } else {
            // Parse the returned tokens.
            let textList = parseNlpResult(body);
            resolve(textList);
          }
        }
      );
    }
  );
}






