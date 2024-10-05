import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";

const App = () => {
  const [showError, setShowError] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // Expected security code - in a real app, this would come from your backend
  const CORRECT_CODE = 123456;

  const handleSubmit = () => {
    if (inputValue == CORRECT_CODE) {
      setShowError(false); // no error, correct code
    } else {
      setShowError(true); // error, incorrect code
    }
  };

  return (
    <div className='main-verify-bg-sec'>
      <div className='container'>
        <div className='verify-logo-center'>
          <a href='/'>
            <img
              src='https://cdn.shopify.com/s/files/1/0594/2833/9878/files/asdf.png?v=1711650432'
              className='img-fluid d-block mx-auto'
              alt=''
            />
          </a>
        </div>
        <div className='success-good'>
          <img
            src='https://cdn.shopify.com/s/files/1/0594/2833/9878/files/check-good.png?v=1707921109'
            className='img-fluid d-block mx-auto'
            alt=''
          />
        </div>
        <div className='success-content-verify' id='success-content-verify'>
          {/* Render different content based on showError state */}
          {showError ? (
            <h2>Code does not exist. Please avoid fake products.</h2>
          ) : (
            <h2>FOLLOW STEPS</h2>
          )}

          {!showError ? (
            <>
              <div id='qrcode' className='hidden'></div>
              <h5 className='hidden'></h5>
              <button type='button' className='scanned-btn hidden'>
                SCANNED 2 TIMES
              </button>

              <ul className='follow-steps-text'>
                <li>
                  <span>1</span> <p>Open your camera</p>
                </li>
                <li>
                  <span>2</span> <p>Scan the provided code</p>
                </li>
                <li>
                  <span>3</span> <p>Results shown</p>
                </li>
              </ul>
              <div className='follow-form'>
                {/* Input only accepts numbers */}
                <input
                  type='number'
                  id='security_code'
                  name='security_code'
                  placeholder='Please enter correct security code'
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)} // Handle input change
                />
                <button id='submitButton' onClick={handleSubmit}>
                  SUBMIT
                </button>
              </div>
            </>
          ) : (
            <div className='click-to-try'>
              <a href='/' className='text-decoration-none'>
                <h4>CLICK TO TRY AGAIN</h4>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
