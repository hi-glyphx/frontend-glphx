import React, { useState } from "react";
import OtpInput from "react18-input-otp";

interface OTPInput {
  onOtpChange: (value: string) => void;
}
const OTPInputComponent: React.FC<OTPInput> = ({ onOtpChange }) => {
  const [otp, setOtp] = useState("");
  const handleChange = (newValue: string) => {
    onOtpChange(newValue);
    setOtp(newValue);
  };
  return (
    <div className="otp-input-custom">
      <OtpInput
        value={otp}
        onChange={handleChange}
        numInputs={6}
        separator={<span style={{ width: "8px" }}> </span>}
        inputStyle={{
          border: "1px solid #E7E6F0",
          borderRadius: "16px",
          width: "64px",
          height: "64px",
          fontSize: "16px",
          fontWeight: "700",
          color: "#524587",
          caretColor: "#524587",
        }}
      />
    </div>
  );
};

export default OTPInputComponent;
