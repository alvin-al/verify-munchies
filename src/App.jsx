import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";

const App = () => {
  const [status, setStatus] = useState("initial");
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);

  const handleSubmit = async () => {
    if (inputValue.trim() === "") {
      setStatus("initial");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("https://www.verifymunchies.co/verify.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ code: inputValue }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Server response:", result);

      if (result.success) {
        // Retrieve the submission count after a successful submit
        const count = sessionStorage.getItem(inputValue) || 0;
        const newCount = Number(count) + 1;
        sessionStorage.setItem(inputValue, newCount);
        setSubmissionCount(newCount);

        if (newCount > 2) {
          setStatus("inauthentic");
        } else {
          setStatus("success");
        }
        setInputValue("");
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error during verification:", error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const handleTryAgain = (e) => {
    e.preventDefault();
    setInputValue("");
    setStatus("initial");
  };

  console.log(submissionCount);

  return (
    <div className='main-verify-bg-sec'>
      {loading && (
        <div className='loading-style'>
          <div className=''>
            <img src='https://munchiesfactory.com/cdn/shop/t/26/assets/ajax-loader.gif' />
          </div>
        </div>
      )}
      <div className='container'>
        <div className='verify-logo-center'>
          <a href='/'>
            <img
              src='https://cdn.shopify.com/s/files/1/0594/2833/9878/files/asdf.png?v=1711650432'
              className='img-fluid d-block mx-auto'
              alt='Logo'
            />
          </a>
        </div>

        {status === "error" || status === "inauthentic" ? (
          <div className='error-cloose'>
            <img
              src='https://cdn.shopify.com/s/files/1/0594/2833/9878/files/clossse.png?v=1707924722'
              className='img-fluid d-block mx-auto'
              alt='Error'
            />
          </div>
        ) : (
          <div className='success-good'>
            <img
              src='https://cdn.shopify.com/s/files/1/0594/2833/9878/files/check-good.png?v=1707921109'
              className='img-fluid d-block mx-auto'
              alt='Success'
            />
          </div>
        )}

        <div className='success-content-verify'>
          {status === "initial" && <h2>FOLLOW STEPS</h2>}
          {status === "error" && (
            <h2>
              Code does not exist. Please avoid <br /> fake products.
            </h2>
          )}
          {status === "success" && <h2>SUCCESS! Your product is verified.</h2>}
          {status === "inauthentic" && (
            <div>
              <h2>POSSIBLY INAUTHENTIC</h2>
              <p className='already-text'>
                THIS PRODUCT IS VERIFIED AUTHENTIC. BE AWARE, IF THE CODE IS
                SCANNED MORE THAN TWICE, IT WILL SHOW AS POSSIBLY INAUTHENTIC.
              </p>
              <div className='already'>
                <p>ALREADY SCANNED {submissionCount}</p>
              </div>
            </div>
          )}

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
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <button
                  id='submitButton'
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  SUBMIT
                </button>
              </div>
            </>
          )}

          {status == "initial" ||
            (status !== "inauthentic" && (
              <div className='click-to-try'>
                <a
                  href='#'
                  onClick={handleTryAgain}
                  className='text-decoration-none'
                >
                  <h4>CLICK TO TRY AGAIN</h4>
                </a>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default App;
