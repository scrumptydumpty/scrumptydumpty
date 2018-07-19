import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { StatusCode } from '../../../lib/shared';
import { COLOR } from '../../../lib/shared';

import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

console.log(COLOR.red);
class Blocker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { blocker: props.blocker, hovering: false };
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);

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
    console.log('Hello!'); ///call edit blocker form
  }

  render() {
    const blocker = this.state.blocker;
    const style = { borderRadius: '10px', margin: '5px', backgroundColor: COLOR.red };

    if(this.state.hovering) {
      style.backgroundColor = COLOR.green;
    }

    if(this.state.hovering) {
      return (
        <div onMouseLeave={this.onMouseOut}>
          <Card style={style}>
            <CardContent style={{ padding: '5px', textAlign: 'center' }}>
              <div>
                {blocker.title}
                <Button variant="contained" style={{float: 'right'}} onClick={this.onClickHandler}>
                  Delete
                  <DeleteIcon/>
                </Button>
              </div>
              <div>
Status: 
            {' '}
            {Object.keys(StatusCode).find(x => StatusCode[x] === blocker.status_code)}
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return (
      <div>

        <Card style={style} onMouseEnter={this.onMouseOver}>
          <CardContent style={{ padding: '5px', textAlign: 'center' }}>
            <div>
            {blocker.title}
                    </div>
            <div>
Status:
            {' '}
            {Object.keys(StatusCode).find(x => StatusCode[x] === blocker.status_code)}
                    </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default Blocker;
