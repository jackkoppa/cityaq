import { CityService } from './city.service';

import { CalculationService } from '../core/calculation/calculation.service';
import { StaticMapsHandlerService } from '../core/handlers/static-maps-handler.service';
import { NamingService } from '../core/naming/naming.service';
import { LatestHandlerService } from '../core/handlers/latest-handler.service';
import { MessagingService } from '../shared/messaging/messaging.service';

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
    latestHandlerService: LatestHandlerService = <LatestHandlerService>{};
    messagingService: MessagingService = <MessagingService>{};

    createService(): CityService {
        return new CityService(
            this.calculationService,
            this.namingService,
            this.staticMapsHandlerService,
            this.latestHandlerService,
            this.messagingService
        )
    }
}