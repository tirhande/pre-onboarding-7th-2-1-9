import Head from 'next/head';
import React from 'react';
import Header from './Header';
import { MainLayout } from './styles';

const Layout = ({ content, isDetail }) => {
  return (
    <>
      <Head><title>B2C 차량대여 서비스</title></Head>
      <Header isDetail={isDetail} />
      <MainLayout>{content}</MainLayout>
    </>
  );
};
export default Layout;
