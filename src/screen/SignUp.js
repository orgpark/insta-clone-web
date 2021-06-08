import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import AuthLayout from '../components/auth/AuthLayout';
import BottomBox from '../components/auth/BottomBox';
import Button from '../components/auth/Button';
import FormBox from '../components/auth/FormBox';
import Input from '../components/auth/Input';
import FormError from '../components/auth/FormError';
import PageTitle from '../components/PageTitle';
import { useForm } from 'react-hook-form';
import { FatLink } from '../components/shared';
import routes from '../routes';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router';

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Subtitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
`;

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount($firstName: String!, $lastName: String, $email: String!, $username: String!, $password: String!) {
    createAccount(firstName: $firstName, lastName: $lastName, email: $email, username: $username, password: $password) {
      ok
      error
    }
  }
`;

const SignUp = () => {
  const history = useHistory();
  const { register, watch, handleSubmit, formState, getValues, setError, clearErrors } = useForm({
    mode: 'onChange', // onChange, onBlur, onChange, onSubmit, onTouched, all
  });

  const onCompleted = (data) => {
    const { username, password } = getValues();
    const {
      createAccount: { ok, error },
    } = data;
    if (!ok) {
      setError('result', {
        message: error,
      });
    }

    history.push(routes.home, { message: 'Account created. Please log in.', username, password });
  };
  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    createAccount({
      variables: { ...data },
    });
  };
  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });

  return (
    <AuthLayout>
      <PageTitle text="Sign up" />
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
          <Subtitle>Sign up to see photos and videos from your friends.</Subtitle>
        </HeaderContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input {...register('firstName', { required: 'first name is required' })} type="text" placeholder="First name" />
          <Input {...register('lastName')} type="text" placeholder="Last name" />
          <Input {...register('email', { required: 'email is required' })} type="text" placeholder="Email" />
          <Input {...register('username', { required: 'username is required' })} type="text" placeholder="Username" />
          <Input {...register('password', { required: 'password is required' })} type="password" placeholder="Password" />
          <Button type="submit" value={loading ? 'Loading...' : 'Sign up'} disabled={!formState.isValid || loading} />
          <FormError message={formState.errors?.result?.message} />
        </form>
      </FormBox>
      <BottomBox cta="Have an account?" link={routes.home} linkText="Log in" />
    </AuthLayout>
  );
};

export default SignUp;
