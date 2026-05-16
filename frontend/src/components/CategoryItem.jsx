import { Link } from "react-router-dom";
import "./Categories.css";

const CategoryItem = ({ category }) => {
  return (
    <li className="category-item">
      {/* Kutuya tıklanınca yeni sayfamıza yönlendirir */}
      <Link to={`/category/${category.name}`}>
        <img src={category.img} alt={category.name} className="category-image" />
        <span className="category-title">{category.name}</span>
      </Link>
    </li>
  );
};

export default CategoryItem;