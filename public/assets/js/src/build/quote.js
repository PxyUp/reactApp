var QuoteBlock = React.createClass({displayName: "QuoteBlock",
    getInitialState: function () {
        return {quote: {}};
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
        this.setState({quote: event});
    },
    render: function () {
        var quote = this.state.quote;
        return React.createElement("div", {className: "card"}, 
            React.createElement("div", {className: "card-header"}, 
                quote.quoteAuthor
            ), 
            React.createElement("div", {className: "card-block"}, 
                React.createElement("h4", {className: "card-title"}, quote.quoteLink), 
                React.createElement("p", {className: "card-text"}, quote.quoteText), 
                React.createElement("button", {className: "btn btn-primary", onClick: this.get}, "Go random")
            )
        )
    }
});

ReactDOM.render(
    React.createElement(QuoteBlock, null),
    document.getElementById('quote')
);