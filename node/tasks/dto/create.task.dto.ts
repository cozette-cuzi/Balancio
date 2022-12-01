export interface CreateTaskDto {
    title: string;
    details?: string;
    startDate: Date;
    endDate?: Date;
    done: boolean;
    userId: string;
    categoryId: string;
}
