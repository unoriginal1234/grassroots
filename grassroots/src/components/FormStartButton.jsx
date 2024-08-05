import {useState} from 'react'

export default function FormStartButton({formStart}){

  const [auth, setAuth] = useState({
    username: '',
    password: ''
  })

  return (
    <form className="form-control">
      <label className="flex items-center gap-2">
          <input type="text" name="username" className="input input-bordered input-primary w-full max-w-xs" placeholder="Username:"
          onChange={(e)=>{
            setAuth({...auth,
              username: e.target.value})}}/>
        </label>
        <label className="flex items-center gap-2">
          <input type="text" name="password" className="input input-bordered input-primary w-full max-w-xs" placeholder="Password:"
          onChange={(e)=>{
            setAuth({...auth,
              password: e.target.value})}}/>
        </label>
    <input type="submit" className="btn btn-primary" value="Tell Me About Your Project"
    onClick={(e)=>{
      e.preventDefault();
      formStart(auth)}} />
    </form>
  )
}