var React = require('react');

class ResultsItem extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            hero: {}
        }
    }

    render() {
        return(
            <li>
                <img src={this.props.img} alt=""/>
                    <div className="container-caption">
                        <div className="txt-title">{this.props.name}</div>
                    </div>
            </li>
        );
    }
}

module.exports = ResultsItem;