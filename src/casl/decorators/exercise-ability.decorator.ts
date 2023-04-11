import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import {
  AbilityBuilder,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Ability, ClassAbility, lambdaMatcher } from '../ability';
import { Action } from '../action';
import { ExerciseEntity } from '../../database/entities/exercise.entity';

type Subject = InferSubjects<typeof ExerciseEntity>;

export const ExerciseAbility = createParamDecorator(
  (_, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const { user } = request;
    return createForUser(user);
  },
);

export function createForUser(user: any) {
  const { can, build } = new AbilityBuilder(ClassAbility);
  if (user) {
    can(Action.ReadList, ExerciseEntity);
    can(Action.Create, ExerciseEntity);
    can(
      Action.Read,
      ExerciseEntity,
      (exercise: ExerciseEntity) => exercise.userId == user.id,
    );
    can(
      Action.Update,
      ExerciseEntity,
      (exercise: ExerciseEntity) => exercise.userId == user.id,
    );
    can(
      Action.Delete,
      ExerciseEntity,
      (exercise: ExerciseEntity) => exercise.userId == user.id,
    );
  }

  return new Ability<ExerciseEntity>(
    build({
      conditionsMatcher: lambdaMatcher,
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subject>,
    }),
  );
}
