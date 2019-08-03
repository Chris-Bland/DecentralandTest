export function hello(startX: number, startY: number, startZ: number, color: Color3[]){
    buildThaH(startX,startY,startZ, color[0]);
    buildThaE(startX,startY,startZ, color[0]);
    buildThaL(startX+6.5, startY, startZ,color[0]);
    buildThaL(startX+ 8.7, startY, startZ,color[0]);
    buildThaO(startX+11, startY, startZ,color[0]);
  }
  export function world(startX: number, startY: number, startZ: number, color: Color3[]){
    buildThaW(startX, startY-5.25, startZ,color[6]);
    buildThaO(startX+3.9, startY-5.25, startZ,color[6]);
    buildThaR(startX+6.5, startY-5.25, startZ,color[6]);
    buildThaL(startX+9, startY-5.25, startZ,color[6]);
    buildThaO(startX+11.25, startY-5.25, startZ,color[6]);
  }

  /***************************************** */
  //Letters
  function buildThaH(x: number, y: number, z: number, color: Color3){
    blockStack(x,y,z,3, color);
    spawnCube(x+1,y+1,z, color);
    blockStack(x+2,y,z,3,color);
  }
  function buildThaE(x: number, y: number, z: number, color: Color3){
    blockStack(x+3.5, y, z, 3,color);
    blockRow(x+4, y, z, 2,color);
    blockRow(x+4, y+2, z, 2,color);
    spawnCube(x+4, y+1, z,color);
  }
  function buildThaL(x: number, y: number, z: number, color: Color3){
    blockStack(x, y, z, 3,color);
    spawnCube(x+1, y, z,color);
  }
  function buildThaO(x: number, y: number, z: number, color: Color3){
    blockStack(x, y, z, 3,color);
    spawnCube(x+.6, y, z,color);
    spawnCube(x+.6, y+2, z,color);
    blockStack(x+1.5, y, z, 3,color);
  }
  function buildThaW(x: number, y: number, z: number, color: Color3){
    blockStack(x, y, z, 3,color);
    spawnCube(x+.5,y,z,color);
    blockStack(x+1.25,y,z,2,color);
    spawnCube(x+2,y,z,color);
    blockStack(x+2.5, y, z, 3,color);
  }
  function buildThaR(x: number, y: number, z: number, color: Color3){
    blockStack(x, y, z, 3,color);
    blockStack(x+1,y+1, z, 2,color);
    spawnCube(x+1.25, y, z,color);
  }
  
  //Components
  function blockStack(x: number, y: number, z: number, c: number, color: Color3){
    for (var i = 0; i < c; i++) { 
      spawnCube(x,y+i,z,color);
    }
  }
  function blockRow(x: number, y: number, z: number, c: number, color: Color3){
    for (var i = 0; i < c; i++) { 
      spawnCube(x+i,y,z,color);
    }
  }
  function spawnCube(x: number, y: number, z: number, color: Color3) {
    const cube = new Entity()
    cube.addComponent(new Transform({ position: new Vector3(x, y, z) }))
    cube.addComponent(new BoxShape())
    const myMaterial = new Material()
    myMaterial.albedoColor = color;
    myMaterial.metallic = 0.9
    myMaterial.roughness = 0.1
    cube.addComponent(myMaterial)
    engine.addEntity(cube)
    return cube
  }