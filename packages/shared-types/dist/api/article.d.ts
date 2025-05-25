import { Article } from '../entities/article';
/**
 * Article API response wrapper
 */
export interface ArticleResponse {
    article: Article;
}
/**
 * Multiple articles API response wrapper
 */
export interface ArticlesResponse {
    articles: Article[];
    articlesCount: number;
}
/**
 * Article creation request
 */
export interface ArticleCreationRequest {
    article: {
        title: string;
        description: string;
        body: string;
        tagList?: string[];
    };
}
/**
 * Article update request
 */
export interface ArticleUpdateRequest {
    article: {
        title?: string;
        description?: string;
        body?: string;
        tagList?: string[];
    };
}
/**
 * Article query parameters
 */
export interface ArticleQueryParams {
    tag?: string;
    author?: string;
    favorited?: string;
    limit?: number;
    offset?: number;
}
/**
 * Feed query parameters
 */
export interface FeedQueryParams {
    limit?: number;
    offset?: number;
}
//# sourceMappingURL=article.d.ts.map