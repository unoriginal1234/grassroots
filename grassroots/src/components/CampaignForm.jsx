import { useState } from 'react';

export default function CampaignForm({startClick}) {

  const [ formData, setFormData ] = useState({
    goal: '',
    country: '',
    name: '',
    type: ''
  })

  return(
    <>
    <div>
      <form className="form-control">
        <label className="flex items-center gap-2">
          <input type="text" name="goal" className="input input-bordered input-primary w-full max-w-xs" placeholder="Fundraising Goal:"
          onChange={(e)=>{
            setFormData({...formData,
              goal: e.target.value})}}/>
        </label>
        <label className="flex items-center gap-2">
          <input type="text" name="country" className="input input-bordered input-primary w-full max-w-xs" placeholder="Country:"
          onChange={(e) => setFormData({...formData,
          country: e.target.value})}/>
        </label>
        <label className="flex items-center gap-2">
          <input type="text" name="name" className="input input-bordered input-primary w-full max-w-xs" placeholder="Project Name:"
          onChange={(e) => setFormData({...formData,
          name: e.target.value})}/>
        </label>
        <select type="select" className="select select-primary w-full max-w-xs" name="type"
        onChange={(e) => setFormData({...formData,
        type: e.target.value})}>
            <option disabled selected>Type of Project</option>
            <option>Film</option>
            <option>Art</option>
            <option>Games</option>
            <option>Music</option>
            <option>Technology</option>
        </select>
        <input type="submit" value="Submit" className="btn w-full max-w-xs" onClick={(e)=> {
          e.preventDefault();
          startClick(formData)
          }}/>
      </form>
    </div>
    </>
  )
}