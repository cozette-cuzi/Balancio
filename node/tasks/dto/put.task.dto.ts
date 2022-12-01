export interface PutTaskDto {
    title: string;
    details?: string;
    startDate: Date;
    endDate?: Date;
    done: boolean;
    userId: string;
    categoryId: string;
}
