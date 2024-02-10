export type User = {

  id: number;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  avatar: string;
  phone: string;
  email: string;

};


export type CreateUser =
  Omit<User, 'avatar' | 'display_name' | 'id'> &
  {
    password: string
  };


export type UserTextData = Omit<User, 'avatar' | 'id'>;


export type ChangePasswordRequest = {
  oldPassword: string;
  newPassword: string;
};


export type UserID = {
  id: number
};
