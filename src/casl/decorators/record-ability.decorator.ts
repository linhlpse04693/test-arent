import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import {
  AbilityBuilder,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Ability, ClassAbility, lambdaMatcher } from '../ability';
import { Action } from '../action';
import { BodyRecordEntity } from '../../database/entities/body-record.entity';

type Subject = InferSubjects<typeof BodyRecordEntity>;

export const RecordAbility = createParamDecorator(
  (_, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const { user } = request;
    return createForUser(user);
  },
);

export function createForUser(user: any) {
  const { can, build } = new AbilityBuilder(ClassAbility);
  if (user) {
    can(Action.ReadList, BodyRecordEntity);
    can(Action.Create, BodyRecordEntity);
    can(
      Action.Read,
      BodyRecordEntity,
      (diary: BodyRecordEntity) => diary.userId == user.id,
    );
    can(
      Action.Update,
      BodyRecordEntity,
      (diary: BodyRecordEntity) => diary.userId == user.id,
    );
    can(
      Action.Delete,
      BodyRecordEntity,
      (diary: BodyRecordEntity) => diary.userId == user.id,
    );
  }

  return new Ability<BodyRecordEntity>(
    build({
      conditionsMatcher: lambdaMatcher,
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subject>,
    }),
  );
}
