
export async function getAllPosts() {
  const res = await fetch('/api/post');
  const data = await res.json();
  return data;
}

export async function getPost(postId) {
  const res = await fetch('/api/post/' + postId);
  const post = await res.json();
  return post;

}