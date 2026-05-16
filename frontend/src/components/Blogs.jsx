import BlogItem from "./BlogItem";
import "./Blogs.css";

const Blogs = () => {
  
  const blogData = [
    {
      id: 1,
      img: "img/blogs/blog1.jpg",
      title: "Aliquam hendrit mi metus",
      date: "25 Şubat 2021",
    },
    {
      id: 2,
      img: "img/blogs/blog2.jpg",
      title: "Velit aliquet sagittis id",
      date: "26 Şubat 2021",
    },
    {
      id: 3,
      img: "img/blogs/blog3.jpg",
      title: "Pellentesque dignissim enim",
      date: "27 Şubat 2021",
    },
  ];

  return (
    <section className="blogs">
      <div className="container">
        <div className="section-title">
          <h2>Blogumuzdan</h2>
          <p>Yaz Koleksiyonu Yeni Modern Tasarım</p>
        </div>
        <ul className="blog-list">
          {blogData.map((blog) => (
            <BlogItem key={blog.id} blog={blog} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Blogs;
