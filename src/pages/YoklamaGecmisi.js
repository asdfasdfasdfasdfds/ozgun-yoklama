import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore, auth } from "../firebase";

const ref = collection(firestore, "yoklama");

const YoklamaGecmisi = () => {
  const [users, setUsers] = useState([]);
  const id = auth.currentUser.uid;

  useEffect(() => {
    const getId = async () => {
      const q = query(ref, where("olusturan", "==", id));
      const data = await getDocs(q);
      setUsers(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    };

    getId();
  }, []);

  return (
    <div className="min-h-screen py-6 sm:py-12">
      <div className="max-w-3xl mx-auto p-6">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-6">
          Geçmiş Yoklamalar
        </h2>
        <div>
          {users.length === 0 ? (
            <div className="bg-gray-200 rounded-md p-6 text-center shadow">
              <p className="text-gray-600 text-xl font-semibold mb-4">
                Yoklama Bulunamadı
              </p>
              <Link
                to="/"
                className="block py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700"
              >
                Anasayfaya Dön
              </Link>
            </div>
          ) : (
            <ul className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {users.map((yoklama, sayi) => (
                <li
                  className="bg-gray-200 rounded-md p-4 shadow font-medium"
                  key={sayi}
                >
                  <p>Yoklama Kodu: {yoklama.kod}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default YoklamaGecmisi;
