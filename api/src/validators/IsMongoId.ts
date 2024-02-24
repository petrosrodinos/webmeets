import { Types } from 'mongoose';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'mongo-id', async: false })
export class IsMongoId implements ValidatorConstraintInterface {
  validate(text: any, args: ValidationArguments) {
    const validObjectId = Types.ObjectId.isValid(text);

    return validObjectId;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.value} must be a valid ObjectId`;
  }
}
