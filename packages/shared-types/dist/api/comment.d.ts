import { Comment } from '../entities/comment';
/**
 * Comment API response wrapper
 */
export interface CommentResponse {
    comment: Comment;
}
/**
 * Multiple comments API response wrapper
 */
export interface CommentsResponse {
    comments: Comment[];
}
/**
 * Comment creation request
 */
export interface CommentCreationRequest {
    comment: {
        body: string;
    };
}
//# sourceMappingURL=comment.d.ts.map