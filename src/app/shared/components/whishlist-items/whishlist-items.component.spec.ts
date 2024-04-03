import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhishlistItemsComponent } from './whishlist-items.component';

describe('WhishlistItemsComponent', () => {
  let component: WhishlistItemsComponent;
  let fixture: ComponentFixture<WhishlistItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhishlistItemsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WhishlistItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
