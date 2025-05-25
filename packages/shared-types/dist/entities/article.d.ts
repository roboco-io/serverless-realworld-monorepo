import { Profile } from './profile';
/**
 * Article entity interface
 * Represents an article in the system
 */
export interface Article {
    slug: string;
    title: string;
    description: string;
    body: string;
    tagList: string[];
    createdAt: string;
    updatedAt: string;
    favorited: boolean;
    favoritesCount: number;
    author: Profile;
}
/**
 * Article creation parameters
 */
export interface ArticleCreationParams {
    title: string;
    description: string;
    body: string;
    tagList?: string[];
}
/**
 * Article update parameters
 */
export interface ArticleUpdateParams {
    title?: string;
    description?: string;
    body?: string;
    tagList?: string[];
}
//# sourceMappingURL=article.d.ts.map