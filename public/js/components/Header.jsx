var React = require('react');

class Header extends React.Component {
    render() {
        return(
            <header className="navbar navbar-inverse navbar-fixed-top">
                <div className="container">
                    <a className="navbar-brand" href="/">Project name</a>
                </div>
            </header>
        );
    }
}

module.exports = Header;