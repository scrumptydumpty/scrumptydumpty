import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { COLOR } from '../../../lib/shared';
import api from '../api';

class Blocker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      blocker: props.blocker, 
      hovering: false };
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
    this.reload = props.reload;
  }

  componentWillReceiveProps({ blocker }) {
    this.setState({ blocker });
  }

  onMouseOver(e) {
    this.setState({ hovering: true });
  }

  onMouseOut(e) {
    this.setState({ hovering: false });
  }

  onClickHandler(e) {
    api.deleteBlocker(this.state.blocker)
      .then(res => this.reload());
  }

  render() {
    const blocker = this.state.blocker;
    const style = {
      borderRadius: 3,
      boxShadow: "0 1px 0 #ccc",
      display: "block",
      margin: '10px auto 8px auto',
      maxWidth: 300,
      minHeight: 20,
      position: "relative",
      textDecoration: "none",
      width: '80%', 
      backgroundColor: COLOR.red
    };

    return (
      <div>
        <Card style={style} onMouseEnter={this.onMouseOver} onMouseLeave={this.onMouseOut}>
          <CardContent style={{ padding: '10px' }}>
            <div>
              <span>{blocker.title}</span>
              {this.state.hovering ?
                <span><DeleteIcon
                  style={{ fontSize: "1.2em", float: "right", paddingRight: "5px" }}
                  onClick={this.onClickHandler} /></span> : null}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default Blocker;
