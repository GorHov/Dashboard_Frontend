import { createStore } from "effector";
import { loginFx, logoutFx, updateUserFx,  } from "./effects";

const savedUser = localStorage.getItem("user");

export const $user = createStore<{
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  image?: string;
  birthDate?: string
} | null>(savedUser ? JSON.parse(savedUser) : null)
  .on(loginFx.doneData, (_, user) => ({
    userId: user.userId,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    image: user.image,
    birthDate: user.birthDate
  }))
  .on(updateUserFx.doneData, (_, user) => ({
    userId: user.userId,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    image: user.image,
    birthDate: user.birthDate
  }))
  .reset(logoutFx);

// Watch and sync to localStorage
$user.watch((user) => {
  
  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
  } else {
    localStorage.removeItem("user");
  }
});