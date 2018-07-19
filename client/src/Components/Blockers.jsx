import React from "react";
import { Link } from "react-router-dom";
import { StatusCode } from "../../../lib/shared";
import Blocker from "./Blocker.jsx"

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
    if(blockers.length===0) 
    return (<div></div>);

    return (
      <div>
        {blockers.map(blocker => <Blocker key={'blocker:' + blocker.id} blocker={blocker} />)}
      </div>
    );
  }
}

export default Blockers;
