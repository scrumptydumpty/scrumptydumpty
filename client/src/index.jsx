import React from 'react';
import { render } from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Navbar from "./Components/Navbar.jsx";
import Login from "./Components/Login.jsx";
import Register from "./Components/Register.jsx";
import Button from "@material-ui/core/Button";
import Sprint from "./Components/Sprint.jsx";
import api from "./api"


const Home = () => (
  <div>
    <h2>Home Page LOLOL</h2>
  </div>
);


const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.path}/:topicId`} component={Topic} />
    <Route exact path={match.path} render={() => (
      <h3>Please select a topic.</h3>
    )} />
  </div>
)

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {tasks:[]}

    api.getTasks()
    .then(tasks=>this.setState({tasks}));
  }
  
  
  
  
  
render(){
  console.log(this.state)
  return(
  <Router>
    <div>
      <Navbar />

      <hr />
      <Button variant="contained" color="primary">
        View Sprint
      </Button>
      <Sprint tasks={this.state.tasks}/>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      {/* <Route path="/sprint" component={Sprint} /> */}
    </div>
    </Router>
  );
}
}
render(<App />,document.getElementById("app"));