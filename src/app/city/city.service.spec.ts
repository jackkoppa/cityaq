import { CityService } from './city.service';

import { CalculationService } from '../core/calculation/calculation-new.service';
import { StaticMapsHandlerService } from '../core/handlers/static-maps-handler.service';
import { NamingService } from '../core/naming/naming.service';

describe('CityService', () => {
    let cityService: CityService;
    let harness: Harness;
    beforeEach(() => {
        cityService = undefined;
        harness = new Harness();
    });

    describe('getStaticMapsImageFileURL', () => {
        beforeEach(() => cityService = harness.createService());

        it('should be a method (sample test)', () => {
            expect(cityService.getStaticMapsImageFileURL).not.toBe(null);
        });
    });
});

class Harness {
    calculationService: CalculationService = <CalculationService>{};
    namingService: NamingService = <NamingService>{};
    staticMapsHandlerService: StaticMapsHandlerService = <StaticMapsHandlerService>{};

    createService(): CityService {
        return new CityService(
            this.calculationService,
            this.namingService,
            this.staticMapsHandlerService
        )
    }
}