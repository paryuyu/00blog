import WriteButton from '@/components/WriteButton';
import axios from 'axios';
import { env } from '../../../../next.config';


async function blogInfoGet(blogId) {
  try {
    const response = await axios.get(env.BASE_URL + '/api/blog?blogId=' + blogId);
    if (response.status === 200) {
      return await response.data;
    }

  } catch (error) {
    return error;
  }
}


const layout = async ({ children, params }) => {
  const { blogId } = params;
  const { blog } = await blogInfoGet(blogId);

  return (
    <div>
      <div className='blog-header'>
        <a href={env.BASE_URL + '/blog' + blog?.blogAddress} className='blog-name'  >
          {blog?.blogName}
        </a>
        <WriteButton blog={blog} />
      </div>
      <div>{children}</div>
    </div>
  )
}

export default layout;