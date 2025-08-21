import { Action, createReducer, on } from "@ngrx/store";
import { CoursesState, initCoursesState } from "./course.state";
import { addCourse, deleteCourse, selectCourse, setEditMode, toggleModal, updateCourse } from "./course.action";

const _coursesReducer = createReducer(initCoursesState, 
    on(toggleModal, (state: CoursesState) => {
        return {
            ...state,
            toggleModal: !state.toggleModal
        };
    }),

    on(addCourse, (state, payload) => {
        return {
            ...state,
            courses: [...state.courses, payload.course],
        };
    }),

    on(deleteCourse, (state, payload) => {
        return {
            ...state,
            courses: state.courses.filter(course => course.id !== payload.courseId)
        };
    }),

    on(selectCourse, (state, payload) => {
        return {
            ...state,
            selectedCourse: payload.course
        };
    }),

    on(updateCourse, (state, payload) => {
        return {
            ...state,
            courses: state.courses.map(course => {
                if(course.id === payload.course.id) {
                    return {...payload.course};
                }
                return course;
            })
        };
    }),

    on(setEditMode, (state, payload) => {
        return {
            ...state,
            isEditMode: payload.editMode
        };
    })
)

export function coursesReducer(state: CoursesState | undefined, action: Action<string>) {
    return _coursesReducer(state, action);
}