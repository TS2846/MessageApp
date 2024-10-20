import {useState} from 'react';

import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import {socket} from '@/socket';

type LoginProps = {
    setRequest: React.Dispatch<React.SetStateAction<string>>;
};

export default function Login({setRequest}: LoginProps) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onLoginSubmit = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
        e.preventDefault();
        socket.emit('user:authenticate', username, password);
    };

    return (
        <form className="w-full h-full flex flex-col items-center justify-center gap-2">
            <Input
                id="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
            />
            <Input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <div className="flex flex-row gap-2">
                <Button
                    type="submit"
                    label="Login"
                    className="px-4"
                    onClick={onLoginSubmit}
                />
            </div>
            <div>
                <p>
                    Don&apos;t have an account?
                    <span
                        className="p-2 mx-1 rounded-md cursor-pointer hover:bg-blue-400
                                    hover:text-white transition-all ease-in"
                        onClick={e => {
                            e.preventDefault();
                            setRequest('signup');
                        }}
                    >
                        Sign up
                    </span>
                </p>
            </div>
        </form>
    );
}
