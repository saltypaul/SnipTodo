
const URL_DB = 'mongodb://localhost:27017/acedb';

const URL_SOURCE_SERVER = 'http://localhost:8080';

const URL_TODOLIST = URL_SOURCE_SERVER + '/todolist';

const URL_SNIP_TODO = URL_SOURCE_SERVER + '/swr';

const NLP_PROPS = {
  'annotators': 'tokenize,ssplit', 
  'outputFormat': 'json'
};

const URL_NLP_SERVER = 'http://localhost:9000/?properties=' + JSON.stringify(NLP_PROPS);

export {

  URL_DB,
  URL_SOURCE_SERVER,
  URL_TODOLIST,
  URL_SNIP_TODO,

  URL_NLP_SERVER,

};

