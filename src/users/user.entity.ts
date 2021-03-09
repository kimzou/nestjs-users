import { Directive, Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';

@ObjectType()
// turns to an entity so it can be extended
@Directive('@key(fields: "id")')
export class User {
  @Field((type) => ID)
  id: string;
  name: string;
  email: string;
  // * removed because firebase don't provide access to the password
  // password: string;
  firebaseUid: string;
  role: RoleType;
}

export enum RoleType {
  STUDENT,
  TEACHER,
  ADMIN
}

registerEnumType(RoleType, {
  name: 'RoleType',
  description: 'The role the user have',
  valuesMap: {
    STUDENT: { description: 'Role by default with limited access' },
    TEACHER: { description: 'Teachers can access student\'s grades and created courses' },
    ADMIN: { description: 'Admin has access to all functionalities' }
  }
})