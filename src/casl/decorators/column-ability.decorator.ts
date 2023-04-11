import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import {
  AbilityBuilder,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Ability, ClassAbility, lambdaMatcher } from '../ability';
import { Action } from '../action';
import { ColumnEntity } from '../../database/entities/column.entity';

type Subject = InferSubjects<typeof ColumnEntity>;

export const ColumnAbility = createParamDecorator(
  (_, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const { user } = request;
    return createForUser(user);
  },
);

export function createForUser(user: any) {
  const { can, build } = new AbilityBuilder(ClassAbility);
  can(Action.ReadList, ColumnEntity);
  can(Action.Read, ColumnEntity);
  if (user) {
    can(Action.Create, ColumnEntity);
    can(
      Action.Update,
      ColumnEntity,
      (diary: ColumnEntity) => diary.userId == user.id,
    );
    can(
      Action.Delete,
      ColumnEntity,
      (diary: ColumnEntity) => diary.userId == user.id,
    );
  }

  return new Ability<ColumnEntity>(
    build({
      conditionsMatcher: lambdaMatcher,
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subject>,
    }),
  );
}
