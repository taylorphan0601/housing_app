import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
  <section>
  <form>
    <input type="text" placeholder="Filter by city/name/state" #filter>
    <button class="primary" type="button"
    (click)="filterResults(filter.value)">Search</button>
  </form>
  </section>
  <section class="house-display">
  <app-housing-location
  *ngFor="let housingLocation of filteredLocationList"
  [housingLocation]="housingLocation">
</app-housing-location>
  </section>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  housingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);
  filteredLocationList: HousingLocation[] = [];
  filterResults(filter: string) {
    if(!filter) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }

    this.filteredLocationList = this.housingLocationList.filter(housingLocation => 
      housingLocation.city.toLowerCase().includes(filter.toLowerCase())
      || housingLocation.state.toLowerCase().includes(filter.toLowerCase())
      || housingLocation.name.toLowerCase().includes(filter.toLowerCase())
    );
  }

  constructor() {
    this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
      this.housingLocationList = housingLocationList;
      this.filteredLocationList = housingLocationList;
    });
  }
}
