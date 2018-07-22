import React from 'react';
import Blocker from './Blocker.jsx';

class Blockers extends React.Component {
  constructor(props) {
    super(props);
    this.state = { blockers: props.blockers };
    this.reload = props.reload;
  }

  componentWillReceiveProps({ blockers }) {
    this.setState({ blockers });
  }

  render() {
    const blockers = this.state.blockers.filter(x => !x.status_code);
    if (blockers.length === 0) { return (<div />); }
    return (
      <div>
        {blockers.map(blocker => <Blocker reload={this.reload} key={`blocker:${blocker.id}`} blocker={blocker} />)}
      </div>
    );
  }
}

export default Blockers;
