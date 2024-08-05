export default function FormModal () {
  return (
    <>
    <button className="btn btn-secondary btn-circle" onClick={()=>document.getElementById('my_modal_2').showModal()}>?</button>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Grassroots Bot leverages OpenAI and 100,000 crowdfunded campaigns to give you tailored advice on your project. Good luck!</p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

    </>
  )
}

