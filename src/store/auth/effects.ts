import { createEffect } from "effector";
import { Auth } from "../../api/Auth";

const { register, signIn, logout, updateUser } = new Auth();

// Effect for logging in
export const loginFx = createEffect(
  async ({ email, password }: { email: string; password: string }) => {
    const response = await signIn({ email, password });
    return response.data;
  }
);

// Effect for logging out
export const logoutFx = createEffect(async () => {
  await logout();

  localStorage.removeItem("user");
});

// Effect for registering a new user
export const registerFx = createEffect(
  async ({
    firstName,
    lastName,
    email,
    password,
  }: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    const response = await register({ firstName, lastName, email, password });
    return response;
  }
);

// Effect for updating user details
export const updateUserFx = createEffect<
  {
    firstName?: string;
    lastName?: string;
    email?: string;
    birthDate?: string;
    image?: File | string;
  },
  any,
  Error
>(async ({ firstName, lastName, email, birthDate, image }) => {
  const formData = new FormData();

  if (firstName) formData.append("firstName", firstName);
  if (lastName) formData.append("lastName", lastName);
  if (email) formData.append("email", email);
  if (birthDate) formData.append("birthDate", birthDate);
  if (image && typeof image !== "string") {
    formData.append("image", image);
  }

  try {
    const response = await updateUser(formData);
    return response.data;
  } catch (error) {
    console.error("Failed to update user:", error);
    throw error;
  }
});
