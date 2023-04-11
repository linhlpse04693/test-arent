import { ForbiddenException } from '@nestjs/common';
import {
  AbilityClass,
  AbilityTuple,
  MatchConditions,
  PureAbility,
} from '@casl/ability';

export class Ability<T> {
  constructor(private readonly ability: AppAbility) {}

  can(action: string, subject: any, fields?: string) {
    if (!this.ability.can(action, subject, fields)) {
      throw new ForbiddenException('Forbidden!');
    }
  }
}

export type AppAbility = PureAbility<AbilityTuple, MatchConditions>;
export const ClassAbility = PureAbility as AbilityClass<AppAbility>;
export const lambdaMatcher = (matchConditions: MatchConditions) =>
  matchConditions;
