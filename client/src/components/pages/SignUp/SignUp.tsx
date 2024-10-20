import {useState} from 'react';

import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import {UserAPI} from '@/interfaces/apiInterfaces';
import {useSignup} from '@/hooks/dataHooks';

type SignUpProps = {
    setRequest: React.Dispatch<React.SetStateAction<string>>;
    setAuthenticatedUser: React.Dispatch<React.SetStateAction<UserAPI | null>>;
};

export default function SignUp({
    setRequest,
    setAuthenticatedUser,
}: SignUpProps) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const {
        mutate: signupUser,
        isError,
        isSuccess,
        error,
    } = useSignup({
        onSuccess: data => {
            setAuthenticatedUser(data);
        },
    });

    const onSignupSubmit = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
        e.preventDefault();
        signupUser({name, username, password});
    };

    return (
        <form className="w-full h-full flex flex-col items-center justify-center gap-2">
            <Input
                type="text"
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
            />
            <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <div className="flex flex-row gap-2">
                <Button
                    type="submit"
                    label="Sign Up"
                    className="px-4"
                    onClick={onSignupSubmit}
                />
            </div>
            <div>
                <p>
                    Already have an account?
                    <span
                        className="p-2 mx-1 rounded-md cursor-pointer hover:bg-emerald-400
                                    hover:text-white transition-all ease-in"
                        onClick={e => {
                            e.preventDefault();
                            setRequest('login');
                        }}
                    >
                        Login
                    </span>
                </p>
                <div>
                    Status:{' '}
                    {isError ? 'Invalid Credentials' + error.message : ''}{' '}
                    {isSuccess ? 'Success!' : ''}
                </div>
            </div>
        </form>
    );
}
