export interface FinancialFilterDto {
    userId?: string;
    
    month?: number;
    year?: number;

    startDate?: Date;
    endDate?: Date;

    categoryId?: string;
}