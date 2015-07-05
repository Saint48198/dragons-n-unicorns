var React = require('react');
var $ = require('jquery');
var Header = require('./Header.jsx');
var SearchBox = require('./SearchBox.jsx');
var ResultItem = require('./ResultItem.jsx');

class Main extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            data: [],
            term: this.getQueryTerm(),
            isWorking: false
        };
    }

    loadDataFromServer (term) {
        if (term) {
            $.ajax({
                url: this.getComicDataUrl(term),
                success: function(resp) {
                    this.setState({ data: resp.data.results, isWorking: false });
                }.bind(this),
                error: function (xhr, status, error) {
                    this.setState({ isWorking: false });
                    console.log(xhr, status, error);
                }.bind(this)
            });
        }
    }

    getComicDataUrl (term) {
        var url = "/api?nameStartsWith=" + encodeURIComponent(term);
        return url;
    }

    getQueryTerm () {
        var queries = location.search;
        var params = [];
        var total = 0;
        var param;
        var query = "";

        if (queries) {
            params = queries.substr(1).split("&");
            total = params.length;
            while (total) {
                total--;
                param = params[total].split("=");
                if (param[0] === "query") {
                    query = param[1];
                    break;
                }
            }
        }

        return query;
    }

    search (term) {
        if (term) {
            this.setState({ term: term, isWorking: true });
            this.loadDataFromServer(term);
        }
    }

    componentDidMount () {
        this.search(this.state.term);
    }

    render () {
        if (this.state.isWorking) {
            return(
                <div className="container-app">
                    <Header />
                    <SearchBox
                        term={this.state.term}
                        search={this.search.bind(this)}
                    />
                    <main className="container">
                        <div className="container-loading">
                            <i className="fa fa-cog fa-spin"> </i> loading...
                        </div>
                    </main>
                </div>
            );
        }

        return(
            <div className="container-app">
                <Header />
                <SearchBox
                    term={this.state.term}
                    search={this.search.bind(this)}
                />
                <main className="container">
                    <ul className="list-videos">
                        {this.state.data.map(el => {
                            var imgSrc = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";
                            if (el.thumbnail !== null) {
                                imgSrc = el.thumbnail.path + "." + el.thumbnail.extension
                            }
                            return (
                                <ResultItem
                                    key={el.id}
                                    name={el.name}
                                    img={imgSrc}
                                    data={el}
                                />
                            );
                        })}
                    </ul>
                </main>
            </div>
        );
    }
}

module.exports = Main;
