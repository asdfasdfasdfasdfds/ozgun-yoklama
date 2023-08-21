import React, { useState, useCallback } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import Footer from "../Components/Footer";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successVisible, setSuccessVisible] = useState(false);

  const handleLogin = useCallback(
    (e) => {
      e.preventDefault();
      if (!email || !password) {
        return;
      }

      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          showSuccessMessage();
        })
        .catch((e) => {
          alert("E-Posta veya Şifre yanlış");
        });
    },
    [email, password]
  );

  const showSuccessMessage = () => {
    setSuccessVisible(true);
    setTimeout(() => {
      setSuccessVisible(false);
    }, 2000); // 2 saniye sonra başarı mesajını kapat
  };

  return (
    <div className="flex flex-col w-full mt-20">
      <img
        className="w-64 ml-auto mr-auto"
        src="https://www.linkpicture.com/q/logo_18.jpg"
      />
      <form className="flex flex-col items-center" onSubmit={handleLogin}>
        <input
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          className="rounded-none  p-4 w-96 shadow-2xl border border-blue-200 appearance-none bg-gray-200 rounded-t-lg t-20"
          placeholder="E-Posta"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          className="rounded-none p-4 w-96 shadow-2xl border border-blue-200 appearance-none bg-gray-200 rounded-b-lg"
          placeholder="Şifre"
        />
        <button
          type="submit"
          className="mx-auto mt-5 rounded-none rounded-t-lg p-4 w-96 shadow-2xl border border-blue-200 bg-gray-200 hover:bg-gray-400 "
        >
          Giriş Yap
        </button>
      </form>
      {successVisible && (
        <div className="absolute top-0 right-0 m-4 bg-green-500 text-white p-4 rounded shadow">
          Giriş Başarılı
        </div>
      )}
      <Link
        to="/register"
        className="text-center mx-auto rounded-none rounded-b-lg p-4 w-96 shadow-2xl border border-blue-200 bg-gray-200 hover:bg-gray-400 "
      >
        Kayıt Ol
      </Link>
      <Footer />
    </div>
  );
};

export default SignIn;
