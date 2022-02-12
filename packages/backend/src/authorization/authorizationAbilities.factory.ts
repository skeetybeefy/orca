import { AuthorizationAction } from 'src/authorization/entities/authorizedAction.enum';
import { Group } from 'src/groups/entities/group.entity';
import { Test } from 'src/test/entities/test.entity';
import { Role } from 'src/users/entities/role.enum';
import { User } from 'src/users/entities/user.entity';

import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';

type Subjects = InferSubjects<typeof User | typeof Group | typeof Test> | 'all';

export type AppAbility = Ability<[AuthorizationAction, Subjects]>;

@Injectable()
export class AuthorizationAbilitiesFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[AuthorizationAction, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    switch (user.role) {
      case Role.Doctor:
        can(AuthorizationAction.Manage, Group, { owner: user });
        can(AuthorizationAction.Read, Group, { members: { $in: [user] } });
        can(AuthorizationAction.Read, Test);
        break;
      default:
        cannot(AuthorizationAction.Manage, Test);
    }

    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
