import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Course } from "../store/courses/course.model";
import { AppState } from "../store/app.state";
import { Store } from "@ngrx/store";
import { setEditMode, toggleModal } from "../store/courses/course.action";
import { coursesSelector, toggleModalSelector } from "../store/courses/course.selector";


@Component({
  selector: 'app-course',
  standalone: false,
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent implements OnInit {
  public toggleModal$!: Observable<boolean>;
  public courses$!: Observable<Course[]>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.toggleModal$ = this.store.select(toggleModalSelector);
    this.courses$ = this.store.select(coursesSelector);
  }

  addCourse(): void {
    this.store.dispatch(setEditMode({editMode: false}));
    this.store.dispatch(toggleModal({openModal: true}));
  }

}
