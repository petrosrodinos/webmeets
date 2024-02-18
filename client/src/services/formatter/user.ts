import { User } from "interfaces/user";

export const formatUser = (data: any): User | null => {
  if (typeof data === "string" || !data) {
    return null;
  } else {
    return {
      id: data._id,
      firstname: data.firstname,
      lastname: data.lastname,
      avatar: data.avatar,
      phone: data.phone,
      email: data.email,
    };
  }
};
