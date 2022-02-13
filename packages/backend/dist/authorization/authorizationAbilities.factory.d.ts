import { AuthorizationAction } from 'src/authorization/entities/authorizedAction.enum';
import { Group } from 'src/groups/entities/group.entity';
import { Test } from 'src/test/entities/test.entity';
import { User } from 'src/users/entities/user.entity';
import { Ability, InferSubjects } from '@casl/ability';
declare type Subjects = InferSubjects<typeof User | typeof Group | typeof Test> | 'all';
export declare type AppAbility = Ability<[AuthorizationAction, Subjects]>;
export declare class AuthorizationAbilitiesFactory {
    createForUser(user: User): Ability<[AuthorizationAction, Subjects], import("@casl/ability").MongoQuery<import("@casl/ability/dist/types/types").AnyObject>>;
}
export {};
