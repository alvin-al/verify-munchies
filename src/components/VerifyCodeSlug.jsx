import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useState, useEffect } from "react";

const VerifyCodeSlug = ({ code }) => {
  const [status, setStatus] = useState("initial");
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to handle form submission
  const handleSubmit = async (securityCode) => {
    if (securityCode.trim() === "") {
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
        body: JSON.stringify({ code: securityCode }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Server response:", result);

      if (result.success) {
        setStatus("success");
        setInputValue("");

        // Redirect to /verify without the code in the URL
        window.history.replaceState(null, '', '/verify');
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

  // Automatically submit if the code is provided via slug
  useEffect(() => {
    if (code) {
      setInputValue(code); // Set input value to slug code
      handleSubmit(code);  // Automatically submit the code
    }
  }, [code]);

  const handleTryAgain = (e) => {
    e.preventDefault();
    setInputValue("");
    setStatus("initial");
  };

  return (
    <div className="main-verify-bg-sec">
      {loading && (
        <div className="loading-style">
          <div>
            <img src="https://munchiesfactory.com/cdn/shop/t/26/assets/ajax-loader.gif" />
          </div>
        </div>
      )}
      <div className="container">
        <div className="verify-logo-center">
          <a href="/">
            <img
              src="https://cdn.shopify.com/s/files/1/0594/2833/9878/files/asdf.png?v=1711650432"
              className="img-fluid d-block mx-auto"
              alt="Logo"
            />
          </a>
        </div>

        {status === "error" ? (
          <div className="error-cloose">
            <img
              src="https://cdn.shopify.com/s/files/1/0594/2833/9878/files/clossse.png?v=1707924722"
              className="img-fluid d-block mx-auto"
              alt="Error"
            />
          </div>
        ) : status === "success" ? (
          <div className="success-good">
            <img
              src="https://cdn.shopify.com/s/files/1/0594/2833/9878/files/check-good.png?v=1707921109"
              className="img-fluid d-block mx-auto"
              alt="Success"
            />
          </div>
        ) : null}

        <div className="success-content-verify">
          {status === "initial" && <h2>FOLLOW STEPS</h2>}
          {status === "error" && (
            <h2>
              Code does not exist. Please avoid <br /> fake products.
            </h2>
          )}
          {status === "success" && <h2>SUCCESS! Your product is verified.</h2>}

          {status === "initial" && (
            <>
              <div id="qrcode" className="hidden"></div>
              <ul className="follow-steps-text">
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

              <div className="follow-form">
                <input
                  type="number"
                  id="security_code"
                  name="security_code"
                  placeholder="Please enter correct security code"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <button
                  id="submitButton"
                  onClick={() => handleSubmit(inputValue)}
                  disabled={loading}
                >
                  SUBMIT
                </button>
              </div>
            </>
          )}

          {status !== "initial" && (
            <div className="click-to-try">
              <a href="#" onClick={handleTryAgain} className="text-decoration-none">
                <h4>CLICK TO TRY AGAIN</h4>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyCodeSlug;
