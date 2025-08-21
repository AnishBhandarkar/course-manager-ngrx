import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CoursesState } from "./course.state";

const courseStateSelector = createFeatureSelector<CoursesState>('app_courses');

export const toggleModalSelector = createSelector(courseStateSelector, state => state.toggleModal);

export const coursesSelector = createSelector(courseStateSelector, state => state.courses);

export const selectedCourseSelector = createSelector(courseStateSelector, state => state.selectedCourse);

export const editModeSelector = createSelector(courseStateSelector, state => state.isEditMode);

