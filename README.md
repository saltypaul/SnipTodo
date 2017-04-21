# SnipTodo
## Intro
SnipTodo is a simple Todo List App just for learning.  

The database used is MongoDB, along with mongoose.  
Server: Express  
NLP API service: Stanford CoreNLP  
DB visualization: MongoDB Compass  
API testing: Postman  
Grammar checking: eslint  
body-parser for requst parsing  
React for building user interface  
Immutable for state  
React-Router for routing  
React-Bootstrap for better front-end components  
React-Router-Bootstrap, a combination of React-Router and React-Bootstrap  
Redux, React-Redux as state container  
Redux-Immutable to create an equivalent function of Redux combineReducers that works with Immutable.js state.  
Redux-Saga to handle async operations  
ngrok for NAT

## How to Deploy Locally
### [1. Install Node.js](https://nodejs.org/en/)
### [2. Install MongoDB](https://www.mongodb.com/download-center#community)
#### [2.1 Install mongoose](https://github.com/Automattic/mongoose)
#### 2.2 Maybe you'd like a DB visualizing tool like [MongoDB Compass](https://www.mongodb.com/products/compass)
To run MongoDB, go to its folder and further into the bin folder, run this commend:  
`mongod`  

### 3. Deploy Stanford CoreNLP
Go to the [site](http://stanfordnlp.github.io/CoreNLP/index.html#download) and download the latest package and unzip it.  

This module is where NLP services are called. Most NLP tasks are computationally intensive, so it is better practice to have a dedicated cluster just for supporting NLP tasks. And use another server/cluster for serving resource and dispatching API calls to the NLP cluster. Stanford CoreNLP is implemented with Java, and it's shipped with a server program. It's nice to access to the core by other languages, but that doesn't seem too meaningful since those are just wrappers and many of them are outdated and not maintained anymore. Thus here I just run the Java server and make API calls to it by http requests.  

Stopwords removing is to some degree a domain specific task. Aside from the tokenizing scheme, the word set used is essential. That is, different word set may yield different results. Here I use a common English stopword set found online, which contains 891 words, which is quite thorough, maybe a little too thorough. See the file utils/nlp/stopwords for details.


To start the CoreNLP server, first, make sure you have [JRE](http://www.oracle.com/technetwork/indexes/downloads/index.html#java) configured correctly. Then, go to the folder of CoreNLP and run:  
`java -mx4g -cp "*" edu.stanford.nlp.pipeline.StanfordCoreNLPServer -port 9000 -timeout 15000`  
To check whether it's working, open a browser and go to http://localhost:9000/

### 4. Install SnipTodo
Just download this repo. Inside its folder run the command `yarn build` to build. Next, check your CoreNLP server and mongod, make sure they are runing. Then, run `yarn api` to start the server for SnipTodo. Open up your browser and go to http://localhost:8080 and you are good to go, hopefully. I've run some tests locally, it works. If this doesn't work for you, maybe the easier way is that we use TeamViewer to go through the project together.    
