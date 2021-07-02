import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'Products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  price: number;
}
