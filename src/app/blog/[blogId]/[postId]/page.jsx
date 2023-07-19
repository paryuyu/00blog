
import BlogViewer from '@/components/BlogViewer';
import PostButtonGroup from '@/components/PostButtonGroup';
import { env } from '../../../../../next.config';
import CommentSection from '@/components/CommentSection';

//날짜포맷
const dataFormatter = (date) => {
  const dateTime = new Date(date);

  // 지역 설정에 맞는 날짜 형식 객체 생성
  const dateFormat = new Intl.DateTimeFormat('ko', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  // 유효한 날짜인지 확인
  if (isNaN(dateTime.getTime())) {
    return 'Invalid date';
  }

  // 날짜를 형식에 맞게 포맷팅하여 반환
  return dateFormat.format(dateTime);
};

/**포스트 배열 */
async function getPostData(postId) {
  const res = await fetch(env.BASE_URL + '/api/post/' + postId);
  return await res.json();
}

/**코멘트 배열 */
async function getComments(postId) {
  const res = await fetch(`${env.BASE_URL}/api/comment/${postId}`);
  return await res.json();
}

const postDetail = async ({ params }) => {
  const { postId } = params;
  const content = await getPostData(postId);
  const comment = await getComments(postId)

  return (
    <section className="post_detail_page">
      <div className="post_header">
        <span className='post_title'>{content?.title}</span>
        <div className="user_box">
          <div className='user_text_box'>
            <span className="user_info">{content?.creator.email}</span>
            <span className="user_info">{content?.creator.username}</span>
          </div>
        </div>
        <span className="created_at">{content && dataFormatter(content?.createdAt)}</span>
      </div>

      <div className='detail_content_box'>
        <BlogViewer content={content?.content} />
        <PostButtonGroup content={content} />

      </div>
      <CommentSection comment={comment} content={content}/>
    </section>
  )
}

export default postDetail;