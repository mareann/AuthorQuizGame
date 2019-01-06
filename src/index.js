import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import * as Redux  from 'redux';
import * as ReactRedux from 'react-redux';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import * as serviceWorker from './serviceWorker';
import {shuffle,sample} from 'underscore';

const authors = [
	{
		name: 'Mark Twain',
		imageUrl: 'images/authors/marktwain.jpg',
		imageSource: 'Wikimedia Commons',
		books: ['The Adventures of Huckleberry Finn',
		        'Life on Missisippi',
		        'Roughing It']
	},
	{
		name: 'Joseph Conrad',
		imageUrl: 'images/authors/marktwain.jpg',
		imageSource: 'Wikimedia Commons',
		books: ['Heart of Darkness']		
	},
	{
		name: 'J.K. Rowling',
		imageUrl: 'images/authors/marktwain.jpg',
		imageSource: 'Wikimedia Commons',
		books: ['Harry Potter',
		        'Harry Potter returns']		
	}, 
	{
		name: 'Stephen King',
	    imageUrl: 'images/authors/marktwain.jpg',
		imageSource: 'Wikimedia Commons',
		books: ['The Shining',
		        'IT']
	},
	{
		name: 'Charles Dickens',
		imageUrl: 'images/authors/marktwain.jpg',
		imageSource: 'Wikimedia Commons',
		books: ['David Copperfield',
		        'A Tales of Two Cities']
	},
	{
		name: 'William Shakespeare',
		imageUrl: 'images/authors/shakespeare.jpg',
		imageSource: 'Wikimedia Commons',
		books: ['Hamlet',
		        'Macbeth',
		        'Romeo and Juliet']
	}

];

function reducer(state, action){
	return state;
}

let store = Redux.createStore(reducer);
let state = resetState();

function getTurnData(authors) {
   const allBooks = authors.reduce(function(p,c,i) {
     return p.concat(c.books);
    },[]);
   const fourRandomBooks = shuffle(allBooks).slice(0,4);
   const answer = sample(fourRandomBooks);

   return {
   	 books: fourRandomBooks,
   	 author: 
   	    authors.find(
   	 	   (author) => 
   	 	   author.books.some((title) => title === answer)
   	 	)
   }
}

function resetState()  {
  return {
	turnData: getTurnData(authors),
	highlight: ''
   };
}

function AddAuthorForm(match) {
	return <div>
	  <h1>Add Author</h1>
	  <p>{JSON.stringify(match)}</p>
	</div>;
}

function App() {
  return <AuthorQuiz {...state} onAnswerSelected={onAnswerSelected} />
}

function render() {   
    ReactDOM.render(
    	<BrowserRouter>
    	  <React.Fragment>
    	    <Route exact path="/" component={App} />
    	    <Route path="/add" component={AddAuthorForm} />
          </React.Fragment>
        </BrowserRouter>,
    	document.getElementById('root'));
}

function onAnswerSelected(answer) {
   const isCorrect = 
	   state.turnData.author.books.some((book) => book === answer);
  console.log("answer "+answer+" isCorrect "+isCorrect);
   state.highlight = isCorrect ? 'correct' : 'wrong';
  console.log("state.highlight "+state.highlight);
  render();
   //ReactDOM.render().bind(this); 
   //return(isCorrect);
}

render();
//ReactDOM.render(<AuthorQuiz {...state} onAnswerSelected={onAnswerSelected}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
