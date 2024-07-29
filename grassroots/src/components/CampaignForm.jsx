export default function CampaignForm() {
  return(
    <>
    <div>
      <form>
        <label>
          Fundraising Goal:
          <input type="text" name="name" />
        </label>
        <label>
          Country:
          <input type="text" name="name" />
        </label>
        <label>
          Project Name:
          <input type="text" name="name" />
        </label>
        <label>
          Type of Project:
          <input type="text" name="name" />
          {/* Film
              Art
              Games
              Music
              Technology */}
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
    </>
  )
}