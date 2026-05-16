import "./BlogItem.css";

const BlogItem = ({ blog }) => {
  return (
    <li className="blog-item">
      <a href="#" className="blog-image">
        <img src={blog.img} alt="" />
      </a>
      <div className="blog-info">
        <div className="blog-info-top">
          <span>{blog.date} </span>-<span>0 Yorum</span>
        </div>
        <div className="blog-info-center">
          <a href="#">{blog.title}</a>
        </div>

        {}
        <div className="blog-info-bottom">
          <a href="#">Devamını oku</a>
        </div>
      </div>
    </li>
  );
};

export default BlogItem;
