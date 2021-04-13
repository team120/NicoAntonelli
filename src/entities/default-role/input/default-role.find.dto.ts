import { Exclude, Expose, Transform } from "class-transformer";
import { Type, TypeOfExpression } from "typescript";

const type = new Map([
  ["undefined", undefined],
  ["true", true],
  ["false", false],
]);

@Exclude()
export class DefaultRoleFindDto {
  @Expose()
  @Transform(({ value }) => { type.get(value) })
  inResearchPack: typeof type;
}
