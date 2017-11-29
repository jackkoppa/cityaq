import { SearchService } from './search.service';

import { CitiesResponse } from '../core/api/openaq/cities/cities-response.model';

describe('SearchService', () => {
    let searchService: SearchService;
    beforeEach(() => searchService = new SearchService());

    const testCitiesResponses: CitiesResponse[] = [
        [
            {
              "city": "037",
              "country": "US",
              "locations": 1,
              "count": 318
            },
            {
              "city": "039",
              "country": "US",
              "locations": 1,
              "count": 379
            },
            {
              "city": "051",
              "country": "US",
              "locations": 1,
              "count": 270
            },
            {
              "city": "21 de mayo",
              "country": "CL",
              "locations": 1,
              "count": 66
            },
            {
              "city": "A Coruña",
              "country": "ES",
              "locations": 4,
              "count": 29841
            },
            {
              "city": "Aargau",
              "country": "CH",
              "locations": 1,
              "count": 2542
            },
            {
              "city": "ABBEVILLE",
              "country": "US",
              "locations": 1,
              "count": 4619
            },
            {
              "city": "Aberdeen",
              "country": "GB",
              "locations": 3,
              "count": 77137
            },
            {
              "city": "Aberdeen",
              "country": "US",
              "locations": 2,
              "count": 20171
            },
            {
              "city": "ADA",
              "country": "US",
              "locations": 1,
              "count": 17323
            },
            {
              "city": "ADAIR",
              "country": "US",
              "locations": 1,
              "count": 46779
            },
            {
              "city": "ADAMS",
              "country": "US",
              "locations": 2,
              "count": 33823
            },
            {
              "city": "Adana",
              "country": "TR",
              "locations": 4,
              "count": 108070
            },
            {
              "city": "Addis Ababa",
              "country": "ET",
              "locations": 2,
              "count": 18581
            },
            {
              "city": "Adrian",
              "country": "US",
              "locations": 1,
              "count": 20834
            },
            {
              "city": "Aerodrom Municipality",
              "country": "MK",
              "locations": 1,
              "count": 6534
            },
            {
              "city": "Agra",
              "country": "IN",
              "locations": 1,
              "count": 77117
            },
            {
              "city": "Ahmedabad",
              "country": "IN",
              "locations": 1,
              "count": 45522
            },
            {
              "city": "Ain",
              "country": "FR",
              "locations": 2,
              "count": 7589
            },
            {
              "city": "AIR BREIZH",
              "country": "FR",
              "locations": 16,
              "count": 68951
            },
            {
              "city": "AIR C.O.M. (CALVADOS, ORNE, MANCHE)",
              "country": "FR",
              "locations": 10,
              "count": 42755
            },
            {
              "city": "AIR LANGUEDOC-ROUSSILLON",
              "country": "FR",
              "locations": 22,
              "count": 38120
            },
            {
              "city": "AIR LORRAINE",
              "country": "FR",
              "locations": 44,
              "count": 148508
            },
            {
              "city": "AIR NORMAND",
              "country": "FR",
              "locations": 42,
              "count": 179357
            },
            {
              "city": "AIR PACA",
              "country": "FR",
              "locations": 62,
              "count": 267100
            },
            {
              "city": "AIR PAYS DE LA LOIRE",
              "country": "FR",
              "locations": 30,
              "count": 101324
            },
            {
              "city": "AIR PAYS DE LOIRE",
              "country": "FR",
              "locations": 18,
              "count": 50129
            },
            {
              "city": "AIR RHONE ALPES",
              "country": "FR",
              "locations": 72,
              "count": 278418
            },
            {
              "city": "AIRAQ",
              "country": "FR",
              "locations": 28,
              "count": 120054
            },
            {
              "city": "AIRPARIF",
              "country": "FR",
              "locations": 52,
              "count": 291736
            },
            {
              "city": "Aisne",
              "country": "FR",
              "locations": 3,
              "count": 7178
            },
            {
              "city": "Aisén",
              "country": "CL",
              "locations": 2,
              "count": 69
            },
            {
              "city": "Ajmer",
              "country": "IN",
              "locations": 2,
              "count": 11954
            },
            {
              "city": "Akron",
              "country": "US",
              "locations": 5,
              "count": 74898
            },
            {
              "city": "ALAMEDA",
              "country": "US",
              "locations": 1,
              "count": 38456
            },
            {
              "city": "Albacete",
              "country": "ES",
              "locations": 1,
              "count": 6822
            },
            {
              "city": "Albany-Lebanon",
              "country": "US",
              "locations": 2,
              "count": 14909
            },
            {
              "city": "Albany-Schenectady-Troy",
              "country": "US",
              "locations": 3,
              "count": 12323
            },
            {
              "city": "ALBERTA",
              "country": "CA",
              "locations": 26,
              "count": 162362
            }
        ]
    ] 

    describe('validateSearchInput', () => {
        
    });

    describe('filterCities', () => {

    });
});