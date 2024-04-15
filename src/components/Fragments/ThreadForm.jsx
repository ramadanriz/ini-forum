import PropTypes from 'prop-types';
import useInput from '../../hooks/useInput';
import Input from '../Elements/Input'

const ThreadForm = ({ onCreateThread }) => {
    const [title, setTitle, changeTitle] = useInput('')
    const [category, setCategory, changeCategory] = useInput('')
    const [body, setBody, changeBody] = useInput('')

    const handleOnCreateThread = async () => {
        await onCreateThread({ title, body, category })
        changeTitle('')
        changeCategory('')
        changeBody('')
    }

  return (
    <div className="flex flex-col gap-3 py-4">
        <Input type='text' placeholder='Judul' value={title} onChange={setTitle} />
        <Input type='text' placeholder='Kategori' value={category} onChange={setCategory} />
        <Input type='text' placeholder='Body' value={body} onChange={setBody} />
        <div className="modal-action">
            <button htmlFor="my_modal_6" className="btn btn-primary" onClick={handleOnCreateThread}>Submit</button>
        </div>
    </div>
  )
};

ThreadForm.propTypes = {
    onCreateThread: PropTypes.func.isRequired,
}

export default ThreadForm;
