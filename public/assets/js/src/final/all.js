var GitHub = React.createClass({displayName: "GitHub",
    getInitialState: function () {
        return {login: '', answer: {}};
    },
    get: function () {
        $.ajax({
            url: '/github/' + this.state.login,
            type: 'POST',
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.handleChange(data);
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status);
            }
        });
    },
    changeLogin: function (e) {
        this.setState({login: e.target.value, answer: this.state.answer});
    },
    handleChange: function (data) {
        this.setState({login: this.state.login, answer: data});
    },
    render: function () {
        var login = this.state.login;
        var answer = this.state.answer;
        return React.createElement("div", {className: "card"}, 
            React.createElement("div", {className: "row"}, 
                React.createElement("div", {className: "form-inline"}, 
                    React.createElement("input", {type: "text", className: "form-control col-12", value: login, onChange: this.changeLogin, 
                           placeholder: "Example input"}), 
                    React.createElement("button", {type: "submit", onClick: this.get, className: "btn btn-primary col-4"}, "Find")
                )
            ), 
            React.createElement("div", {className: "card-block"}, 

                React.createElement("h4", {className: "card-title"}, answer.login), 
                React.createElement("h6", {className: "card-subtitle text-muted"}, answer.name)
            ), 
            React.createElement("img", {src: answer.avatar_url, className: "img-circle", alt: answer.name}), 
            React.createElement("div", {className: "card-block"}, 
                React.createElement("p", {className: "card-text"}, answer.company), 
                React.createElement("a", {href: answer.html_url, className: "card-link"}, "Profile GitHub")
            )
        )
    }
});
ReactDOM.render(
    React.createElement(GitHub, null)
    ,
    document.getElementById('github')
);
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