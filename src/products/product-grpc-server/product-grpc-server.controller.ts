import { ProductsService } from './../products.service';
import { CreateProductDto } from './../dto/create-product.dto';
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Metadata, ServerUnaryCall } from 'grpc';

@Controller()
export class ProductGrpcServerController {
  constructor(private ProductsService: ProductsService) {}
  @GrpcMethod('ProductService', 'Create')
  create(
    data: CreateProductDto,
    metadata: Metadata,
    call: ServerUnaryCall<CreateProductDto>,
  ) {
    return this.ProductsService.create(data);
  }
  @GrpcMethod('ProductService', 'Update')
  update(
    data: { id: number; name: string; price: number },
    metadata: Metadata,
    call: ServerUnaryCall<CreateProductDto>,
  ) {
    const { id, ...rest } = data;
    return this.ProductsService.update(id, rest);
  }

  @GrpcMethod('ProductService', 'FindOne')
  findOne(data: { id: number }) {
    const { id } = data;
    return this.ProductsService.findOne(id);
  }
  @GrpcMethod('ProductService', 'FindAll')
  async findAll(data) {
    const products = await this.ProductsService.findAll();
    return { data: products };
  }

  @GrpcMethod('ProductService', 'Delete')
  remove(data: { id: number }) {
    const { id } = data;
    return this.ProductsService.remove(id);
  }
}
