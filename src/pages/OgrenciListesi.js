import React, { useState } from "react";
import Footer from "../Components/Footer";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase";

const OgrenciListesi = () => {
  const [yoklamaKodu, setYoklamaKodu] = useState("");
  const [katilanlarListesi, setKatilanlarListesi] = useState([]);
  const [errorMesaji, setErrorMesaji] = useState("");

  const handleYoklamaKoduGirisi = async () => {
    setErrorMesaji("");

    if (!yoklamaKodu) {
      setErrorMesaji("Yoklama kodunu boş bırakmayınız.");
      setKatilanlarListesi([]);
      return;
    }

    // Firestore referansı oluşturun
    const yoklamalarRef = collection(firestore, "yoklama");
    const q = query(yoklamalarRef, where("kod", "==", yoklamaKodu));

    try {
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setErrorMesaji("Yoklama kodu bulunamadı.");
        setKatilanlarListesi([]);
        return;
      }

      const doc = querySnapshot.docs[0].data();
      const katilanlar = doc.katilanlar || [];

      if (katilanlar.length === 0) {
        setErrorMesaji("Yoklamaya kimse katılmamış.");
      } else {
        setErrorMesaji("");
      }

      setKatilanlarListesi(katilanlar);
    } catch (error) {
      console.error("Verileri çekerken hata oluştu:", error);
    }
  };

  return (
    <div className="flex flex-col w-full mt-5">
      <img
        className="w-64 ml-auto mr-auto"
        src="https://www.linkpicture.com/q/logo_18.jpg"
        alt="Logo"
      />
      <div className="mx-auto w-72 lg:w-96">
        <p className="text-center mb-4">
          Öğrenci Listesini Görmek İstediğiniz Yoklamanın Kodunu Giriniz
        </p>
        <input
          className="p-4 w-full shadow-2xl border border-blue-200 appearance-none bg-gray-200 rounded-none rounded-t-lg"
          placeholder="Yoklama Kodu"
          value={yoklamaKodu}
          onChange={(e) => setYoklamaKodu(e.target.value)}
          required
        />
        <button
          className="rounded-none rounded-b-lg mx-auto p-4 w-72 lg:w-96 shadow-2xl border border-blue-200 bg-gray-200 hover:bg-gray-400 "
          onClick={handleYoklamaKoduGirisi}
        >
          Göster
        </button>
        {errorMesaji && <p className="text-red-600 mt-2">{errorMesaji}</p>}
        {katilanlarListesi.length > 0 ? (
          <ul className="mt-4">
            {katilanlarListesi.map((katilan, index) => (
              <li key={index} className="p-2 bg-gray-100 rounded-lg mb-2">
                {katilan}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <Footer />
    </div>
  );
};

export default OgrenciListesi;
