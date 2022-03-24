import { plainToClass, ClassConstructor } from 'class-transformer';
import { validateSync } from 'class-validator';
import { BadRequestError } from '../errors/bad-request.error';

const validatorOptions = {
  skipMissingProperties: false,
};

const transformationOptions = {
  enableImplicitConversion: true,
};

export const dtoValidate = <T extends object>(cls: ClassConstructor<T>, plainDto: unknown): T => {
  const dto = plainToClass(cls, plainDto, transformationOptions);
  const errors = validateSync(dto, validatorOptions);

  if (errors.length > 0) {
    throw new BadRequestError(errors.map(({ constraints }) => Object.values(constraints)).join());
  }

  return dto;
};
