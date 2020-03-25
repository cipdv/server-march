// import React, {Component} from 'react';
// import {connect} from 'react-redux';


// class Header extends Component {
//     renderContent () {
//         switch (this.props.auth) {
//             case null:
//                 return;
//             case false:
//                 return <li><a href="/auth/google">Sign in</a></li>;
//             default:
//                 return <li>Logout</li>
//         }
//     }

//     render () {
//         return (
//             <nav>
//                 <div className="nav-wrapper">
//                     <a className="left brand-logo">
//                         Emaily
//                     </a>
//                     <ul className="right">
//                         {this.renderContent()}
//                     </ul>
//                 </div>
//             </nav>
//         )
//     }
    
// }

// function mapStateToProps (auth) {
//     return {auth}
// };

// export default connect(mapStateToProps)(Header);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';
 
class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <li><a href="/auth/google">Login With Google</a></li>;
      default:
        return [
          <li><Payments /></li>,
          <li><a href="/api/logout">Logout</a></li>
        ];
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to={this.props.auth ? '/surveys' : '/'}>Emaily</Link>
          <ul className="right">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);