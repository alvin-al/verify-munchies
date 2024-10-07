import React from 'react';
import { useParams } from 'react-router-dom'; // Import useParams untuk ambil URL params
import VerifyCodeSlug from '../../components/VerifyCodeSlug';

const VerifyPage = () => {
  const { code } = useParams(); // Ambil slug dari URL

  // Fungsi verify
  const verify = () => {
    
  };

  // Panggil fungsi verify saat komponen di-render
  React.useEffect(() => {
    verify();
  }, [code]);

  return (
    <VerifyCodeSlug code={code} />  // Lempar slug code ke VerifyCodeSlug sebagai prop
  );
};

export default VerifyPage;
