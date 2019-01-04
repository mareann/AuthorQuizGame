import React, { Component } from 'react';
//import logo from './logo.svg';
import PropTypes from 'prop-types';
import './AuthorQuiz.css';
import './bootstrap.min.css';

function Hero() {
  return(
     <div className="row">
       <div className="jumbotron col-10 offset-1">
         <h1>Author Quiz</h1>
         <p>Select the book written by the author shown!</p>
       </div>
     </div>
    );
}

function handleClick(title)  {

  console.log("click ");
}

function Book({title, onClick}) {
  return (             
    <div className="answer" onClick={() => {onClick(title);}}>
      <h4>{title}</h4>
    </div>
  );
}

function Turn({author,books, highlight, onAnswerSelected}) {

  function highlightToBgColor(highlight) {
    const mapping = {
      'none': '',
      'correct': 'green',
      'wrong': 'red'
    };
    return mapping[highlight];
  }
  return (
    <div className="row turn" style={{backgroundColor: highlightToBgColor(highlight)}}>
      <div className="col-4 offset-1">
        {author.name}
        <img src={author.imageUrl} className="authorimage" alt="Author"/>
      </div>
      <div className="col-6">
       {books.map((title) => <Book title={title} key={title} onClick={onAnswerSelected}/>)}
      </div>
    </div>);
}

Turn.propTypes = {
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    imageSource: PropTypes.string.isRequired,
    books: PropTypes.arrayOf(PropTypes.string).isRequired
  }),
  books: PropTypes.arrayOf(PropTypes.string).isRequired,
  onAnswerSelected:  PropTypes.func, // PropTypes.func.isRequired,
  highlight: PropTypes.string.isRequired
};

function Continue() {
  return (<div/>);
}

function Footer() {
  return (
    <div id="footer" className="row">
      <div className="col-12">
        <p className="text-muted credit">
         All images are from <a href="http://commons.wikimedia.org/wiki" >wikimedia commons</a>
         and are in the public domain
        </p>
      </div>
    </div>
    )
}


function AuthorQuiz({turnData, highlight, onAnswerSelected})  {
  console.log("AuthorQuiz highlight "+highlight);
    return (
     <div className="container-fluid">
        <Hero />
        <Turn {...turnData} highlight={highlight} onAnswerSelected={onAnswerSelected} />
        <Continue />
        <Footer />
     </div>
    );
  
}

export default AuthorQuiz;