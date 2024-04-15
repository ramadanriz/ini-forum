import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import ThreadItem from './ThreadItem';

export default function ThreadList({ threads }) {
  const { users } = useSelector((state) => state);

  return (
    <>
      <h1 className="font-bold text-xl">Threads</h1>
      {threads ? (
        <article className="grid grid-cols-1 gap-4">
          {threads.map((thread) => (
            <ThreadItem key={thread.id} id={thread.id} title={thread.title} body={thread.body} category={thread.category} createdAt={thread.createdAt} owner={users.find((user) => user.id === thread.ownerId)} totalComments={thread.totalComments} upVotesBy={thread.upVotesBy} downVotesBy={thread.downVotesBy} type="threads" />
          ))}
        </article>
      ) : (
        <p>Thread not found</p>
      )}
    </>
  );
}

const threadsShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  ownerId: PropTypes.string.isRequired,
  totalComments: PropTypes.number.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
};

ThreadList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(threadsShape)).isRequired,
};
