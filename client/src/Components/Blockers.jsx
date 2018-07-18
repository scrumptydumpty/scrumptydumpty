import React from 'react';
import Blocker from './Blocker.jsx';

class Blockers extends React.Component {
  constructor(props) {
    super(props);
    this.state = { blockers: props.blockers };
  }

  componentWillReceiveProps({ blockers }) {
    this.setState({ blockers });
  }

  render() {
    const blockers = this.state.blockers;
    if (blockers.length === 0)
      {return (<div></div>);}

    return (
      <div style={{ pointerEvents: 'none' }}>
        {blockers.map(blocker => <Blocker key={'blocker:' + blocker.id} blocker={blocker} />)}
      </div>
    );
  }
}

export default Blockers;
