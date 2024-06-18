import React from 'react';
import Lottie from "lottie-react";
import Success from '@/assets/lottie/success.json';

function FormSubmit() {
    console.log(Success);
  return (
    <div className='flex gap-2 items-center'>
        <Lottie animationData={Success}/>
      <h5>Thank you for your application! We have received your information and will review it shortly. If your qualifications match our requirements, we will contact you within the next few days. We appreciate your interest in joining our team.</h5>
    </div>
  )
}

export default FormSubmit
