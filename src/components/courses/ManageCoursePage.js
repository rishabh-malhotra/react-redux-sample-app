import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadCourses } from "../../redux/actions/courseAction";
import PropTypes from "prop-types";
import { loadAuthors } from "../../redux/actions/authorAction";

function ManageCoursePage({ courses, authors, loadCourses, loadAuthors }) {
  useEffect(() => {
    if (courses.length === 0) loadCourses().catch(err => console.log(err));
    if (authors.length === 0) loadAuthors().catch(err => console.log(err));
  }, []);

  return (
    <>
      <h2>Manage Course</h2>
    </>
  );
}

ManageCoursePage.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  //actions: PropTypes.object.isRequired
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    courses: state.courses,
    authors: state.authors
  };
};

const mapDispatchToProps = {
  //map dispatch to props in object form
  loadCourses,
  loadAuthors
  //shorthand syntax equival to loadAuthors:loadAuthors
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCoursePage);
