import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { signoutUser } from '../actions';

// function based "dumb" component with no state
class NavBar extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {};

    this.signout = this.signout.bind(this);
    this.renderSign = this.renderSign.bind(this);
  }

  signout() {
    this.props.signoutUser();
  }

  renderSign() {
    if (this.props.authenticated) {
      return (
        <div>
          <button onClick={() => this.signout()}>Sign out</button>
          <Link to="profile"><button>Profile</button></Link>
        </div>
      );
    } else {
      return (
        <div className="signin/up">
          <Link to="signin"><button>Sign in</button></Link>
          <Link to="signup"><button>Sign up</button></Link>
        </div>
      );
    }
  }

  render() {
    return (
      <nav>
        <Link to="/">Blog</Link>
        <Link to="posts/new"><button>Add</button></Link>
        {this.renderSign()}
      </nav>
    );
  }
}

const mapStateToProps = (state) => (
  {
    authenticated: state.auth.authenticated,
  }
);

// react-redux glue -- outputs Container that knows how to call actions
export default connect(mapStateToProps, { signoutUser })(NavBar);
