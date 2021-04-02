
export enum ROLE_TYPE {
  STUDENT = "STUDENT",
  TEACHER = "TEACHER",
  ADMIN = "ADMIN",
}

export const isStudent = (role: string): boolean => {
  if (role !== ROLE_TYPE.STUDENT) return false;
  return true;
}

export const isTeacher = (role: string): boolean => {
  if (role !== ROLE_TYPE.TEACHER) return false;
  return true;
}

export const isAdmin = (role: string): boolean => {
  if (role !== ROLE_TYPE.ADMIN) return false;
  return true;
}