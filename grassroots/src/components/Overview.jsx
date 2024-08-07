export default function Overview({project}) {
  return (<>
  <p className="font-bold">
    Project Name: {project.name}
  </p>
  <p className="font-bold">
    Goal Amount: ${Math.floor(project.goal / 1000)},{(project.goal % 1000).toString().padEnd(3, 0)}
  </p>
  <p className="font-bold">
    Country: {project.country}
  </p>
  <p className="font-bold">
    Type: {project.type}
  </p>

  </>)
}