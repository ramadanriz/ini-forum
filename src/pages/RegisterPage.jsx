import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncRegisterUser } from '../app/states/users/action';
import RegisterForm from '../components/Fragments/RegisterForm';

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onRegister = async ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ name, email, password })).then(
      ({ status }) => {
        if (status === 'success') navigate('/login');
      },
    );
  };

  return (
    <RegisterForm onRegister={onRegister} />
  );
}
