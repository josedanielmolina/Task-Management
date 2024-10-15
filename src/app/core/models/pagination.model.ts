
export interface Pagination {
    first: number;
    prev: number | null;
    next: number | null;
    last: number;
    pages: number;
    items: number;
}

export interface PaginatedResponse<T> {
    pagination: Pagination;
    data: T[];
}
