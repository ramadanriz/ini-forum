import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const ThreadVote = ({ votesBy, onToggleVoteThread, solidIcon, outlineIcon }) => {
    const { authUser } = useSelector((state) => state);
    return (
        <div className="flex items-center">
            {votesBy.length}
            <button type="button" className="btn btn-ghost btn-sm btn-circle" onClick={onToggleVoteThread}>
            {votesBy.includes(authUser?.id) ? solidIcon : outlineIcon}
            </button>
        </div>
    )
};

ThreadVote.propTypes = {
    votesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    onToggleVoteThread: PropTypes.func.isRequired,
    solidIcon: PropTypes.node.isRequired,
    outlineIcon: PropTypes.node.isRequired,
}

export default ThreadVote;
