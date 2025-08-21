import { Component, Input } from '@angular/core';
import { AppState, Course, deleteCourse, selectCourse, setEditMode, toggleModal } from '../store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-course-card',
  standalone: false,
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css'
})
export class CourseCardComponent {
  @Input('course') course!: Course;

  constructor(private store: Store<AppState>) {}

  public delete(): void {
    this.store.dispatch(deleteCourse({courseId: this.course.id}));
  }

  public update(): void {
    this.store.dispatch(selectCourse({course: this.course}));
    this.store.dispatch(setEditMode({editMode: true}));
    this.store.dispatch(toggleModal({openModal: true}));
  }
}
