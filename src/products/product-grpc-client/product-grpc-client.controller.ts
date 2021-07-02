import { Body, Controller, Inject, OnModuleInit, Post } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

interface ProductsGrpcService {
  create(data: { name: string; price: number }): Observable<any>;
}

@Controller('product-grpc-clients')
export class ProductGrpcClientController implements OnModuleInit {
  private productsGrpcService: ProductsGrpcService;
  constructor(@Inject('PRODUCT_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.productsGrpcService =
      this.client.getService<ProductsGrpcService>('ProductService');
  }
  @Post()
  create(@Body() data) {
    return this.productsGrpcService.create(data).toPromise();
  }
}
