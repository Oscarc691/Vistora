import { useState } from "react";
import FormButton from "../../components/buttons/FormButton";
import BackButton from "../../components/buttons/BackButton";
import { useAuth } from "../../contexts/AuthContext";
import { Eye, EyeOff } from "../../components/auth/Icons";

// 🔹 Reusable Password Field
const PasswordField = ({
  id,
  label,
  value,
  onChange,
  show,
  toggle,
  placeholder,
}) => (
  <div className="space-y-2">
    <label htmlFor={id} className="text-sm font-medium text-gray-700">
      {label}
    </label>
    <div className="relative">
      <input
        id={id}
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        autoComplete="off"
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6b1d1d]"
        placeholder={placeholder}
        required
      />
      <button
        type="button"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
        onClick={toggle}
      >
        {show ? <EyeOff /> : <Eye />}
      </button>
    </div>
  </div>
);

function ResetPasswordPage({ navigate = () => {}, goBack = () => {} }) {
  const { updatePassword, loading } = useAuth();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 10) {
      setError("Password must be at least 10 characters long");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setError("Password must contain at least 1 uppercase letter");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const success = await updatePassword(password);
    if (success) {
      setSubmitted(true);
    } else {
      setError("Failed to reset password. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-[900px]:flex-row min-h-[800px] h-screen items-center bg-white w-full">
      <div className="bg-[#800020] w-full max-w-none min-[900px]:max-w-[800px] mb-8 min-[900px]:mb-0 h-[80px] min-[900px]:h-full flex relative">
        <a href="/" className="cursor-pointer ">
          <img
            src="/images/vistora-logo.png"
            alt="Vistora Technologies"
            className="w-full max-w-[200px] h-auto absolute top-0 min-[900px]:top-4 left-2 min-[900px]:left-4 z-20 hover:scale-105 ease-out duration-300"
          />
        </a>

        <div className="bg-[#800020] opacity-0 min-[900px]:opacity-45 absolute top-0 left-0 right-0 bottom-0 "></div>
        <img
          src="/images/doctor-bg-auth.jpg"
          alt="Doctor"
          className="w-full h-auto object-cover object-center hidden min-[900px]:block"
        />
      </div>
      <div className="w-full flex items-center justify-center">
        <div className="relative w-full max-w-md px-6">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-[#6b1d1d]">
              Reset Password
            </h1>
          </div>

          {!submitted ? (
            <>
              <p className="mb-6 text-center text-sm text-gray-500">
                Please update your password. Must be 10 characters long and
                contain at least 1 uppercase.
              </p>

              {error && (
                <div className="rounded-md bg-red-50 p-3 text-sm text-red-500">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <PasswordField
                  id="password"
                  label="New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  show={showPassword}
                  toggle={() => setShowPassword(!showPassword)}
                  placeholder="••••••"
                />

                <PasswordField
                  id="confirmPassword"
                  label="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  show={showConfirmPassword}
                  toggle={() => setShowConfirmPassword(!showConfirmPassword)}
                  placeholder="••••••"
                />

                <FormButton
                  buttonText={loading ? "Updating..." : "Reset Password"}
                />
              </form>
            </>
          ) : (
            <div className="text-center">
              <p className="mb-6 text-sm text-gray-600">
                Your password has been successfully reset. You can now log in
                with your new password.
              </p>
              <button
                onClick={() => navigate("login")}
                className="rounded-md bg-[#6b1d1d] px-4 py-2 text-sm font-medium text-white hover:bg-[#4a0f0f]"
              >
                Go to Login
              </button>
            </div>
          )}

          <BackButton onClick={goBack} />
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
