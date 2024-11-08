import { Button } from '@/components/ui/button.tsx';
import { Link } from 'react-router-dom';

const loginApi = `https://kauth.kakao.com/oauth/authorize`;

// const client_id = import.meta.env.VITE_KAKAO_JAVASCRIPT_API_KEY;
const client_id = import.meta.env.VITE_KAKAO_REST_API_KEY;
const redirect_uri = import.meta.env.VITE_KAKAO_LOGIN_REDIRECT_URI;
const response_type = 'code';

export default function HomePage() {
  const authParam = new URLSearchParams({
    client_id,
    redirect_uri,
    response_type,
  });

  return (
    <>
      <Link to={'/login'}>
        <Button>카카오 로그인</Button>
      </Link>
      <Link to={`${loginApi}?${authParam.toString()}`}>카카오</Link>
    </>
  );
}
