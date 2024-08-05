export default function Overview({project}) {
  return (<>
  <p className="font-bold">
    Project Name: {project.name}
  </p>
  <p className="font-bold">
    Goal Amount: {project.goal}
  </p>
  <p className="font-bold">
    Country: {project.country}
  </p>
  <p className="font-bold">
    Type: {project.type}
  </p>

  </>)
}