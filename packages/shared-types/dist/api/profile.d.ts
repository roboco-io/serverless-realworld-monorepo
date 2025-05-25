import { Profile } from '../entities/profile';
/**
 * Profile API response wrapper
 */
export interface ProfileResponse {
    profile: Profile;
}
/**
 * Follow/unfollow response is the same as profile response
 */
export type FollowResponse = ProfileResponse;
//# sourceMappingURL=profile.d.ts.map