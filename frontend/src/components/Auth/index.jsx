import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import useApi from "@services/useApi";
import logo from "@assets/Lauhgram.png";
import SAuthForm from "./style";

export default function AuthForm() {
  const [formData, setFormData] = useState({
    lastname: "",
    firstname: "",
    pseudo: "",
    email: "",
    password: "",
    passwordBis: "",
    birthday: "",
    hasAccount: true,
  });
  const api = useApi();
  const dispatch = useDispatch();

  const hChange = (evt) => {
    const key = evt.target.name;
    let { value } = evt.target;
    if (evt.target.type === "checkbox") {
      value = evt.target.checked;
    }
    setFormData({ ...formData, [key]: value });
  };

  const hSubmit = (evt) => {
    evt.preventDefault();
    let url = "/auth/signup";
    if (formData.hasAccount) {
      url = `/auth/login`;
    }
    api
      .post(url, formData)
      .then(({ data }) => {
        const { token, users } = data;
        api.defaults.headers.authorization = `Bearer ${token}`;
        dispatch({ type: "LOGIN", load: users });
        toast(`Hi, ${users.firstname} !👿`);
      })
      .catch(() => {
        toast.error("Error in the form");
      });
  };

  return (
    <SAuthForm onSubmit={hSubmit} method="post" enctype="multipart/form-data">
      <div id="wrapper">
        <div className="header">
          <img src={logo} alt="logo" />
        </div>
        <div className="hasAccount">
          <label htmlFor="hasAccount">
            Have account ?
            <input
              name="hasAccount"
              type="checkbox"
              onChange={hChange}
              checked={formData.hasAccount}
            />
          </label>
        </div>
        <div className="containerInput">
          <label htmlFor="email">
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={hChange}
              value={formData.email}
            />
          </label>
          <label htmlFor="password">
            <input
              name="password"
              type="password"
              placeholder="password"
              onChange={hChange}
              value={formData.password}
            />
          </label>
        </div>

        {!formData.hasAccount && (
          <div className="containerInput">
            <label htmlFor="passwordBis">
              <input
                name="passwordBis"
                type="password"
                placeholder="Confirm password"
                onChange={hChange}
                value={formData.passwordBis}
              />
            </label>
            <label htmlFor="lastname">
              <input
                name="lastname"
                type="text"
                placeholder="Lastname"
                onChange={hChange}
                value={formData.lastname}
              />
            </label>
            <label htmlFor="firstname">
              <input
                name="firstname"
                type="text"
                placeholder="Firstname"
                onChange={hChange}
                value={formData.firstname}
              />
            </label>
            <label htmlFor="birthday">
              <input
                id="birthday"
                name="birthday"
                type="date"
                onChange={hChange}
                value={formData.birthday}
              />
            </label>
          </div>
        )}
        <input id="next" type="submit" value="Next" />
      </div>
      <ToastContainer />
    </SAuthForm>
  );
}
