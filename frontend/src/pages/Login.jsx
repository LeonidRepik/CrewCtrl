import { Link, Form, redirect, useNavigation } from "react-router-dom";
import { Logo, FormRowInput } from "../components";
import axios from "axios";
import { toast } from "react-toastify";

export const loginAction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await axios.post(
      "https://crewctrl-29196d49230a.herokuapp.com/api/v1/users/login",
      data
    );
    toast.success("Login successful");
    return redirect("/dashboard/main");
  } catch (error) {
    toast.error("Login failed");
    return error;
  }
};

const Login = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <main className="register-page">
      <Form method="post" className="form">
        <Logo />

        <h3>Login</h3>

        <FormRowInput
          type="email"
          name="email"
          defaultValue="johndoe@gmail.com"
        />

        <FormRowInput
          type="password"
          name="password"
          defaultValue="password123"
        />

        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={isSubmitting}
        >
          {isSubmitting ? "logging in..." : "login"}
        </button>

        <p>
          Not a member?{" "}
          <Link to="/register" className="link">
            Register
          </Link>
        </p>
      </Form>
    </main>
  );
};
export default Login;
