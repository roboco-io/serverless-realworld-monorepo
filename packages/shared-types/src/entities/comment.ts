import { Profile } from './profile';

/**
 * Comment entity interface
 * Represents a comment on an article
 */
export interface Comment {
  id: string;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: Profile;
}

/**
 * Comment creation parameters
 */
export interface CommentCreationParams {
  body: string;
}
