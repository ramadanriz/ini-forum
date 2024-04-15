import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Input from '../Elements/Input';
import useInput from '../../hooks/useInput';

const LoginForm = ({ onLogin }) => {
    const [email, setEmail] = useInput('');
    const [password, setPassword] = useInput('');

    return (
        <div className="flex justify-center items-center h-[calc(100vh-7rem)]">
            <div className="card w-96">
                <div className="card-body gap-3">
                    <h2 className="text-center text-xl font-semibold">Login</h2>
                    <Input type='text' placeholder='Email' value={email} onChange={setEmail} />
                    <Input type='password' placeholder='Password' value={password} onChange={setPassword} />
                    <button type="button" className="btn btn-primary" onClick={() => onLogin({ email, password })}>Login</button>
                    <p>Belum punya akun?  <Link className="link font-bold" to="/register">Daftar disini</Link></p>
                </div>
            </div>
        </div>
    )
};

LoginForm.propTypes = {
    onLogin: PropTypes.func.isRequired,
}

export default LoginForm;
