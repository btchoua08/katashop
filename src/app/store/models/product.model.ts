import { Rating } from "src/app/core/models/rating.model";

export class Product{
    id!: number;
    title!:string;
    price!:number;
    description!:string;
    category!:string;
    image!:string;
    rating!:Rating
}