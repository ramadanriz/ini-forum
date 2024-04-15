import { useState } from 'react';
import PropTypes from 'prop-types';
import Parse from 'html-react-parser';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaHashtag } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import { asyncToggleVoteDetailThread } from '../../app/states/detailThread/action';
import { asyncToggleVoteThread } from '../../app/states/threads/action';
import ThreadAction from './ThreadAction';
import Owner from '../Elements/Owner';

export default function ThreadItem({ id, title, body, category, createdAt, owner, totalComments, upVotesBy, downVotesBy, type,
}) {
  const dispatch = useDispatch();
  const { authUser } = useSelector((state) => state);
  const [showAlert, setShowAlert] = useState(false);

  const onToggleVoteThread = (voteType) => {
    if (authUser) {
      if (type === 'threads') {
        dispatch(
          asyncToggleVoteThread({ threadId: id, voteType, userId: authUser.id }),
        );
      } else {
        dispatch(
          asyncToggleVoteDetailThread({
            threadId: id,
            voteType,
            userId: authUser.id,
          }),
        );
      }
    } else {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  };

  return (
    <div className="card bg-base-100">
      <div className="card-body">
        <Owner avatar={owner.avatar} name={owner.name} createdAt={createdAt} />
        <Link to={`/thread/${id}`} className='card-title'>{title}</Link>
        <div className="badge badge-accent gap-2">
          <FaHashtag className="h-3 w-3" /> {category}
        </div>
        <div>{Parse(body)}</div>
        <ThreadAction id={id} totalComments={totalComments} upVotesBy={upVotesBy} downVotesBy={downVotesBy} onToggleVoteThread={onToggleVoteThread} />
        {showAlert && (
        <div role="alert" className="alert alert-warning">
          <FaCircleInfo />
          <span>Login dulu!</span>
        </div>
        )}        
      </div>
    </div>
  );
}

ThreadItem.defaultProps = {
  type: 'thread',
};

ThreadItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  totalComments: PropTypes.number.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  type: PropTypes.string,
};
