import "./Dialog.css";

const Dialog = ({ isDialogShow, setIsDialogShow }) => {
  // Checkbox işaretlendiğinde çalışacak fonksiyon
  const handleCloseDialog = (event) => {
    const checked = event.target.checked;
    // Eğer kutu işaretlendiyse, bir dahaki sefere göstermemek için false kaydediyoruz
    localStorage.setItem("dialog", JSON.stringify(!checked));
  };

  return (
    <div className={`modal-dialog ${isDialogShow ? "show" : ""}`}>
      <div
        className="modal-overlay"
        onClick={() => setIsDialogShow(false)}
      ></div>

      <div className="modal-content">
        <button className="modal-close" onClick={() => setIsDialogShow(false)}>
          <i className="bi bi-x"></i>
        </button>
        <div className="modal-image">
          <img src="img/modal-dialog.jpg" alt="" />
        </div>
        <div className="popup-wrapper">
          <div className="popup-content">
            <div className="popup-title">
              <h3>NEWSLETTER</h3>
            </div>
            <p className="popup-text">
              Sign up to our newsletter and get exclusive deals you won't find
              any where else straight to your inbox!
            </p>
            <form className="popup-form">
              <input type="text" placeholder="Enter Email Address Here" />
              <button className="btn btn-primary">SUBSCRIBE</button>
              <label>
                {/* Onay kutusuna tıklandığında (onChange) fonksiyonumuzu çalıştırıyoruz */}
                <input type="checkbox" onChange={handleCloseDialog} />
                <span>Don't show this popup again</span>
              </label>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
