var GitHub = React.createClass({
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
        return <div>
            <input value={login} onChange={this.changeLogin} placeholder="Input login"/>
            <button onClick={this.get}>Get</button>
            <div>
                <p>{answer.login}</p>
                <img src={answer.avatar_url} width="200px" height="200px"/>
                <br/>
                <a href={answer.html_url} target="_blank">Link</a>
            </div>
        </div>
    }
});
ReactDOM.render(
    <GitHub />,
    document.getElementById('gitbub')
);