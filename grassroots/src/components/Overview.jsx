export default function Overview({project}) {
  return (<>
  <p>Project Name: {project.name}
  </p>
  <p>
    Goal Amount: {project.goal}
  </p>
  <p>
    Country: {project.country}
  </p>
  <p>
    Type: {project.type}
  </p>

  </>)
}