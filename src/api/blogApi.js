// blogApi.js
const API_BASE_URL = "https://jsonplaceholder.typicode.com";

export const fetchBlogs = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts`);
    if (!response.ok) {
      throw new Error("Failed to fetch blogs");
    }
    const blogs = await response.json();

    // Thêm các trường bổ sung để phù hợp với ứng dụng
    return blogs.map((blog) => ({
      id: blog.id,
      title: blog.title,
      excerpt: blog.body.substring(0, 100) + "...",
      content: `<p>${blog.body}</p><p>This is additional content for demonstration.</p>`,
      author: `User ${blog.userId}`,
      createdAt: new Date(
        Date.now() - Math.random() * 10000000000
      ).toISOString(),
      image: `https://picsum.photos/800/400?random=${blog.id}`,
    }));
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};

export const fetchBlogById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`);
    if (!response.ok) {
      throw new Error("Blog not found");
    }
    const blog = await response.json();

    // Format data phù hợp với ứng dụng
    return {
      id: blog.id,
      title: blog.title,
      content: `<p>${blog.body}</p><p>This is detailed content for blog ${blog.id}.</p>`,
      author: `User ${blog.userId}`,
      createdAt: new Date(
        Date.now() - Math.random() * 10000000000
      ).toISOString(),
      image: `https://picsum.photos/800/400?random=${blog.id}`,
    };
  } catch (error) {
    console.error(`Error fetching blog with id ${id}:`, error);
    throw error;
  }
};

export const fetchComments = async (blogId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${blogId}/comments`);
    if (!response.ok) {
      throw new Error("Failed to fetch comments");
    }
    const comments = await response.json();

    return comments.map((comment) => ({
      id: comment.id,
      author: comment.name,
      text: comment.body,
      createdAt: new Date(
        Date.now() - Math.random() * 10000000000
      ).toISOString(),
    }));
  } catch (error) {
    console.error(`Error fetching comments for blog ${blogId}:`, error);
    throw error;
  }
};

export const postComment = async (comment) => {
  try {
    // JSONPlaceholder không thực sự lưu dữ liệu nhưng sẽ trả về phản hồi mock
    const response = await fetch(`${API_BASE_URL}/comments`, {
      method: "POST",
      body: JSON.stringify({
        postId: comment.blogId,
        name: comment.author,
        body: comment.text,
        email: "user@example.com", // required by JSONPlaceholder
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to post comment");
    }

    const savedComment = await response.json();

    // Trả về comment với định dạng phù hợp với ứng dụng
    return {
      id: savedComment.id,
      author: savedComment.name,
      text: savedComment.body,
      createdAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error posting comment:", error);
    throw error;
  }
};
