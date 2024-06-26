import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import CommentsForm from './CommentForm';
import Comment from './ThreadCommentItem';
import { asyncCreateComment } from '../../app/states/detailThread/action';

export default function ThreadCommentList({ threadId, comments }) {
  const dispatch = useDispatch();

  const onCreateComment = async ({ content }) => {
    await dispatch(asyncCreateComment({ threadId, content }));
  };

  return (
    <div className="card bg-base-100 mt-4">
      <div className="card-body">
        <CommentsForm onCreateComment={onCreateComment} />
        {comments.map((comment) => (
          <Comment key={comment.id} threadId={threadId} {...comment} />
        ))}
      </div>
    </div>
  );
}

const commentsShape = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.objectOf(PropTypes.string).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
};

ThreadCommentList.propTypes = {
  threadId: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape(commentsShape)).isRequired,
};
