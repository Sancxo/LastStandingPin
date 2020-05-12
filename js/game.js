let renderer, cam, scene, dragControls, orbitControls, controls = {};
let mouseControls = [];
let ambientLight, keyLight;

let settings = { 
    fov: 75,
    pinSize: 3.2,
    clippingMin: 0.1,
    clippingMax: 1000,
};

let models = {
    winnieThePin: {
        gltf: 'models/Winnie-the-Pin/scene.gltf',
    },
    lightningBlue: {

    },
};

let floor, pin, lightningBlue, balls = [];

technicalSettings = () => {
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(devicePixelRatio);
    document.body.appendChild(renderer.domElement);

    cam = new THREE.PerspectiveCamera(
        settings.fov, 
        window.innerWidth / window.innerHeight,
        settings.clippingMin, 
        settings.clippingMax,
    );
    cam.position.set(0, settings.pinSize, 4);

    scene = new THREE.Scene();

    dragControls = new THREE.DragControls(mouseControls, cam, document.body);
    dragControls.transformGroup = true;
    //orbitControls = new THREE.OrbitControls(cam, document.body);

    ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    keyLight = new THREE.SpotLight(0xffffff);
    keyLight.position.set(-4, 10, 5);
    keyLight.castShadow = true;
    keyLight.penumbra = 0.5;
    scene.add(keyLight);

    window.addEventListener('resize', onWindowResize = () => {
        cam.aspect = window.innerWidth / window.innerHeight;
        cam.updateProjectionMatrix();
    
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(devicePixelRatio);    
    }, false);
};

worldCreation = () => {
    let textureLoader = new THREE.TextureLoader();
    let gltfLoader = new THREE.GLTFLoader();

    floorCreation = () => {
        let Settings = {
            floorWrappingS: 8,
            floorWrappingT: 2,
            floorLength: 183,
            floorWidth: 10.5
        };
        let floorTexture = textureLoader.load('textures/hardwood.jpg');
        let floorNormal = textureLoader.load('textures/hardwood_normal.jpg');

        floorTexture.wrapS = THREE.RepeatWrapping;
        floorTexture.wrapT = THREE.RepeatWrapping;
        floorTexture.repeat.set( Settings.floorWrappingS, Settings.floorWrappingT);
        floorTexture.rotation = Math.PI / 2;

        floorNormal.wrapS = THREE.RepeatWrapping;
        floorNormal.wrapT = THREE.RepeatWrapping;
        floorNormal.repeat.set( Settings.floorWrappingS, Settings.floorWrappingT);

        floor = new THREE.Mesh(
            new THREE.PlaneGeometry(Settings.floorWidth, Settings.floorLength, 10, 10), 
            new THREE.MeshPhongMaterial({map: floorTexture, normalMap: floorNormal})
        );
        floor.receiveShadow = true;
        floor.position.set(0, 0, -Settings.floorLength/2 + 0.85);
        floor.rotation.x = - Math.PI / 2;
        scene.add(floor);
    };

    pinCreation = () => {
        gltfLoader.load('models/Winnie-the-Pin/scene.gltf', function(gltf) {
            pin = gltf.scene;
            scene.add(pin);
            pin.traverse(function(node) {
                if (node instanceof THREE.Mesh) {
                    node.castShadow = true;
                    node.receiveShadow = true;
                }
            });
            pin.position.set(-4.55, 1.75, -2);
            pin.rotation.set(0, Math.PI/3, 0)
            pin.scale.set(0.01, 0.01, 0.01);
            mouseControls.push(pin);
        }, undefined, function(error) {
            console.error('error');
        });
    };

    //ball creation
    lightningBlue = gltfLoader.load('models/Lightning-blue-ball/scene.gltf', function(gltf) {
        lightningBlue = gltf.scene;
        scene.add(lightningBlue);
        lightningBlue.scale.set(0.2, 0.2, 0.2);
        lightningBlue.position.set(0, 0, -185/2);
    }, undefined, function(error) {
        console.error('error');
    });

    pinCreation();
    floorCreation();
};

controlSettings = () => {
    document.addEventListener('keydown', onKeyDown = (e) => {
        controls[e.keyCode] = true;
    }, false);
    document.addEventListener('keyup', onKeyUp = (e) => {
        controls[e.keyCode] = false;
    }, false);  
};

window.onload = animate = () => {
    requestAnimationFrame(animate);

    if (controls[81] || controls[65] || controls[37]) {
        pin.position.x -= 0.1;
        cam.position.x -= 0.05;
    }; //left
    if (controls[68] || controls[39]) {
        pin.position.x += 0.1;
        cam.position.x += 0.05;
    }; //right

    lightningBlue.position.z += 0.3;

    renderer.render(scene, cam);
};

technicalSettings();
worldCreation();
controlSettings();
window.onload = function() {
    animate();
};
