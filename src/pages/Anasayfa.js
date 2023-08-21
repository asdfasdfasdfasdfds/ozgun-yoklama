import React, { useCallback, useState } from "react";
import { auth, firestore } from "../firebase";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";

const Anasayfa = () => {
  const [user, isLoading] = useAuthState(auth);
  const [yoklamaKodu, setYoklamaKodu] = useState("");
  const [successVisible, setSuccessVisible] = useState(false);
  const [hata, setHata] = useState(false);

  const handleSignOut = useCallback(() => {
    signOut(auth);
  }, []);

  const handleYoklamaKatil = async () => {
    const yoklamaRef = collection(firestore, "yoklama");
    const q = query(yoklamaRef, where("kod", "==", yoklamaKodu));

    try {
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("Yoklama kodu bulunamadı.");
        hataMesaj();
        return;
      }

      const doc = querySnapshot.docs[0];

      await updateDoc(doc.ref, {
        katilanlar: arrayUnion(user.displayName),
      });

      console.log("Yoklamaya katılım başarılı!");
      showSuccessMessage();
    } catch (error) {
      console.error("Yoklamaya katılırken hata oluştu:", error);
    }
  };

  const showSuccessMessage = () => {
    setSuccessVisible(true);
    setTimeout(() => {
      setSuccessVisible(false);
    }, 2000); // 2 saniye sonra başarı mesajını kapat
  };

  const hataMesaj = () => {
    setHata(true);
    setTimeout(() => {
      setHata(false);
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center mt-20">
        <div
          className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Yükleniyor...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full mt-10">
      <img
        className="w-64 ml-auto mr-auto"
        src="https://www.linkpicture.com/q/logo_18.jpg"
      />
      <h1 className="text-center text-2xl mb-5">
        Hoş geldin, <p className="font-normal">{user.displayName}</p>
      </h1>
      <form className="flex flex-col items-center">
        <input
          value={yoklamaKodu}
          onChange={(e) => setYoklamaKodu(e.currentTarget.value)}
          className="mx-auto  p-4 w-72 lg:w-96 shadow-2xl border border-blue-200 appearance-none bg-gray-200 rounded-lg t-20"
          placeholder="Yoklama Kodu"
        />
      </form>
      <button
        onClick={handleYoklamaKatil}
        className="rounded-none mx-auto mt-5 rounded-t-lg p-4 w-72 lg:w-96 shadow-2xl border border-blue-200 bg-gray-200 hover:bg-gray-400 "
      >
        Yoklamaya Katıl
      </button>
      {successVisible && (
        <div className="absolute top-0 right-0 m-4 bg-green-500 text-white p-4 rounded shadow">
          Yoklamaya Başarıyla Katıldınız.
        </div>
      )}
      {hata && (
        <div className="absolute top-0 right-0 m-4 bg-red-500 text-white p-4 rounded shadow">
          Yoklama kodu bulunamadı.
        </div>
      )}
      <Link
        to="/yoklama-olustur"
        className="rounded-none mx-auto text-center  p-4 w-72 lg:w-96 shadow-2xl border border-blue-200 bg-gray-200 hover:bg-gray-400 "
      >
        Yoklama Oluştur
      </Link>
      <button
        onClick={handleSignOut}
        className="rounded-none mx-auto rounded-b-lg p-4 w-72 lg:w-96 shadow-2xl border border-blue-200 bg-gray-200 hover:bg-gray-400 "
      >
        Çıkış Yap
      </button>
      <Footer />
    </div>
  );
};

export default Anasayfa;
