import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncLogin } from '../app/states/authUser/action';
import LoginForm from '../components/Fragments/LoginForm';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = ({ email, password }) => {
    dispatch(asyncLogin({ email, password })).then(({ status }) => {
      if (status === 'success') navigate('/');
    });
  };

  return (
    <LoginForm onLogin={onLogin} />
  );
}
