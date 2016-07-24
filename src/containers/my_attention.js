/**
 * Created by zhaofeng on 2016/7/24.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {EndScrollLoad, UserList} from '../components';
import {
    getUserCollections
} from '../actions/favorite';


const mapStateToProps = state => ({
    favorite: state.favorite
});

const mapDispatchToProps = (dispatch) => ({
    action: bindActionCreators({
        getUserCollections
    }, dispatch),
    dispatch
});

class Attention extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            pageSize: 35
        }
    }

    componentDidMount() {
        this.userId = this.props.location.query.userId;
        let {page, pageSize} = this.state;
        this.props.action.getUserCollections(this.userId, page, pageSize);
    }

    nextPage() {
        this.state.page++;
        let {page, pageSize} = this.state;
        this.props.action.getUserCollections(this.userId, page, pageSize, true);
    }

    render() {
        let attentionUsers = this.props.favorite.attentionUsers || [];
        return (
            <EndScrollLoad target="panel" onLoad={this.nextPage.bind(this)}>
                <div className="elsa-panel rank-overview">
                    <h3 className="title">我的关注</h3>
                    <UserList users={attentionUsers}/>
                </div>
            </EndScrollLoad>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Attention);