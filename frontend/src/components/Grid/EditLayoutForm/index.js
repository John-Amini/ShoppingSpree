import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { createNewLayout, editNameOfLayout } from "../../../store/layout";
import { Modal2 } from './context/Modal'
const EditLayoutForm = ({showModal,setShowModal,currLayout}) => {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const [title, setTitle] = useState(currLayout.name);
    const [validationErrors, setValidationErrors] = useState([]);

    const updateTitle = e => setTitle(e.target.value);
    useEffect( () => {
      let errors = []
      const button = document.getElementById('submitCreateWatchlist');
      let errorFlag = false
      if(title.length > 16 ) {
        errors.push("Layout name can be max 16 characters")
        errorFlag = true
      } else if (title.length === 0){
        errors.push("Layout must have a name")
        errorFlag = true
      }

      if(errorFlag){
        button.disabled = true;
      }
      else{
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

        let editedWatchlist = await dispatch(editNameOfLayout(title,currLayout.id,currLayout.name))
        if (editedWatchlist.error) {
          errors.push(editedWatchlist.error);
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
    <div className='edit-layout-container'>
    <Modal2
    className={"modalEdit"}
    title={`Edit name of ${currLayout.name}`}
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

export default EditLayoutForm
