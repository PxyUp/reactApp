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
        return React.createElement("div", null, 
            React.createElement("input", {value: login, onChange: this.changeLogin, placeholder: "Input login"}), 
            React.createElement("button", {onClick: this.get}, "Get"), 
            React.createElement("div", null, 
                React.createElement("p", null, answer.login), 
                React.createElement("img", {src: answer.avatar_url, width: "200px", height: "200px"}), 
                React.createElement("br", null), 
                React.createElement("a", {href: answer.html_url, target: "_blank"}, "Link")
            )
        )
    }
});
ReactDOM.render(
    React.createElement(GitHub, null),
    document.getElementById('gitbub')
);
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