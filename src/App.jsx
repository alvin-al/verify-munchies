import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";

const App = () => {
  // State untuk 3 kondisi
  const [status, setStatus] = useState("initial");
  const [inputValue, setInputValue] = useState("");

  // Kode yang benar
  const CORRECT_CODE = "123456"; // Tetap string karena input form

  const handleSubmit = () => {
    if (inputValue === CORRECT_CODE) {
      setStatus("success"); // Kode benar
    } else if (inputValue !== "") {
      setStatus("error"); // Kode salah
    } else {
      setStatus("initial"); // Kondisi awal, belum ada input
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
          {/* Conditional Rendering untuk 3 kondisi */}
          {status === "initial" && <h2>FOLLOW STEPS</h2>}
          {status === "error" && (
            <h2>Code does not exist. Please avoid fake products.</h2>
          )}
          {status === "success" && <h2>SUCCESS! Your product is verified.</h2>}

          {/* Jika status masih "initial", tampilkan form */}
          {status === "initial" && (
            <>
              <div id='qrcode' className='hidden'></div>
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
                <input
                  type='number'
                  id='security_code'
                  name='security_code'
                  placeholder='Please enter correct security code'
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)} // Handle perubahan input
                />
                <button id='submitButton' onClick={handleSubmit}>
                  SUBMIT
                </button>
              </div>
            </>
          )}

          {/* Jika status bukan "initial", beri pilihan untuk try again */}
          {status !== "initial" && (
            <div className='click-to-try'>
              <a
                href='/'
                onClick={() => setStatus("initial")}
                className='text-decoration-none'
              >
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
