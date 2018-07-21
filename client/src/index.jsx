import React from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Navbar from './Components/Navbar.jsx';
import Login from './Components/Login.jsx';
import Register from './Components/Register.jsx';
import Sprint from './Components/Sprint.jsx';
import UserHome from './Components/UserHome.jsx'
import api from './api';


const Home = () => (
  <div>
  </div>
);


// const Topic = ({ match }) => (
//   <div>
//     <h3>
//       {match.params.topicId}
//     </h3>
//   </div>
// );

// const Topics = ({ match }) => (
//   <div>
//     <h2>
// Topics
//     </h2>
//     <ul>
//       <li>
//         <Link to={`${match.url}/rendering`}>
//           Rendering with React
//         </Link>
//       </li>
//       <li>
//         <Link to={`${match.url}/components`}>
//           Components
//         </Link>
//       </li>
//       <li>
//         <Link to={`${match.url}/props-v-state`}>
//           Props v. State
//         </Link>
//       </li>
//     </ul>

//     <Route path={`${match.path}/:topicId`} component={Topic} />
//     <Route
//       exact
//       path={match.path}
//       render={() => (
//         <h3>
// Please select a topic.
//         </h3>
//       )}
//     />
//   </div>
// );

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       user: null,
       sprint_id: false};

    this.updateUser = this.updateUser.bind(this);
    
    //this.updateUser();
  }


  updateUser() {
    api.verify()
      .then((user) => {
        console.log('verify response', user);
        if (user) {
          this.setState({ user });
        
        }
      });
  }

  render() {
    console.log(this.state);

    let main = (<div>Login yo, then pick a sprint</div>)

    if(this.state.user){
      // main = <Sprint updateUser={this.updateUser} sprint_id={this.state.sprint_id} />
      main = <UserHome />
    }
    return (
      <Router>
        <div>
          <Navbar user={this.state.user} />
          <hr />
          {main}
          <Route exact path="/" component={Home} />
          <Route path="/login" render={({ history }) => <Login history={history} updateUser={this.updateUser} />} />
          <Route path="/register" render={({ history }) => <Register history={history} updateUser={this.updateUser} />} />
           <Route path="/sprint/:id" component={Sprint} />
        </div>
      </Router>
    );
  }
}
render(<App />, document.getElementById('app'));
