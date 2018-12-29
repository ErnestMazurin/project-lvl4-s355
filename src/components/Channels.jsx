import React from 'react';

class Channels extends React.Component {
  changeChannelHandler = id => (event) => {
    event.preventDefault();
    this.props.changeChannel({ id });
  };

  render() {
    const { channels, currentChannelId } = this.props;
    return (
      <div>
        <div className="mt-4 font-italic">Channels:</div>
        <ul className="list-group">
          {channels.map(({ id, name }) => {
            const className = `list-group-item list-group-item-action pl-1 ${id === currentChannelId ? 'active' : ''}`;
            return (
              <a key={id} className={className} onClick={this.changeChannelHandler(id)} href="">
                {`# ${name}`}
              </a>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Channels;
