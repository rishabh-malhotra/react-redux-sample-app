import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadCourses, saveCourse } from "../../redux/actions/courseAction";
import PropTypes from "prop-types";
import { loadAuthors } from "../../redux/actions/authorAction";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";
import Spinner from "../common/Spinner";
import {toast} from "react-toastify"

function ManageCoursePage({
  courses,
  authors,
  loadCourses,
  loadAuthors,
  saveCourse,
  history,
  ...props
}) {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});
  const [saving,setSaving] =useState(false);

  useEffect(() => {
    if (courses.length === 0) loadCourses().catch(err => console.log(err));
    else setCourse({ ...props.course });
    if (authors.length === 0) loadAuthors().catch(err => console.log(err));
  }, [ props.course ]);

  function handleChange(event) {
    const { name, value } = event.target;
    setCourse(prevCourse => ({
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value
    }));
  }
  function formIsValid() {
    const { title, authorId, category } = course;
    const errors = {};

    if (!title) errors.title = "Title is required.";
    if (!authorId) errors.author = "Author is required";
    if (!category) errors.category = "Category is required";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if(!formIsValid()) return;
    setSaving(true);
    saveCourse(course).then(() => {
      toast.success("Course saved.")
      history.push("/courses");
    }).catch(error=>{
      setSaving(false);
      setErrors({onSave:error.message})
    });
  }

  return authors.length === 0 || courses.length === 0 ? (
    <Spinner />
  ) : (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  //actions: PropTypes.object.isRequired
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};
function getCourseBySlug(courses, slug) {
  return courses.find(course => course.slug === slug) || null;
}

const mapStateToProps = (state, ownProps) => {
  const slug = ownProps.match.params.slug;
  const course =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse;
  return {
    course: course,
    courses: state.courses,
    authors: state.authors
  };
};

const mapDispatchToProps = {
  //map dispatch to props in object form
  loadCourses,
  loadAuthors,
  saveCourse
  //shorthand syntax equival to loadAuthors:loadAuthors
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCoursePage);
