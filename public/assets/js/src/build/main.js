var QuoteBlock = React.createClass({displayName: "QuoteBlock",
    getInitialState: function () {
        return {quote: 'Click button!', author: ''};
    },
    get: function () {
        $.ajax({
            url: '/forismatic/',
            type: 'POST',
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.handleChange(data.answer);
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status);
            }
        });
    },
    handleChange: function (event) {
        this.setState({quote: event.quoteText, author: event.quoteAuthor});
    },
    render: function () {
        var quote = this.state.quote;
        var author = this.state.author;
        return React.createElement("div", null, 
            React.createElement("p", null, quote), 
            React.createElement("p", null, "@ ", author), 
            React.createElement("button", {onClick: this.get}, "Get")
        )
    }
});

ReactDOM.render(
    React.createElement(QuoteBlock, null),
    document.getElementById('container')
);