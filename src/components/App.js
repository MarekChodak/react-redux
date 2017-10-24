import React from 'react';
import {render} from 'react-dom';
import {  BrowserRouter as Router , Route} from 'react-router-dom';
import HomePage from './home/HomePage';
import Header from './common/Header';
import AboutPage from './about/AboutPage';
import CoursesPage from './course/CoursesPage';
import ManageCoursePage from './course/ManageCoursePage'

class App extends React.Component{

  render(){
    return (
      <Router>
        <div className="container-fluid">
          <Header/>
          <Route exact path="/" component={HomePage}/>
          <Route path="/about" component={AboutPage}/>
          <Route path="/courses" component={CoursesPage}/>
          <Route path="/course" component={ManageCoursePage}/>
          <Route path="/course:id" component={ManageCoursePage}/>
        </div>
      </Router>
    );
  }

}

export default App;
