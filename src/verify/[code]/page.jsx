import React from 'react';
import { useParams } from 'react-router-dom';
import VerifyCodeSlug from '../../components/VerifyCodeSlug';

const VerifyPage = () => {
  const { code } = useParams(); 


  React.useEffect(() => {
    verify();
  }, [code]);

  return (
    <VerifyCodeSlug code={code} /> 
  );
};

export default VerifyPage;
