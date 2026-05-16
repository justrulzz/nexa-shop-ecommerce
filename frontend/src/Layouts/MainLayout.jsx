import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Search from "../components/Modals/Search/Search";
import Dialog from "../components/Modals/Dialog/Dialog";

const MainLayout = ({ children }) => {
  const [isSearchShow, setIsSearchShow] = useState(false);
  // Başlangıçta kapalı (false) yapıyoruz, 2 saniye sonra açılacak
  const [isDialogShow, setIsDialogShow] = useState(false);

  useEffect(() => {
    // Tarayıcı hafızasında "dialog" kaydı var mı kontrol et.
    // Yoksa varsayılan olarak "true" (göster) kabul et.
    const dialogStatus = localStorage.getItem("dialog")
      ? JSON.parse(localStorage.getItem("dialog"))
      : true;

    // Sayfa yüklendikten 2 saniye sonra dialogStatus'un durumuna göre popup'ı aç
    setTimeout(() => {
      setIsDialogShow(dialogStatus);
    }, 2000);
  }, []);

  return (
    <div className="main-layout">
      <Dialog isDialogShow={isDialogShow} setIsDialogShow={setIsDialogShow} />
      <Search isSearchShow={isSearchShow} setIsSearchShow={setIsSearchShow} />
      <Header setIsSearchShow={setIsSearchShow} />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
