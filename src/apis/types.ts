export type PageParams = {
    pageNum: number;
    pageSize: number;
}

export type PageQueryParams = {
    pageNum: number;
    pageSize: number;
    [key: string]: any;
}

export type PageResult<T> = {
    total: number;
    rows: T[];
}