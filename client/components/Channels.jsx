import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { Icon } from 'react-icons-kit';
import { remove } from 'react-icons-kit/fa/remove';
import { gear } from 'react-icons-kit/fa/gear';
import * as actionCreators from '../actions';
import NewChannelModal from './NewChannelModal';
import DeleteChannelModal from './DeleteChannelModal';
import RenameChannelModal from './RenameChannelModal';

/** channel = {
  id -> int,
  channelId -> int,
  name -> string,
  removable -> boolean,import * as actionCreators from './actions';
  messages -> [...msgIds],
}
 */

const mapStateToProps = ({ channels: { byId }, ui: { currentChannelId } }) => ({
  channels: _.values(byId),
  currentChannelId,
});

class Channels extends React.Component {
  onChangeChannel = (id) => (event) => {
    event.preventDefault();
    const { changeChannel } = this.props;
    changeChannel({ id });
  };

  onNew = (event) => {
    event.preventDefault();
    const { showNewChannelModal } = this.props;
    showNewChannelModal();
  };

  onDelete = (id, name) => (event) => {
    event.preventDefault();
    const { showDeleteChannelModal } = this.props;
    showDeleteChannelModal({ id, name });
  };

  onRename = (id) => (event) => {
    event.preventDefault();
    const { showRenameChannelModal } = this.props;
    showRenameChannelModal({ id });
  };

  renderButtons = (id, name) => (
    <div className="d-flex justify-content-between">
      <Icon onClick={this.onRename(id)} icon={gear} size={20} className="text-warning" />
      <Icon onClick={this.onDelete(id, name)} icon={remove} size={20} className="text-danger" />
    </div>
  );

  render() {
    const { channels, currentChannelId } = this.props;
    return (
      <div>
        <div className="mt-4 px-1 d-flex justify-content-between">
          <div className="font-italic">Channels:</div>
          <NewChannelModal />
          <DeleteChannelModal />
          <RenameChannelModal />
        </div>
        <ul className="list-group shadow">
          {channels.map(({ id, name, removable }) => {
            const divClassName = `list-group-item list-group-item-action d-flex justify-content-between px-2 ${
              id === currentChannelId ? 'active' : ''
            }`;
            return (
              // eslint-disable-next-line
              <a key={id} className={divClassName} onClick={this.onChangeChannel(id)} href="">
                {`# ${name}`}
                {removable && this.renderButtons(id, name)}
              </a>
            );
          })}
        </ul>
        <Button variant="success" className="btn-lg btn-block py-1 font-weight-bold shadow" onClick={this.onNew}>
          +
        </Button>
      </div>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(Channels);
