import { useDispatch } from "react-redux"
import { Modal2 } from "../Item/context/Modal";
import SimpleImageSlider from "react-simple-image-slider"
import image1 from "./images/layout.png"
import image2 from "./images/bar.png"
import image3 from "./images/ItemSelect.png"
import "./tutorial.css"
function Tutorial({showModal,setShowModal}) {
    const dispatch = useDispatch();
    const images = [{url:image2},
        {url:image1},
        {url:image3}]
    return (  <div className='tutorial root'>

    <Modal2
    title={`Tutorial`}
          onClose={() => setShowModal(false)}
          show={showModal}>
              <div className="root">
              <SimpleImageSlider
        width={1165}
        height={600}
        images={images}
        showBullets={true}
        showNavs={true}
        navStyle= {2}

      />
      </div>
    </Modal2>
    </div>)

}

export default Tutorial
