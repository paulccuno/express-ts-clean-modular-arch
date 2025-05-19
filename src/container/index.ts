import { container } from 'tsyringe';

import { IndividualProductRepository } from '../repositories/individual-product.repository';
import { IndividualProductsService } from '../services/individual-products.service';

import { CompositeProductRepository } from '../repositories/composite-product.repository';
import { CompositeProductsService } from '../services/composite-products.service';

// Repositorios
container.registerSingleton(IndividualProductRepository);
container.registerSingleton(CompositeProductRepository);

// Servicios
container.registerSingleton(IndividualProductsService);
container.registerSingleton(CompositeProductsService);
