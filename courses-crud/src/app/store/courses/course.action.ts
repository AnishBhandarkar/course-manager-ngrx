import { createAction, props } from "@ngrx/store";
import { Course } from "..";

export const toggleModal = createAction(`[app_courses] Toggle modal`, props<{openModal: boolean}>());

export const addCourse = createAction('[app_courses] Add course', props<{course: Course}>());

export const deleteCourse = createAction('[app_courses] Delete course', props<{courseId: number}>());

export const selectCourse = createAction('[app_courses] Select course', props<{course: Course}>());

export const updateCourse = createAction('[app_courses] Update course', props<{course: Course}>());

export const setEditMode = createAction('[app_courses] Set edit mode', props<{editMode: boolean}>());
