import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { CourseComponent } from './course/course.component';
import { CourseCardComponent } from './course-card/course-card.component';
import { AppReducer } from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CourseEditComponent } from './course-edit/course-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    CourseComponent,
    CourseCardComponent,
    CourseEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    StoreModule.forRoot(AppReducer),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
