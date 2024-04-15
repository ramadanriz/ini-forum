import PropTypes from 'prop-types';

const ThreadComment = ({ totalComments, icon, onClickCommentButton }) => {
  return (
    <div className="flex items-center">
        {totalComments}
        <button type="button" className="btn btn-ghost btn-sm btn-circle" onClick={onClickCommentButton}>{icon}</button>
    </div>
  )
};

ThreadComment.propTypes = {
    totalComments: PropTypes.number.isRequired,
    icon: PropTypes.node.isRequired,
    onClickCommentButton: PropTypes.func.isRequired
}

export default ThreadComment;
