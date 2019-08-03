@Component('lerpData')
export class LerpData {
  pathArray: Vector3[] = []
  origin: number = 0
  target: number = 1
  fraction: number = 0
  constructor(pathArray: Vector3[], origin: number, target: number, fraction: number){
    this.pathArray = pathArray
    this.origin = origin
    this.target = target
    this.fraction = fraction
  }
}

// Component group holding all spheres
export const spheres = engine.getComponentGroup(LerpData)

///////////////
// Systems

export class MoveEntity implements ISystem  {
  update(dt: number) {
    for (let sphere of spheres.entities) {
      let transform = sphere.getComponent(Transform)
      let lerp = sphere.getComponent(LerpData)
      lerp.fraction += dt / 12
      if (lerp.fraction < 1) {
        transform.position = Vector3.Lerp(
          lerp.pathArray[lerp.origin],
          lerp.pathArray[lerp.target],
          lerp.fraction
          )
         } else {
          lerp.origin = lerp.target
          lerp.target += 1
          if (lerp.target >= lerp.pathArray.length) {
            lerp.target = 0
            }
          lerp.fraction = 0
          transform.lookAt(lerp.pathArray[lerp.target])
          let distance = Vector3.Forward().scale(5)
          transform.translate(distance)
          transform.rotate(Vector3.Down(), 180);
        }
    }
  }
}
