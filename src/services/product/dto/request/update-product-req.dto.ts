import { IsNotEmpty, IsOptional, IsString, Min } from "class-validator";

export class UpdateProductReqDto{
    @IsNotEmpty()
    id!: number;
    
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @Min(0)
    price?: number;

    @IsOptional()
    @IsString()
    description?: string;
}