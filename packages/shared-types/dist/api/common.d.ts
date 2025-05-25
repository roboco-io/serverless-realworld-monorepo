/**
 * Error response interface
 * Used for API error responses
 */
export interface ErrorResponse {
    errors: {
        [key: string]: string[];
    };
}
/**
 * Pagination parameters
 * Used for paginated API requests
 */
export interface PaginationParams {
    limit?: number;
    offset?: number;
}
/**
 * Generic API response wrapper
 * Used for wrapping any response data
 */
export interface ApiResponse<T> {
    data: T;
    status: number;
    message?: string;
}
//# sourceMappingURL=common.d.ts.map