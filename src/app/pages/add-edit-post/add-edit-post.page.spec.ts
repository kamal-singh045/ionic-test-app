import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditPostPage } from './add-edit-post.page';

describe('AddEditPostPage', () => {
  let component: AddEditPostPage;
  let fixture: ComponentFixture<AddEditPostPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditPostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
