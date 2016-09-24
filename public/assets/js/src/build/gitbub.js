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