import React from 'react';

class Channels extends React.Component {
  render() {
    const { channels } = this.props;
    return (
      <ul className="list-unstyled">
        Channels:
        {
          channels.map(({ id, name }) => <li className="pl-1" key={id}>{`# ${name}`}</li>)
        }
      </ul>
    );
  }
}

export default Channels;
