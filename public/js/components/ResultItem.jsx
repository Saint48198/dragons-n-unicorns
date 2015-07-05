var layerMixin = require('../mixins/ReactLayeredComponentMixin.jsx');
var React = require('react');
var ModalDialog = require('./Modal.jsx');

class ResultsItem extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            hero: {},
            currentHero: {}
        }
    }

    handleClick(e) {
        console.log(this.props);
    }

    render() {
        return(
            <li onClick={this.handleClick.bind(this)}>
                <img src={this.props.img} alt="" />
                    <div className="container-caption">
                        <div className="txt-title">{this.props.name}</div>
                    </div>
            </li>
        );
    }
}

module.exports = ResultsItem;