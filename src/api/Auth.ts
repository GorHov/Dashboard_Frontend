import axios from 'axios';

export interface IDataRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}

class Auth {

  async register(props: IDataRegister) {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_API}auth/signup`,
        props,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  }

  async signIn(props: ILoginUser) {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_API}auth/login`,
        props,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  }

  async logout() {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_API}auth/logout`,
        {},
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  }

  async updateUser(formData: FormData) {
    debugger
    try {
      const response = await axios.patch(`${process.env.REACT_APP_SERVER_API}auth/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true
      });
      debugger
      return response.data;
    } catch (error) {
      console.error("Failed to update user:", error);
      throw error;
    }
  }
}

export { Auth };
