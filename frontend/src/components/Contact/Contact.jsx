import { useRef } from "react";
import emailjs from "@emailjs/browser";
import "./Contact.css";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    // Parametreler: Service ID, Template ID, form.current, Public Key
    emailjs
      .sendForm(
        "service_uqtxegj",
        "template_5olflrk",
        form.current,
        "t5ojSxIeOFP_02QST"
      )
      .then(
        (result) => {
          console.log(result.text);
          alert(
            "Mesajınız başarıyla gönderildi! Size en kısa sürede dönüş yapacağız."
          );
          e.target.reset(); // Gönderdikten sonra formu temizler
        },
        (error) => {
          console.log(error.text);
          alert("Mesaj gönderilirken bir hata oluştu, lütfen tekrar deneyin.");
        }
      );
  };

  return (
    <section className="contact">
      <div className="contact-top">
        <div className="contact-map">
          <iframe
            src="https://maps.google.com/maps?q=K%C3%BCtahya%20Dumlup%C4%B1nar%20%C3%9Cniversitesi%20M%C3%BChendislik%20Fak%C3%BCltesi&t=&z=14&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="500"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <div className="contact-bottom">
        <div className="container">
          <div className="contact-titles">
            <h4>İletişim</h4>
            <h2>Bize Ulaşın</h2>
            <p>
              Mağazamız, ürünlerimiz veya siparişleriniz hakkında sormak
              istediğiniz her şey için formu doldurarak bizimle iletişime
              geçebilirsiniz. Ekibimiz size en kısa sürede dönüş yapacaktır.
            </p>
          </div>
          <div className="contact-elements">
            <form ref={form} onSubmit={sendEmail} className="contact-form">
              <div className="">
                <label>Adınız<span>*</span></label>
                {/* EmailJS'deki {{name}} ile eşleşmesi için name="name" yaptık */}
                <input type="text" name="name" required />
              </div>
              <div className="">
                <label>E-posta Adresiniz<span>*</span></label>
                {/* EmailJS'deki {{user_email}} ile eşleşmesi için name="user_email" yaptık */}
                <input type="email" name="user_email" required />
              </div>
              <div className="">
                <label>Konu<span>*</span></label>
                {/* EmailJS panelinde {{subject}} kullanıyorsan name="subject" kalabilir */}
                <input type="text" name="subject" required />
              </div>
              <div className="">
                <label>Mesajınız<span>*</span></label>
                {/* EmailJS panelinde {{message}} kullanıyorsan name="message" olmalı */}
                <textarea name="message" required></textarea>
              </div>
              <button type="submit" className="btn btn-sm form-button">
                Mesaj Gönder
              </button>
            </form>

            <div className="contact-info">
              <div className="contact-info-item">
                <div className="contact-info-texts">
                  <strong> Merkez Ofis</strong>
                  <p className="contact-street">
                    Kütahya Dumlupınar Üniversitesi <br />
                    Merkez Kampüs, Mühendislik Fakültesi <br />
                    43100 Kütahya / Türkiye
                  </p>
                  <a href="tel:+908501234567">Telefon: +90 (850) 123 45 67</a>
                  <a href="mailto:info@e-commerce.com">
                    E-posta: info@e-commerce.com
                  </a>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-texts">
                  <strong> Çalışma Saatleri</strong>
                  <p className="contact-date">
                    Pazartesi - Cuma : 09:00 - 17:00
                  </p>
                  <p>Hafta Sonu Kapalı</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;