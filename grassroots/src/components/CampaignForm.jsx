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
      <form>
        <label>
          Fundraising Goal:
          <input type="text" name="goal"
          onChange={(e)=>{
            setFormData({...formData,
              goal: e.target.value})
        }}/>
        </label>
        <label>
          Country:
          <input type="text" name="country"
          onChange={(e) => setFormData({...formData,
          country: e.target.value})}/>
        </label>
        <label>
          Project Name:
          <input type="text" name="name"
          onChange={(e) => setFormData({...formData,
          name: e.target.value})}/>
        </label>
        <label>
          Type of Project:
          <input type="text" name="type"
          onChange={(e) => setFormData({...formData,
          type: e.target.value})}/>
          {/* Film
              Art
              Games
              Music
              Technology */}
        </label>
        <input type="submit" value="Submit" onClick={(e)=> {
          e.preventDefault();
          startClick(formData)
          }}/>
      </form>
    </div>
    </>
  )
}