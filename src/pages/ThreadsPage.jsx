/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { asyncPopulateUsersAndThreads } from '../app/states/shared/action';
import ThreadCategories from '../components/Fragments/ThreadCategories';
import ThreadList from '../components/Fragments/ThreadList'
import ThreadModal from '../components/Fragments/ThreadModal';

const selectThreads = state => state.threads;
const selectAuthUser = state => state.authUser;

const selectThreadsAndAuthUser = createSelector(
  [selectThreads, selectAuthUser],
  (threads, authUser) => ({ threads, authUser })
);

export default function ThreadsPage() {
  const dispatch = useDispatch();
  const { threads, authUser } = useSelector(selectThreadsAndAuthUser);
  const [keyword, setKeyword] = useState('');

  const onKeyword = (category) => setKeyword((state) => (state === category ? '' : category));

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, []);

  // Menggunakan useMemo untuk memoisasi hasil operasi pemfilteran dan pemetaan
  const threadsList = useMemo(() => threads.filter((thread) => thread.category.includes(keyword)), [threads, keyword]);
  const categories = useMemo(() => threads.map((item) => item.category).filter((category, index, currentCategory) => currentCategory.indexOf(category) === index), [threads]);

  return (
    <div className='p-5 md:p-7'>
      <ThreadCategories categories={categories} keyword={keyword} onKeyword={onKeyword} />
      <ThreadList threads={threadsList} />
      {authUser && <ThreadModal />}
    </div>
  );
}