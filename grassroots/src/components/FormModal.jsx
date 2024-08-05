export default function FormModal () {
  return (
    <>
    <button className="btn" onClick={()=>document.getElementById('my_modal_2').showModal()}>About</button>

      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Grassroots bot uses data from 100,000 crowdfunded campaigns to give you tailored advice on your campaign. Just tell it the name, how much you're planning to raise, what type of project it is and where you're based.</p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

    </>
  )
}

