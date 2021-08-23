import Link from "next/link";

export default function Post({ post }) {
  return (
    <div>
      <Link href="/">
        <a>Go Home</a>
      </Link>
      <h2>{post.Title}</h2>
    </div>
  );
}

// Tell NextJS how many pages there are.
export async function getStaticPaths() {
  const res = await fetch("http://localhost:1337/posts");
  const posts = await res.json();

  const paths = posts.map((post) => ({
    params: { slug: post.Slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

// For each individual page: Get data for that page.
export async function getStaticProps({ params }) {
  const { slug } = params;

  const res = await fetch(`http://localhost:1337/posts?Slug=${slug}`);
  const data = await res.json();
  const post = data[0];

  return {
    props: { post },
  };
}
