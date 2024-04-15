import PropTypes from 'prop-types';
import Parser from 'html-react-parser';
import { useDispatch, useSelector } from 'react-redux';
import { HiOutlineHandThumbDown, HiOutlineHandThumbUp, HiMiniHandThumbDown, HiMiniHandThumbUp } from "react-icons/hi2";
import { asyncToggleVoteCommentThread } from '../../app/states/detailThread/action';
import Owner from '../Elements/Owner';
import ThreadVote from '../Elements/ThreadVote';

export default function ThreadCommentItem({ threadId, id, owner, content, upVotesBy, downVotesBy, createdAt }) {
  const dispatch = useDispatch();
  const { authUser } = useSelector((state) => state);

  const onToggleVoteComment = ({ voteType, commentId }) => {
    if (authUser) {
      dispatch(
        asyncToggleVoteCommentThread({ threadId, voteType, userId: authUser.id, commentId })
      );
    } else {
      alert('Please login first');
    }
  };

  return (
    <div key={id} className="card bg-base-200 mt-2">
      <div className="card-body">
        <Owner avatar={owner.avatar} name={owner.name} createdAt={createdAt} />
        <div>{Parser(content)}</div>
        <div className="card-actions">
          <ThreadVote votesBy={upVotesBy} onToggleVoteThread={() => onToggleVoteComment({ voteType: upVotesBy.includes(authUser?.id) ? 0 : 1, commentId: id })} solidIcon=<HiMiniHandThumbUp className="h-5 w-5" /> outlineIcon=<HiOutlineHandThumbUp className="h-5 w-5" /> />
          <ThreadVote votesBy={downVotesBy} onToggleVoteThread={() => onToggleVoteComment({ voteType: downVotesBy.includes(authUser?.id) ? 0 : -1, commentId: id })} solidIcon=<HiMiniHandThumbDown className="h-5 w-5" /> outlineIcon=<HiOutlineHandThumbDown className="h-5 w-5" /> />
        </div>
      </div>
    </div>
  );
}

ThreadCommentItem.propTypes = {
  threadId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.objectOf(PropTypes.string).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
};
