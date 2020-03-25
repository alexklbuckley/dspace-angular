import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { DateValueInputComponent } from './date-value-input.component';
import { FormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MockTranslateLoader } from '../../../../../shared/mocks/mock-translate-loader';
import { By } from '@angular/platform-browser';

describe('DateValueInputComponent', () => {
  let component: DateValueInputComponent;
  let fixture: ComponentFixture<DateValueInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: MockTranslateLoader
          }
        })],
      declarations: [DateValueInputComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateValueInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not show a validation error if the input field was left untouched but left empty', () => {
    const validationError = fixture.debugElement.query(By.css('.validation-error'));
    expect(validationError).toBeFalsy();
  });

  it('should show a validation error if the input field was touched but left empty',  fakeAsync(() => {
    component.value = '';
    fixture.detectChanges();
    tick();

    const input = fixture.debugElement.query(By.css('input'));
    input.triggerEventHandler('blur', null);

    fixture.detectChanges();

    const validationError = fixture.debugElement.query(By.css('.validation-error'));
    expect(validationError).toBeTruthy();
  }));

  it('should not show a validation error if the input field was touched but not left empty', fakeAsync(() => {
    component.value = 'testValue';
    fixture.detectChanges();
    tick();

    const input = fixture.debugElement.query(By.css('input'));
    input.triggerEventHandler('blur', null);

    fixture.detectChanges();

    const validationError = fixture.debugElement.query(By.css('.validation-error'));
    expect(validationError).toBeFalsy();
  }));
});
