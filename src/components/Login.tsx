'use client';

import { useState } from 'react';
import FormInput from './FormInput';
import style from '../styles/Login.module.css';
import EmptyArea from './EmptyArea';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import useLoginHook from '../hooks/useLogin';

export default function Login() {
  const searchParams = useSearchParams();
  const route = useRouter();
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [keepLogin, setkeepLogin] = useState(false);

  const { emailValidation, pwValidation } = useLoginHook();

  const reqUserLogin = async () => {
    try {
      emailValidation(email);
      pwValidation(pw);
      route.replace('/main/users');
      return alert('로그인 성공!');
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert(err);
      }
    }
  };

  console.log(searchParams.get('join'));
  if (searchParams.get('join')) {
    return null;
  }

  return (
    <div className={style.wrapper}>
      <span className={style.title}>로그인</span>

      <span className={style.subTitle}>이메일 계정을 입력해주세요</span>

      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <FormInput label={'이메일'} value={email} setValue={setEmail} />

        <EmptyArea height={20} />

        <FormInput type="password" label={'비밀번호'} value={pw} setValue={setPw} />

        <EmptyArea height={20} />

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <input
            type="checkbox"
            onChange={() => {
              setkeepLogin(!keepLogin);
            }}
          />
          <EmptyArea width={10} />
          <span style={{ fontWeight: 500, fontSize: 16, lineHeight: '24px' }}>로그인 기억하기</span>
        </div>

        <EmptyArea height={20} />

        <button onClick={reqUserLogin} id="commonBtn">
          로그인
        </button>
      </form>

      <EmptyArea height={32} />

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            fontWeight: 400,
            fontSize: 18,
            lineHeight: '27px',
            marginRight: 5,
          }}
        >
          이메일 계정이 없으신가요?
        </span>
        <Link
          style={{
            color: '#95030A',
            fontWeight: 600,
            fontSize: 18,
            lineHeight: '27px',
          }}
          href={'/?join=true'}
        >
          회원가입하기
        </Link>
      </div>
    </div>
  );
}
