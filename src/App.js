import React, { Component } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Alert from './components/layout/Alert';
import Search from './components/users/Search';
import axios from 'axios';

class App extends Component {
  state = {
    users: [] ,
    loading: false,
    alert: null
  }
  
  // async componentDidMount() {
  //   console.log( 'secret', process.env.REACT_APP_GITHUB_CLIENT_SECRET)
  //   this.setState({ loading: true })

  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
  //   &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

  //   console.log('got http', res.data)

  //   this.setState({ users: res.data, loading: false })

  // }

  searchUsers = async text => {
    console.log(text)

    this.setState({ loading: true})
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    console.log('got http', res.data)

    this.setState({ users: res.data.items, loading: false })
  }

  // clear users from state
  clearUsers = () => this.setState({ users: [], loading: false})

  // Set Alert

  setAlert = (msg, type) => {
    this.setState({ alert: { msg: msg, type: type }
    })
    setTimeout(() => this.setState({ alert: null }), 5000)
  }

  render() {
    const { users, loading } = this.state;

    return <div className="App">
      <Navbar />
      <div className="container">
        <Alert alert={this.state.alert} />
      <Search 
        searchUsers={this.searchUsers} 
        clearUsers={this.clearUsers}
        showClear={users.length > 0 ? true: false }
        setAlert={this.setAlert} />
        <Users loading={this.state.loading} users={this.state.users} />
      </div>
      </div>
  }
}

export default App;
