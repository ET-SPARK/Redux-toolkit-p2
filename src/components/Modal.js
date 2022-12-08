import { useDispatch } from "react-redux"
import { clearCart } from "../features/cart/cartSlice"
import { closeModal } from "../features/cart/modal/modalSlice"


const Modal = () => {
  const dispatch = useDispatch();
  return (
    <aside className='modal-container'>
        <div className='modal'>
            <h4>Do you want to remove all item from your shooping cart?</h4>
           <div className='btn-contanier'>
            <button type='button'
             onClick={() => {
              dispatch(clearCart())
              dispatch(closeModal())
             }} 
             className='btn confirm-btn'>
                confirm
            </button>
            <button type='button' 
              onClick={() => {
                dispatch(closeModal())
              }}
              className='btn clear-btn'>
                cancel
            </button>
           </div>
        </div>
    </aside>
  )
}

export default Modal