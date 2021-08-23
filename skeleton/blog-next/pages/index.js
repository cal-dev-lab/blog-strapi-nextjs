import Link from "next/link";

export default function Home({ posts }) {
  return (
    <div>
      {/* Loop over posts and show */}
      {posts &&
        posts.map((post) => (
          <Link href={`/${post.Slug}`} key={post.id}>
            <a>
              <h2>{post.Title}</h2>
              <div>Created by {post.User.username}</div>
            </a>
          </Link>
        ))}
    </div>
  );
}

export async function getStaticProps() {
  // Get posts from API
  const res = await fetch("http://localhost:1337/posts");
  const posts = await res.json();

  return {
    props: { posts },
  };
}
