import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { HiOutlineChatBubbleLeftRight, HiOutlineHandThumbDown, HiOutlineHandThumbUp, HiMiniHandThumbDown, HiMiniHandThumbUp } from "react-icons/hi2";
import ThreadVote from '../Elements/ThreadVote';
import ThreadComment from '../Elements/ThreadComment';

export default function ThreadAction({ id, totalComments, upVotesBy, downVotesBy, onToggleVoteThread }) {
  const { authUser } = useSelector((state) => state);
  const navigate = useNavigate();

  return (
    <div className="card-actions justify-end">
      <ThreadVote votesBy={upVotesBy} onToggleVoteThread={() => onToggleVoteThread(upVotesBy.includes(authUser?.id) ? 0 : 1)} solidIcon=<HiMiniHandThumbUp className="h-5 w-5" /> outlineIcon=<HiOutlineHandThumbUp className="h-5 w-5" /> />
      <ThreadVote votesBy={downVotesBy} onToggleVoteThread={() => onToggleVoteThread(downVotesBy.includes(authUser?.id) ? 0 : -1)} solidIcon=<HiMiniHandThumbDown className="h-5 w-5" /> outlineIcon=<HiOutlineHandThumbDown className="h-5 w-5" /> />
      <ThreadComment totalComments={totalComments} onClickCommentButton={() => navigate(`/thread/${id}#comments`)} icon=<HiOutlineChatBubbleLeftRight className="h-5 w-5" /> />
    </div>
  );
}

ThreadAction.propTypes = {
  id: PropTypes.string.isRequired,
  totalComments: PropTypes.number.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  onToggleVoteThread: PropTypes.func.isRequired,
};
