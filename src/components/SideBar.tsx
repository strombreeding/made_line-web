'use client';

import Image from 'next/image';
import EmptyArea from './EmptyArea';
import SidebarItem from './SidebarItem';
import style from '../styles/SideBar.module.css';
import { useState } from 'react';
import { SidebarItemType } from '../types';

export default function SideBar() {
  const [checked, setChecked] = useState<SidebarItemType>('users');

  return (
    <div className={style.wrapper}>
      {/* 로그인된 사람 상태 인터페이스 */}
      <div className={style.loginUserInfo}>
        <div className={style.loginUserInfoImgWrap}>
          <Image src={'/images/skeleton-user.svg'} alt="" width={32} height={32} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontWeight: 700, fontSize: 16 }}>김 메 라</span>
          <EmptyArea height={2} />
          <span style={{ color: '#697077', fontSize: 12, fontWeight: 400 }}>
            의정부 가능점 강사
          </span>
        </div>
      </div>
      <EmptyArea height={16} />

      {/* 사이드 바 메뉴 목록 */}
      <div className={style.sideBarMenuList}>
        <SidebarItem
          checked={checked}
          setChecked={setChecked}
          text={'회원관리'}
          imgName={'users'}
        />
        <SidebarItem
          checked={checked}
          setChecked={setChecked}
          text={'예약관리'}
          imgName={'reservation'}
        />
        <SidebarItem checked={checked} setChecked={setChecked} text={'손익관리'} imgName={'pnl'} />
        <SidebarItem
          checked={checked}
          setChecked={setChecked}
          text={'AI 알림톡'}
          imgName={'bell'}
        />
      </div>
    </div>
  );
}
