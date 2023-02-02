import React from 'react'
import { ModalContext } from '../../Context/ModalContext'
function LeftPaneScreen() {
  const { openModal } = React.useContext(ModalContext);
  return (
    <div className='h-screen flex justify-end bg-primary '>
        <div className='mx-auto flex flex-col items-center justify-center gap-3 text-center '>
           <img src='./logo.png' alt="logo" className='w-30 h-30'/>
           <h2 className='font-semibold text-white '> Code Deck</h2>
           <h3 className='font-semibold text-white '> Code. Compile. Debug.</h3>
            <button onClick={() =>
                  openModal({
                    show: true,
                    modalType: 3,
                    identifiers: {
                      folderId: "",
                      cardId: "",
                    }
                  })
                } className='w-full mt-4 p-4 bg-white shadow-lg rounded-full drop-shadow-2xl hover:scale-110 transition duration-150 ease-in-out '>
               <span className='text-xl'> + Create New playground</span>
            </button>
        </div>
    </div>
  )
}

export default LeftPaneScreen
