/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { asyncGetDetailThread, resetDetailThreadActionCreator } from '../app/states/detailThread/action';
import Comments from '../components/Fragments/ThreadCommentList';
import ThreadItem from '../components/Fragments/ThreadItem';


export default function ThreadPage() {
  const { id } = useParams();
  const { detailThread } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) dispatch(asyncGetDetailThread(id));
    return () => {
      dispatch(resetDetailThreadActionCreator());
    };
  }, []);

  if (!detailThread || !id) return null;

  return (
    <>
      <ThreadItem key={detailThread.id} id={detailThread.id} totalComments={detailThread.comments.length} {...detailThread} />
      <Comments threadId={id} comments={detailThread.comments} />
    </>
  );
}
