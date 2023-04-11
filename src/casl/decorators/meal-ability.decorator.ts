import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import {
  AbilityBuilder,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Ability, ClassAbility, lambdaMatcher } from '../ability';
import { Action } from '../action';
import { MealEntity } from '../../database/entities/meal.entity';

type Subject = InferSubjects<typeof MealEntity>;

export const MealAbility = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const { user } = request;
  return createForUser(user);
});

export function createForUser(user: any) {
  const { can, build } = new AbilityBuilder(ClassAbility);
  if (user) {
    can(Action.ReadList, MealEntity);
    can(Action.Create, MealEntity);
    can(
      Action.Read,
      MealEntity,
      (diary: MealEntity) => diary.userId == user.id,
    );
    can(
      Action.Update,
      MealEntity,
      (diary: MealEntity) => diary.userId == user.id,
    );
    can(
      Action.Delete,
      MealEntity,
      (diary: MealEntity) => diary.userId == user.id,
    );
  }

  return new Ability<MealEntity>(
    build({
      conditionsMatcher: lambdaMatcher,
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subject>,
    }),
  );
}
