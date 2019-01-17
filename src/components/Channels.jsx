import React from 'react';
import { Button } from 'react-bootstrap';
import connect from '../connect';
import NewChannelModal from './NewChannelModal';
import DeleteChannelModal from './DeleteChannelModal';

const mapStateToProps = ({ channels, currentChannelId }) => ({ channels, currentChannelId });

/** channel = {
  id -> int,
  name -> string,
  removable -> boolean,
}
 */

@connect(mapStateToProps)
class Channels extends React.Component {
  onChangeChannel = id => (event) => {
    event.preventDefault();
    const { changeChannel } = this.props;
    changeChannel({ id });
  };

  onDelete = (id, name) => (event) => {
    event.preventDefault();
    const { showDeleteChannelModal } = this.props;
    showDeleteChannelModal({ id, name });
  };

  onNew = (event) => {
    event.preventDefault();
    const { showNewChannelModal } = this.props;
    showNewChannelModal();
  };

  renderCloseBtn = (id, name) => (
    <button onClick={this.onDelete(id, name)} type="button" className="close text-danger" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  );

  render() {
    const { channels, currentChannelId } = this.props;
    return (
      <div>
        <div className="mt-4 px-1 d-flex justify-content-between">
          <div className="font-italic">Channels:</div>
          <NewChannelModal />
        </div>
        <DeleteChannelModal />
        <ul className="list-group shadow">
          {channels.map(({ id, name, removable }) => {
            const divClassName = `list-group-item list-group-item-action d-flex justify-content-between px-2 ${id === currentChannelId ? 'active' : ''}`;
            return (
              <a key={id} className={divClassName} onClick={this.onChangeChannel(id)} href="">
                {`#${name}`}
                {removable && this.renderCloseBtn(id, name)}
              </a>
            );
          })}
        </ul>
        <Button variant="success" className="btn-lg btn-block py-1 font-weight-bold shadow" onClick={this.onNew}>+</Button>
      </div>
    );
  }
}

export default Channels;
