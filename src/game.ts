import{LerpData, MoveEntity} from "./modules/movement";
import{hello, world} from "./modules/wordBuilder";

engine.addSystem(new MoveEntity())

const startX = 1.5;
const startY = 6;
const startZ = 6;
const color = new Array()
color[0] = Color3.FromHexString("#15C20A")
color[1] = Color3.FromHexString("#12A632")
color[2] = Color3.FromHexString("#0F8B5B")
color[3] = Color3.FromHexString("#0D7084")
color[4] = Color3.FromHexString("#0A55AD")
color[5] = Color3.FromHexString("#073AD6")
color[6] = Color3.FromHexString("#051FFF")

hello(startX, startY, startZ, color);
world(startX, startY, startZ, color);
sphereRow();

/***************************************** */
/****************Ship path************** */
/***************************************** */
let point1 = new Vector3(1, 0, 3)
let point2 = new Vector3(1, 0, 13)
let point3 = new Vector3(3,0,16)
let point4 = new Vector3(13, 0, 16)
let point5 = new Vector3(16, 0, 13)
let point6 = new Vector3(16, 0, 3)
let point7 = new Vector3(13,0,1)
let point8 = new Vector3(3,0,1)
let path: Vector3[] = [point1, point2, point3, point4, point5, point6, point7, point8]

//Ship Entity
const ship_01 = new Entity()
const gltfShape = new GLTFShape('models/Ship_01/Ship_01.glb')
ship_01.addComponentOrReplace(gltfShape)
const transform_2 = new Transform({
  position: new Vector3(16.5, 0, 16),
  rotation: Quaternion.Euler(0, 180,0),
  scale: new Vector3(.5,.5, .5)
})
ship_01.addComponentOrReplace(transform_2)
ship_01.addComponent(new LerpData(path, 0, 1, 0))
engine.addEntity(ship_01)

//Water entity
const waterPatchFull_01 = new Entity()
const gltfShape_3 = new GLTFShape('models/Water/WaterPatchFull_01.glb')
waterPatchFull_01.addComponentOrReplace(gltfShape_3)
const transform_8 = new Transform({
  position: new Vector3(16, 0, 16),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(2, 1, 2)
})
waterPatchFull_01.addComponentOrReplace(transform_8)
engine.addEntity(waterPatchFull_01)

//Sphere Functions
function sphereRow(){
  for (var i = 0; i < 7; i++) {
    spawnSphere(startX+(i*2.1 ), startY-1.65, startZ, color[i]);

  }
}
function spawnSphere(x: number, y: number, z: number, n: Color3) {
  let Cylinder = new SphereShape()
  let sphere = new Entity()
  sphere.addComponent(Cylinder)
  sphere.addComponent(new Transform({
   position: new Vector3(x, y, z)
  }))
  const myMaterial = new Material()
  myMaterial.albedoColor = n
  myMaterial.metallic = 0.9
  myMaterial.roughness = 0.1
  sphere.addComponent(myMaterial)

  let point1 = new Vector3(x, y, z-(2+Math.random()))
  let point2 = new Vector3(x, y, z+(2+Math.random()))
  let path: Vector3[] = [point1, point2]
  sphere.addComponent(new LerpData(path, 0, 1, 0))
  
  engine.addEntity(sphere)
return sphere
}
