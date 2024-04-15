/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet, useNavigate } from "react-router-dom"
import Navbar from "../../components/Fragments/Navbar"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { asyncIsPreload } from "../../app/states/isPreload/action";
import { asyncLogout } from "../../app/states/authUser/action";
import LoadingBar from "react-redux-loading-bar";

const BaseLayout = () => {
  const dispatch = useDispatch();
  const { authUser, isPreload } = useSelector((state) => ({
    authUser: state.authUser, 
    isPreload: state.isPreload
  }));
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(asyncLogout()).then(({ status }) => {
      if (status === 'success') navigate('/');
    });
  };

  useEffect(() => {
    dispatch(asyncIsPreload());
  }, []);

  if (isPreload) {
    return null;
  }

  return (
    <>
      <Navbar authUser={authUser} onLogout={onLogout} />
      <LoadingBar className="bg-primary h-1 absolute" />
      <Outlet />
    </>
  )
}

export default BaseLayout