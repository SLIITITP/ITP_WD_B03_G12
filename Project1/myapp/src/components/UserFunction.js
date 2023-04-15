import axios from "axios";

export const register = newUser => {
    return axios
      .post("users/register", {
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        password: newUser.password,
        privilege: "USER"
      })
      .then(res => {
        if (res.data && res.data.registered) {
          window.alert("This email is already registered. Please log in or use a different email.");
        } else {
          console.log("Registered Successfully. here1");
          window.alert("Registered Successfully. here1");
          return { registered: true };
        }
      })
      .catch(err => {
        if (err.response && err.response.data && err.response.data.error) {
          window.alert(err.response.data.error);
        } else {
          console.log("Error:", err);
        }
      });
  };

export const login = user => {
    return axios 
    .post('users/login', {
        email: user.email,
        password: user.password
    })
    .then(res => {
        if (res.data.success) {
            localStorage.setItem('usertoken', res.data.token);
        }
        return res.data;       
    })
    .catch(err => {     
        console.log(err)
    })


}


