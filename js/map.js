let textureLoader = new THREE.TextureLoader();

//floor creation
let floorSettings = {
    wrappingS: 8,
    wrappingT: 2,
    length: 183,
    width: 10.5
};
let floorTexture = textureLoader.load('textures/hardwood.jpg');
let floorNormal = textureLoader.load('textures/hardwood_normal.jpg');

floorTexture.wrapS = THREE.RepeatWrapping;
floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set( floorSettings.wrappingS, floorSettings.wrappingT);
floorTexture.rotation = Math.PI / 2;

floorNormal.wrapS = THREE.RepeatWrapping;
floorNormal.wrapT = THREE.RepeatWrapping;
floorNormal.repeat.set( floorSettings.wrappingS, floorSettings.wrappingT);

let floor = new THREE.Mesh(
    new THREE.PlaneGeometry(floorSettings.width, floorSettings.length, 10, 10), 
    new THREE.MeshPhongMaterial({map: floorTexture, normalMap: floorNormal})
);
floor.receiveShadow = true;
floor.position.set(5.25, 0, - floorSettings.length / 2 + 0.85);
floor.rotation.x = - Math.PI / 2;
