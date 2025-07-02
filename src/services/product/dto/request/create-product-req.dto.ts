import { IsDecimal, IsNotEmpty, IsString, Min } from "class-validator";

export class CreateProductReqDto{
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsNotEmpty()
    @Min(0)
    price!: number;

    @IsString()
    @IsNotEmpty()
    description!: string;
}