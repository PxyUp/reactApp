var QuoteBlock = React.createClass({
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
                this.handleChange(status);
            }
        });
    },
    handleChange: function (event) {
        this.setState({quote: event});
    },
    render: function () {
        var quote = this.state.quote;
        return <div className="card">
            <div className="card-header">
                {quote.quoteAuthor}
            </div>
            <div className="card-block">
                <h4 className="card-title">{quote.quoteLink}</h4>
                <p className="card-text">{quote.quoteText}</p>
                <button className="btn btn-primary" onClick={this.get}>Go random</button>
            </div>
        </div>
    }
});

ReactDOM.render(
    <QuoteBlock />,
    document.getElementById('quote')
);