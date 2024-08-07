import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductImage } from "./product-img.entity";

@Entity()
export class Product {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true,
    })
    title: string;

    @Column('float', {
        default: 0
    })
    price: number;

    @Column({
        type: 'text',
        nullable: true
    })
    description: string;

    @Column('text', {
        unique: true
    })
    slug: string;

    @Column('int', {
        default: 0
    })
    stock: number;

    @Column('text', {
        array: true
    })
    sizes: string[];

    @Column('text')
    gender: string;

    @Column('text', {
        array: true,
        default: []
    })
    tags: string[];

    @Column('boolean', {
        default: true
    })
    visible: boolean;


    @OneToMany(
        () => ProductImage,
        productImage => productImage.product,
        {cascade: true, eager: true},
    )
    images?: ProductImage[]

    @BeforeInsert()
    checkSlugUpdate() {
        if (!this.slug) {
            this.slug = this.title
                .toLowerCase()
                .replaceAll(' ', '_')
                .replaceAll("'", '')
        } else {
            this.slug = this.slug
                .toLowerCase()
                .replaceAll(' ', '_')
                .replaceAll("'", '')
        }
    }

    @BeforeUpdate()
    checkSlug() {
        this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ', '_')
            .replaceAll("'", '')
    }
}
