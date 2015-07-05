var React = require('react');

class SearchBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            term: ""
        };
    }

    handleTermEvent(e) {
        this.setState({ term: e.target.value });
    }

    handleTermSubmit(e) {
        e.preventDefault();

        var term = e.target.term.value;

        this.setState({term: term });
        this.props.search(term);

        history.pushState(null, null, document.location.href.split("?")[0] + "?query=" + encodeURIComponent(term));
    }

    render() {
        var term = this.state.term;

        if(this.props.term) {
            term = decodeURIComponent(this.props.term);
        }

        return(
            <form className="container" method="post" action="." onSubmit={this.handleTermSubmit.bind(this)}>
                <fieldset>
                    <div className="input-group">
                        <input type="text" value={term} className="form-control app-header__search" onChange={this.handleTermEvent.bind(this)} placeholder="Search" name="term" />
                        <div className="input-group-addon">
                            <button type="submit" id="basic-addon2 btn" title="search"><i className="fa fa-search"></i></button>
                        </div>
                    </div>
                </fieldset>
            </form>
        );
    }
}

module.exports = SearchBox;