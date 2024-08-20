import { Link, Form, redirect, useNavigation } from 'react-router-dom';
import { Logo, FormRowInput } from '../components';
import axios from 'axios';
import { toast } from 'react-toastify';

export const registerAction = async ({ request }) => {
  const formData = await request.formData();

  // Turning array of arrays into an object
  const data = Object.fromEntries(formData);

  // console.log(data);

  try {
    // Making a server request
    await axios.post('/api/v1/users/signup', data);

    // Success Toast:
    toast.success('Registration successful');

    // If everything is OK, navigate to login
    // redirect method should only be used in the action!
    return redirect('/login');
  } catch (error) {
    // Error Toast:
    toast.error('Registration failed');
    console.error(error);
    return error;
  }
};

const Register = () => {
  // Navigation State
  const navigation = useNavigation();

  // console.log(navigation);
  const isSubmitting = navigation.state === 'submitting';

  return (
    <main className="register-page">
      <Form method="post" className="form">
        <Logo />

        <h3>Register</h3>

        <FormRowInput type="text" name="name" defaultValue="john" />

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

        <FormRowInput
          type="password"
          name="passwordConfirmation"
          defaultValue="password123"
        />

        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'registering...' : 'register'}
        </button>

        <p>
          Already have an account?{' '}
          <Link to="/login" className="link">
            Login
          </Link>
        </p>
      </Form>
    </main>
  );
};
export default Register;
