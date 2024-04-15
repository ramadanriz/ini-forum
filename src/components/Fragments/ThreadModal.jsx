import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useToggle from "../../hooks/useToggle";
import { asyncCreateThread } from "../../app/states/threads/action";
import ThreadAddModalButton from "../Elements/ThreadAddModalButton";
import ThreadForm from "./ThreadForm";
import { FaXmark } from "react-icons/fa6";

const ThreadModal = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [checked, setChecked, changeChecked] = useToggle(false);

    const onCreateThread = async ({ title, body, category }) => {
        await dispatch(asyncCreateThread({ title, body, category })).then(
        ({ status }) => {
            if (status === 'success') {
            changeChecked(false);
            navigate('/');
            }
        });
    };

  return (
    <>
      <ThreadAddModalButton />

      <input type="checkbox" id="my_modal_6" className="modal-toggle" checked={checked} onChange={setChecked} />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <button className="btn btn-sm btn-circle absolute right-2 top-2" onClick={setChecked}><FaXmark /></button>
          <h3 className="font-bold text-lg">Tambah Thread Baru</h3>
          <ThreadForm onCreateThread={onCreateThread} />
        </div>
      </div>
    </>
  )
};

export default ThreadModal;
