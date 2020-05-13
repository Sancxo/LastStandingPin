let gltfLoader = new THREE.GLTFLoader();

let winieThePin, lightningBlue;
//pin creation
gltfLoader.load('models/Winnie-the-Pin/scene.gltf', function(gltf) {
    winieThePin = gltf.scene;
    scene.add(winieThePin);
    winieThePin.traverse(function(node) {
        if (node instanceof THREE.Mesh) {
            node.castShadow = true;
            node.receiveShadow = true;
        }
    });
    winieThePin.position.set(0.7, 1.75, -2);
    winieThePin.rotation.set(0, Math.PI/3, 0)
    winieThePin.scale.set(0.01, 0.01, 0.01);
    mouseControls.push(winieThePin);
}, undefined, function(error) {
    console.error('error');
});

ballReset = () => {
    lightningBlue.position.set(Math.random() * 9.4 + 0.5, 0.5, -185/1.5);
};

ballCreation = () => {
    gltfLoader.load('models/Lightning-blue-ball/scene.gltf', function(gltf) {
        lightningBlue = gltf.scene;
        scene.add(lightningBlue);
        lightningBlue.traverse(function(node) {
            if (node instanceof THREE.Mesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });
        ballReset();
        lightningBlue.scale.set(0.2, 0.2, 0.2);
    }, undefined, function(error) {
        console.error('error');
    });
};

