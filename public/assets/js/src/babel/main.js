var QuoteBlock = React.createClass({
    displayName: 'QuoteBlock',

    getInitialState: function getInitialState() {
        return {quote: 'Click button!'};
    },
    get: function get() {
        $.ajax({
            url: '/forismatic/',
            type: 'POST',
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.handleChange(data.answer);
            }.bind(this),
            error: function error(xhr, status, err) {
                console.error(status);
            }
        });
    },
    handleChange: function handleChange(event) {
        this.setState({quote: event});
    },
    render: function render() {
        var quote = this.state.quote;
        return React.createElement(
            'div',
            null,
            React.createElement(
                'p',
                null,
                quote
            ),
            React.createElement(
                'button',
                {onClick: this.get},
                'Get'
            )
        );
    }
});

ReactDOM.render(React.createElement(QuoteBlock, null), document.getElementById('container'));
