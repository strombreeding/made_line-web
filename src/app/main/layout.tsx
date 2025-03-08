import Image from 'next/image';
import style from './layout.module.css';
import EmptyArea from '../../components/EmptyArea';
import SideBar from '../../components/SideBar';
import Header from '@/components/Header';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={style.wrapper}>
      <div className={style.leftArea}>
        <Image src={'/images/main-logo.svg'} alt="" width={153} height={39} />
        <EmptyArea height={16} />
        <SideBar />
      </div>
      <div className={style.rightArea}>
        <Header />
        {children}
      </div>
    </div>
  );
}
