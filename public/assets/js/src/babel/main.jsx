var QuoteBlock = React.createClass({
    getInitialState: function () {
        return {quote: 'Click button!'};
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
        return <div><p>{quote}</p>
            <button onClick={this.get}>Get</button>
        </div>
    }
});

ReactDOM.render(
    <QuoteBlock />,
    document.getElementById('container')
);