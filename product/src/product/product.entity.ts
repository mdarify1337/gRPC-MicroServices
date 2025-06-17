// product-service/src/product/entities/product.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
// import { User } from './user.entity'; // optional if you need full user info

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  userId: string; // Foreign key

  // Optional relation (if you want eager loading)
  // @ManyToOne(() => User, (user) => user.products)
  // user: User;
}