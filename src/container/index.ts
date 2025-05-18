import { container } from 'tsyringe';
import { IndividualProductsService } from '../services/individual-products.service';
import { CompositeProductsService } from '../services/composite-products.service';

container.registerSingleton(IndividualProductsService);
container.registerSingleton(CompositeProductsService);
