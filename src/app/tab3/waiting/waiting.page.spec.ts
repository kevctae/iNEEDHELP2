import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WaitingPage } from './waiting.page';

describe('WaitingPage', () => {
  let component: WaitingPage;
  let fixture: ComponentFixture<WaitingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WaitingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
