import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useParams, useNavigate } from "react-router-dom";

const App = () => {
  const [status, setStatus] = useState("initial");
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);
  const { code } = useParams();
  const hasSubmitted = useRef(false);
  const navigate = useNavigate();

  const handleSubmit = async (codeToSubmit) => {
    if (!codeToSubmit || codeToSubmit.trim() === "") {
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
        body: JSON.stringify({ code: codeToSubmit }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (result.success) {
        const newCount = result.scanCount || 0;
        setSubmissionCount(newCount);

        if (newCount > 2) {
          setStatus("inauthentic");
        } else {
          setStatus("success");
        }
        setInputValue(""); // Reset input setelah submit

        // Clean up URL after successful submission, but only if we came from a direct code URL
        if (code) {
          // Use replaceState to update URL without navigation
          window.history.replaceState(null, "", "/verify");
        }
      } else {
        setStatus("error");
        if (code) {
          window.history.replaceState(null, "", "/verify");
        }
      }
    } catch (error) {
      console.error("Error during verification:", error);
      setStatus("error");
      if (code) {
        window.history.replaceState(null, "", "/verify");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (code && !hasSubmitted.current) {
      hasSubmitted.current = true;
      setInputValue(code);
      handleSubmit(code);
    }
  }, [code]); // Removed navigate from dependencies

  const handleManualSubmit = () => {
    handleSubmit(inputValue);
  };

  const handleTryAgain = (e) => {
    e.preventDefault();
    setInputValue("");
    setStatus("initial");
    hasSubmitted.current = false;
    // Update URL without causing a refresh
    if (code) {
      window.history.replaceState(null, "", "/verify");
    }
  };

  return (
    <div className='main-verify-bg-sec'>
      {loading && (
        <div className='loading-style'>
          <div className=''>
            <img
              src='https://munchiesfactory.com/cdn/shop/t/26/assets/ajax-loader.gif'
              alt='Loading'
            />
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
                  onClick={handleManualSubmit}
                  disabled={loading}
                >
                  SUBMIT
                </button>
              </div>
            </>
          )}

          {status === "initial" ||
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
