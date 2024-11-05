import React, { useState, useRef } from "react";
import firebase from "../firebase";

function Auth() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationId, setverificationId] = useState("");
  const recaptchaRef = useRef(null);

  const handlesendOtp = () => {
    if (recaptchaRef.current) {
      recaptchaRef.current.innerHTML = '<div id="recaptcha-container"></div>';
    }
    const verfier = new firebase.auth.RecaptchaVerifier("recaptcha-container", {
      size: "invisible",
    });
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, verfier)
      .then((confirmationResult) => {
        setverificationId(confirmationResult.verificationId);
      })
      .catch((error) => {
        console.error("Error Sending OTP", error);
      });
  };
  return (
    <div className="mx-5 mt-5" style={{ justifyContent: "center" }}>
      <h1>Phone OTP Authentication</h1>
      <div ref={recaptchaRef}></div>
      <input
        type="tel"
        placeholder="+919234234332"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button onClick={handlesendOtp}>Send OTP</button>
    </div>
  );
}
export default Auth;
