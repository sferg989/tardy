/** @jsx React.DOM */
(function () {
    'use strict';

    var Quiz = React.createClass({
        propTypes: {
            data: React.PropTypes.array.isRequired
        },
        getInitialState: function () {
            return _.extend({
                bgClass: 'neutral',
                showContinue: false,
            }, this.props.data.selectGame());
        },   
        handleBookSelected: function(title) {
            var isCorrect = this.state.checkAnswer(title);
            this.setState({
                bgClass: isCorrect ? 'pass' : 'fail',
                showContinue: isCorrect
            });
        },
        handleContinue: function () {
            this.setState(this.getInitialState());
        },
        render: function () {
            return (<div>
                    <div className="row">
                        <div className="col-md-4">
                            <img src={this.state.author.imageUrl} className="authorimage col-md-3" />
                        </div>
                        <div className={"col-md-7"}>
                            {this.state.books.map(function (b) {
                                return <Book onBookSelected={this.handleBookSelected} key={b} title={b} />;                            
                            },this)}
                        </div>
                        <div className={"col-md-1 " + this.state.bgClass} />
                    </div> 
                    {this.state.showContinue ? (
                        <div className="row">
                            <div className="col-md-12">
                                <input onClick={this.handleContinue} type="button" className="btn btn-primary btn-lg pull-right" value="Continue" />
                            </div>                        
                        </div>) : <span/>
                    }                   
                </div>
                );
        }
    });

    var Book = React.createClass({
        propTypes: {
            title: React.PropTypes.string.isRequired
        },
        handleClick: function () {
            this.props.onBookSelected(this.props.title);
        },
        render: function () {
            return  <div onClick={this.handleClick} className="answer">
                        <h4>{this.props.title}</h4>
                    </div>;
        }
    });

    var data = [
        {
            name: 'Mark Twain', 
            imageUrl: 'images/authors/marktwain.jpg',
            books: ['The Adventures of Huckleberry Finn']
        },
        {
            name: 'Joseph Conrad',
            imageUrl: 'images/authors/josephconrad.png',
            books: ['Heart of Darkness']
        },
        {
            name: 'J.K. Rowling',
            imageUrl: 'images/authors/jkrowling.jpg',
            imageSource: 'Wikimedia Commons',
            imageAttribution: 'Daniel Ogren',
            books: ['Harry Potter and the Sorcerers Stone']
        },
        {
            name: 'Stephen King',
            imageUrl: 'images/authors/stephenking.jpg',
            imageSource: 'Wikimedia Commons',
            imageAttribution: 'Pinguino',
            books: ['The Shining','IT']
        },
        {
            name: 'Charles Dickens',
            imageUrl: 'images/authors/charlesdickens.jpg',
            imageSource: 'Wikimedia Commons',
            books: ['David Copperfield', 'A Tale of Two Cities']
        },
        {
            name: 'William Shakespeare',
            imageUrl: 'images/authors/williamshakespeare.jpg',
            imageSource: 'Wikimedia Commons',
            books: ['Hamlet', 'Macbeth', 'Romeo and Juliet']
        }
    ];

    data.selectGame = function () {
        var books = _.shuffle(this.reduce(function (p, c, i) {
            return p.concat(c.books);
        }, [])).slice(0,4);

        var answer = books[_.random(books.length-1)];

        return {
            books: books,
            author: _.find(this, function (author) {
                return author.books.some(function (title) {
                    return title === answer;
                });
            }),
            checkAnswer: function (title) {
                return this.author.books.some(function (t) {
                    return t === title;
                });
            }
        };
    };

    

    React.renderComponent(<Quiz data={data} />, 
        document.getElementById('app'));

})();