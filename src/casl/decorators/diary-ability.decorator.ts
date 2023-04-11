import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import {
  AbilityBuilder,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Ability, ClassAbility, lambdaMatcher } from '../ability';
import { Action } from '../action';
import { DiaryEntity } from '../../database/entities/diary.entity';

type Subject = InferSubjects<typeof DiaryEntity>;

export const DiaryAbility = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const { user } = request;
  return createForUser(user);
});

export function createForUser(user: any) {
  const { can, build } = new AbilityBuilder(ClassAbility);
  if (user) {
    can(Action.ReadList, DiaryEntity);
    can(Action.Create, DiaryEntity);
    can(
      Action.Read,
      DiaryEntity,
      (diary: DiaryEntity) => diary.userId == user.id,
    );
    can(
      Action.Update,
      DiaryEntity,
      (diary: DiaryEntity) => diary.userId == user.id,
    );
    can(
      Action.Delete,
      DiaryEntity,
      (diary: DiaryEntity) => diary.userId == user.id,
    );
  }

  return new Ability<DiaryEntity>(
    build({
      conditionsMatcher: lambdaMatcher,
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subject>,
    }),
  );
}
