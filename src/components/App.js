import React, {PropTypes} from 'react';
import {render} from 'react-dom';
import {  BrowserRouter as Router , Route} from 'react-router-dom';
import HomePage from './home/HomePage';
import Header from './common/Header';
import AboutPage from './about/AboutPage';
import CoursesPage from './course/CoursesPage';
import ManageCoursePage from './course/ManageCoursePage';
import {connect} from 'react-redux';

class App extends React.Component{

  render(){
    return (
      <Router>
        <div className="container-fluid">

          <Header loading={this.props.loading}/>

          <Route exact path="/" component={HomePage}/>
          <Route path="/about" component={AboutPage}/>
          <Route exact path="/courses" component={CoursesPage}/>
          <Route exact path="/course" component={ManageCoursePage}/>
          <Route path="/course/:id" component={ManageCoursePage}/>
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  loading : PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    loading: state.ajaxCallsInProgress > 0
  };
}

export default connect(mapStateToProps)(App);
