import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addCourse, AppState, Course, toggleModal, updateCourse } from '../store';
import { editModeSelector, selectedCourseSelector } from '../store/courses/course.selector';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-course-edit',
  standalone: false,
  templateUrl: './course-edit.component.html',
  styleUrl: './course-edit.component.css'
})
export class CourseEditComponent implements OnInit, OnDestroy {
  public courseForm!: FormGroup;
  public isEditMode!: boolean;
  private editModeSubscription!: Subscription;
  private selectedCourseSubscription!: Subscription;

  constructor(private fb: FormBuilder, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.courseForm = this.fb.group({
      id: [null, [Validators.required]],
      name: [null, [Validators.required]],
      author: [null, [Validators.required]],
      price: [null, [Validators.required]],
    });

    this.editModeSubscription = this.store.select(editModeSelector).subscribe((mode: boolean) => {
      this.isEditMode = mode;
    })

    this.selectedCourseSubscription = this.store.select(selectedCourseSelector).subscribe((course: Course | null) => {
      if (course && this.isEditMode) {
        this.courseForm.patchValue(course);
        this.courseForm.get('id')?.disable(); // Cannot update Id.
      } else {
        this.courseForm.reset();
        this.courseForm.get('id')?.enable(); // Can add id during adding course only.
      }
    });
  }

  ngOnDestroy(): void {
    if (this.editModeSubscription) {
      this.editModeSubscription.unsubscribe();
    }
    if (this.selectedCourseSubscription) {
      this.selectedCourseSubscription.unsubscribe();
    }
  }

  public addCourse(): void {
    if (this.courseForm.valid) {
      if (this.isEditMode) {
        this.courseForm.get('id')?.enable(); // Enable id otherwise, it wont id field will be ignored.
        this.store.dispatch(updateCourse({ course: this.courseForm.value }));
      } else {
        this.store.dispatch(addCourse({ course: this.courseForm.value }));
      }
      this.courseForm.reset();
      this.store.dispatch(toggleModal({ openModal: false }));
    } else {
      alert('Invalid form');
    }
  }

  public closeModal(): void {
    this.store.dispatch(toggleModal({ openModal: false }));
  }

}
