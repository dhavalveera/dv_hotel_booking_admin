import axios from 'axios';

class AuthApi {
  async login({ email, password }) {
    let payload = { email: email, password: password };

    const response = await axios({
      url: `http://localhost:5000/api/v1/auth/signin`,
      method: 'post',
      data: payload,
      validateStatus: function (status) {
        return status >= 200 && status < 599;
      },
    });

    let data = await response.data;

    return data.payload;
  }

  me(userpayload) {
    console.log(userpayload);
  }
}

export const authApi = new AuthApi();
