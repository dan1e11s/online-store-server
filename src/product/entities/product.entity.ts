import { IsOptional } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column('text', { array: true, nullable: true })
  images: string[];

  @Column('decimal')
  price: number;

  @Column()
  category: string;

  @Column('decimal')
  sale: number;

  @Column()
  size: string;

  @Column()
  color: string;

  @Column()
  isNew: boolean;

  @CreateDateColumn()
  createdat: Date;

  @UpdateDateColumn()
  updatedat: Date;
}
