import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';

class ManageCoursePage extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      course : Object.assign({}, props.course),
      errors:{}
    };
    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(this.props.course.id !== nextProps.course.id){
      this.setState({
        course: Object.assign({}, nextProps.course)
      });
    }
  }

  updateCourseState(event){
    const field = event.target.name;
    let course = this.state.course;
    course[field] = event.target.value;
    return this.setState({course:course});
  }

  saveCourse(event){
    event.preventDefault();
    this.props.actions.saveCourse(this.state.course);
    this.props.history.push("/courses");
  }

  render(){
    return (
      <CourseForm
        allAuthors={this.props.authors}
        onChange={this.updateCourseState}
        onSave={this.saveCourse}
        errors={this.state.errors}
        course={this.state.course}/>
    );
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

ManageCoursePage.contextTypes = {
  router : PropTypes.object
};

function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators(courseActions, dispatch)
  };
}

function getCourseById(courses, courseId) {
  const course = courses.filter(course => course.id === courseId);
  if(course.length) return course[0];
  return null;
}

function mapStateToProps(state, ownProps) {
  const courseId = ownProps.match.params.id;

  let course = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''};

  if(courseId && state.courses.length > 0){
    course = getCourseById(state.courses, courseId);
  }

  const authorsFormatted = state.authors.map(author => {
    return {
      value: author.id,
      text: author.firstName + ' ' + author.lastName
    };
  });

  return {
    course: course,
    authors : authorsFormatted
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
