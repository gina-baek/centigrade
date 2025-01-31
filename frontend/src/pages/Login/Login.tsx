import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { STRINGS } from "../../lib/constants/strings";
import { useAuthStore } from "../../store/auth";

export default function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleLogin = async () => {
    const success = await login(username, password);
    console.log("success", success);
    if (success) {
      console.log("Navigating to /browse");
      navigate("/browse");
    } else {
      alert("Login Failed!");
    }
  };

  return (
    <main>
      <section className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 w-80">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2>
            {STRINGS.LOGIN.SIGN_IN_MESSAGE}</h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm text-left">
          <div>
            <label htmlFor="email" className="block">
              {STRINGS.LOGIN.USERNAME_LABEL}
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              autoComplete="username"
              className="block w-full rounded-md px-3 py-1.5 text-gray-900 outline-1 outline-gray-300"
              onChange={(e) => { setUsername(e.target.value) }}
            />
          </div>
          <div>
            <label htmlFor="password" className="block">
              {STRINGS.LOGIN.PASSWORD_LABEL}
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="block w-full rounded-md px-3 py-1.5 text-gray-900 outline-1 outline-gray-300"
              onChange={(e) => { setPassword(e.target.value) }}
            />
          </div>
          <button
            className="flex w-full justify-center rounded-md bg-indigo-600 font-semibold text-white hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleLogin}
          >
            {STRINGS.LOGIN.SIGNIN_BUTTON}
          </button>
        </div>
      </section>
    </main>
  );
}
