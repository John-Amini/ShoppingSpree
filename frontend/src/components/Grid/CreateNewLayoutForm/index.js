import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { createNewLayout } from "../../../store/layout";
import { Modal2 } from './context/Modal'
const CreateLayoutForm = ({showModal,setShowModal}) => {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [validationErrors, setValidationErrors] = useState([]);

    const updateTitle = e => setTitle(e.target.value);
    useEffect( () => {
      let errors = []
      const button = document.getElementById('submitCreateWatchlist');

      if(title.length > 16 ) {
        errors.push("Layout name can be max 16 characters")
        button.disabled = true;
      } else{
        button.disabled = false
      }
      setValidationErrors(errors)
    },[title])
    const handleSubmit = async (e) => {
      e.preventDefault();
      const errors = [];
      if (title) {
        const button = document.getElementById('submitCreateWatchlist');
        const titleInput = document.getElementById('titleInput');

        button.disabled = true;
        titleInput.disabled = true;
        let createdWatchlist = await dispatch(createNewLayout(title))
        if (createdWatchlist.error) {
          errors.push(createdWatchlist.error);
          button.disabled = false;
          titleInput.disabled = false;
          setValidationErrors(errors);
        } else {
          // new watch list was created need to rerender or reload
          setShowModal(false)
        }
      }
    };
    let count = 0;
return (
    <div className='create-watchlist-container'>
    <Modal2
    className={"modalWatchlist"}
    title={`Create New layout`}
          onClose={() => setShowModal(false)}
          show={showModal}>
      <div>
        <form className='createWatchlistForm' onSubmit={handleSubmit}>
          <div>
          {validationErrors.length > 0 && (
            <div className='errorsContainer'>
              {validationErrors.map(currError => {
                return <p key={`error-${count++}`}>{currError}</p>;
              })}
            </div>
          )}
            </div>

            <input
              type='textarea'
              id='titleInput'
              placeholder='Title'
              value={title}
              onChange={updateTitle}
            />
          <input id='submitCreateWatchlist' type={'submit'}></input>
        </form>
      </div>
    </Modal2>
    </div>
  );

}

export default CreateLayoutForm
