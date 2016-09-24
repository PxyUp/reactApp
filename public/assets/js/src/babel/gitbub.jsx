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
        return <div className="card">
            <div className="row">
                <div className="form-inline">
                    <input type="text" className="form-control col-12" value={login} onChange={this.changeLogin}
                           placeholder="Example input"/>
                    <button type="submit" onClick={this.get} className="btn btn-primary col-4">Find</button>
                </div>
            </div>
            <div className="card-block">

                <h4 className="card-title">{answer.login}</h4>
                <h6 className="card-subtitle text-muted">{answer.name}</h6>
                <h6 className="card-subtitle text-muted">{answer.bio}</h6>
            </div>
            <img src={answer.avatar_url} className="img-circle" alt={answer.name}/>
            <div className="card-block">
                <p className="card-text">{answer.company}</p>
                <a href={answer.html_url} target="_blank" className="card-link">Profile GitHub</a>
            </div>
        </div>
    }
});
ReactDOM.render(
    <GitHub />
    ,
    document.getElementById('github')
);