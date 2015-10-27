import $ from 'jquery';
var React = require('react');
import {OverlayMixin, OverlayTrigger, Tooltip, ButtonToolbar, Popover, Button} from 'react-bootstrap';

var RepoAdd = React.createClass({
    render: function () {
        return (
            <div className="repo-add">
                <ButtonToolbar>
                    <OverlayTrigger trigger="click" rootClose placement="bottom" bsSize="large"
                                    overlay={<Popover id="repo-add-popover" title="Popover bottom"><RepoAddBubble /></Popover>}>
                            <div className="repo-add-plus"><i className="fa fa-plus-square fa-2x repo-add-plus"></i></div>
                    </OverlayTrigger>
                </ButtonToolbar>
            </div>
        );
    }
});

var RepoAddBubble = React.createClass({
    render: function () {
        return (
            <div className="bubble">
                Here is the applicable note.
            </div>
        );
    }
});

module.exports = RepoAdd;