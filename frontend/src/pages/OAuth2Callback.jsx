import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const OAuth2Callback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get('token');
        const username = searchParams.get('username');
        const email = searchParams.get('email');
        const fullName = searchParams.get('fullName');
        const id = searchParams.get('id');

        if (token) {
            localStorage.setItem('token', token);
            localStorage.setItem('email', email);
            localStorage.setItem('fullName', fullName);
            localStorage.setItem('username', username);
            localStorage.setItem('userId', id);
            navigate('/dashboard');
        } else {
            navigate('/login?error=google_auth_failed');
        }
    }, []);

    return (
        <div className="min-h-screen bg-[#F6F3EA] flex items-center justify-center">
            <div className="text-center">
                <div className="w-10 h-10 border-4 border-[#FF7900] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-[#5C5C5C]">Completing sign in...</p>
            </div>
        </div>
    );
};

export default OAuth2Callback;