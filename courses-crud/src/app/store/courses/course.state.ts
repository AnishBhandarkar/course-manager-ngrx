import { Course } from "./course.model"

export interface CoursesState {
    courses: Course[],
    toggleModal: boolean,
    selectedCourse: Course | null,
    isEditMode: boolean
}

export const initCoursesState: CoursesState = {
    courses: [{
      id: 1,
      name: "Javascript",
      author: "Jack",
      price: 34
    },
    {
      id: 2,
      name: "Typescript",
      author: "John",
      price: 78
    }],
    toggleModal: false,
    selectedCourse: null,
    isEditMode: false
}