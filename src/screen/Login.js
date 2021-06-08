import { faFacebookSquare, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import AuthLayout from '../components/auth/AuthLayout';
import BottomBox from '../components/auth/BottomBox';
import Button from '../components/auth/Button';
import FormBox from '../components/auth/FormBox';
import Input from '../components/auth/Input';
import FormError from '../components/auth/FormError';
import PageTitle from '../components/PageTitle';
import { Separator } from '../components/shared';
import routes from '../routes';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { logUserIn } from '../apollo';
import { useLocation } from 'react-router';

const FacebookLogin = styled.div`
  span {
    margin-left: 10px;
    color: #385285;
    font-weight: 600;
  }
`;

const Notification = styled.div`
  color: #2ecc71;
`;

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

const Login = () => {
  const location = useLocation();
  const { register, watch, handleSubmit, formState, getValues, setError, clearErrors } = useForm({
    mode: 'onChange', // onChange, onBlur, onChange, onSubmit, onTouched, all
    defaultValues: {
      username: location?.state?.username || '',
      password: location?.state?.password || '',
    },
  });
  const onCompleted = (data) => {
    const {
      login: { ok, error, token },
    } = data;
    if (!ok) {
      setError('result', {
        message: error,
      });
    }
    if (token) {
      logUserIn(token);
    }
    console.log('data: ', data);
  };
  const [login, { loading, data, called }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });

  console.log(watch());
  console.log('loading: ', loading);
  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    const { username, password } = getValues();

    login({
      variables: { username, password },
    });
  };

  const onSubmitInvalid = (data) => {
    console.log('invalid: ', data);
  };

  console.log('formState.isValid:', formState.isValid);
  console.log('formState.errors:', formState.errors);
  return (
    <AuthLayout>
      <PageTitle text="Login" />
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </div>
        <Notification>{location.state?.message}</Notification>
        <form onSubmit={handleSubmit(onSubmitValid, onSubmitInvalid)}>
          <Input
            {...register('username', {
              required: 'username is required',
              minLength: {
                value: 5,
                message: 'Username should be longer than 5 chars',
              },
            })}
            name="username"
            type="text"
            placeholder="username"
            hasError={Boolean(formState.errors?.username?.message)}
          />
          <FormError message={formState.errors?.username?.message} />

          <Input
            {...register('password', { required: 'password is required' })}
            name="password"
            type="password"
            placeholder="Password"
            hasError={Boolean(formState.errors?.password?.message)}
          />
          <FormError message={formState.errors?.password?.message} />

          <Button type="submit" value={loading ? 'Loading...' : 'Log in'} disabled={!formState.isValid || loading} />
          <FormError message={formState.errors?.result?.message} />
        </form>
        <Separator>
          <div></div>
          <span>Or</span>
          <div></div>
        </Separator>
        <FacebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>Log in with Facebook</span>
        </FacebookLogin>
      </FormBox>
      <BottomBox cta="Don't have an account?" link={routes.signUp} linkText="Sign up" />
    </AuthLayout>
  );
};

export default Login;
