import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MarketComponent} from './market.component';
import {MarketServiceSpy} from '../testing/market.service.spy.spec';
import {MarketServiceImpl} from '../market.service';
import {MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatProgressSpinnerModule, MatTableModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule, By} from '@angular/platform-browser';

describe('MarketComponent', () => {
  let component: MarketComponent;
  let fixture: ComponentFixture<MarketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MarketComponent],
      providers: [MarketServiceImpl],
      imports: [
        BrowserAnimationsModule,

        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatCardModule,

        ReactiveFormsModule,
        BrowserModule,
        FormsModule

      ]
    })
      .overrideComponent(MarketComponent,
        {
          set: {
            providers: [{
              provide: MarketServiceImpl,
              useClass: MarketServiceSpy
            }]
          }
        }
      ).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('TEST: Check that stockInput field exists. Use fixture.debugElement.query(…) to get element from the template.', () => {
    expect(fixture.debugElement.query(By.css('#company'))).toBeDefined();
  });

  it('TEST: Check company add', () => {
    let companyInput = fixture.debugElement.query(By.css('#company')).nativeElement;
    companyInput.value = 'Test';
    companyInput.dispatchEvent(new Event('input'));

    let symbolInput = fixture.debugElement.query(By.css('#symbol')).nativeElement;
    symbolInput.value = 'Test';
    symbolInput.dispatchEvent(new Event('input'));

    fixture.debugElement.query(By.css('button')).nativeElement.dispatchEvent(new Event('click'));

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.marketService.addStock).toHaveBeenCalledTimes(1);
    });

  });


});
