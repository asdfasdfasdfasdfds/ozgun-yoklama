import React, { useState, useCallback } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import Footer from "../Components/Footer";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [successVisible, setSuccessVisible] = useState(false);

  const handleRegister = useCallback(
    (e) => {
      e.preventDefault();

      createUserWithEmailAndPassword(auth, email, password)
        .then((auth) => {
          updateProfile(auth.user, { displayName: name });
          showSuccessMessage();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    [name, email, password]
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
      <form className="flex flex-col items-center" onSubmit={handleRegister}>
        <input
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          className="rounded-none  p-4 w-96 shadow-2xl border border-blue-200 appearance-none bg-gray-200 rounded-t-lg t-20"
          placeholder="Ad Soyad"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          className="rounded-none  p-4 w-96 shadow-2xl border border-blue-200 appearance-none bg-gray-200 t-20"
          placeholder="E-Posta"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          className="rounded-none p-4 w-96 shadow-2xl border border-blue-200 appearance-none bg-gray-200 rounded-b-lg"
          placeholder="Şifre"
        />
        <button
          onSubmit={handleRegister}
          className="mx-auto mt-5 rounded-lg p-4 w-96 shadow-2xl border border-blue-200 bg-gray-200 hover:bg-gray-400 "
        >
          Kayıt Ol
        </button>
      </form>
      {successVisible && (
        <div className="absolute top-0 right-0 m-4 bg-green-500 text-white p-4 rounded shadow">
          Kayıt Başarılı
        </div>
      )}
      <Footer />
    </div>
  );
};

export default SignUp;
