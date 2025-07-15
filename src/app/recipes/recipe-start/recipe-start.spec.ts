import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeStart } from './recipe-start';

describe('RecipeStart', () => {
  let component: RecipeStart;
  let fixture: ComponentFixture<RecipeStart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeStart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeStart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
