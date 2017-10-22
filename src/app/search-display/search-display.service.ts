import { Injectable } from '@angular/core';
import { LatestResponseModel } from '../core/api/latest/latest-response.model';
import { CitiesResponseModel } from '../core/api/cities/cities-response.model';

@Injectable()
export class SearchDisplayService {
    filterCities(
        cityName: string,
        cities: CitiesResponseModel[]
    ): CitiesResponseModel[] {
        let filteredCities: CitiesResponseModel[] = cities.filter(city =>
            city.city.toLowerCase().indexOf(cityName.toLowerCase()) === 0);
        return filteredCities.slice(0, 5);
    }

    sortCities(cityA: CitiesResponseModel, cityB: CitiesResponseModel): number {
        const a = cityA.city.toLowerCase();
        const b = cityB.city.toLowerCase();
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    }

    pm25Color(location: LatestResponseModel): string {
        if (!this.validateLatestResponse(location)) return '';
        let val: number = location.measurements[0].value;
        if (!val) return '';
        if (val < 20) return 'green';
        if (val < 40) return 'orange';
        if (val < 70) return 'red';
        if (val >= 70) return 'dark-red';
        return '';
    }

    validateLatestResponse(location: LatestResponseModel): boolean {
        return !!(location &&
            location.city &&
            location.measurements &&
            location.measurements[0] &&
            location.measurements[0].value)
    }
}