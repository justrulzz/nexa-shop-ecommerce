import "./BrandItem.css";

// Dışarıdan "brand" verisini (prop) içeri alıyoruz
const BrandItem = ({ brand }) => {
  return (
    <li className="brand-item">
      <a href="#">
        {/* Sabit resim yerine dinamik gelen resmi yazdırıyoruz */}
        <img src={brand.img} alt="" />
      </a>
    </li>
  );
};

export default BrandItem;
