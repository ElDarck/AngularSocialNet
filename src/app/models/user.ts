import { Role } from './role'

export class User {
  [x: string]: any;
  id!: string;
  username!: string;
  email!: string;
  password!: string;
  firstName!: string;
  lastName!: string;
  birthDate!: string;
  address!: string;
  phoneNumber!: string;
  school!: string;
  universityFirst!: string;
  facultyFirst!: string;
  courseFirst!: string
  studyFirstDateFrom!: string;
  studyFirstDateTo!: string;
  universitySecond!: string;
  facultySecond!: string;
  courseSecond!: string;
  studySecondDateFrom!: string;
  studySecondDateTo!: string;
  universityThird!: string;
  facultyThird!: string;
  courseThird!: string;
  studyThirdDateFrom!: string;
  studyThirdDateTo!: string;
  role!: Role;
}
