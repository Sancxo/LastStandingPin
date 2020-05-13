let renderer, cam, scene;
let ambientLight, keyLight;
let listener, ballSound;

let dragControls, orbitControls, controls = {}
let mouseControls = [];

let audioLoader = new THREE.AudioLoader();

let settings = { 
    fov: 75,
    pinSize: 3.2,
    clippingMin: 0.1,
    clippingMax: 1000,
};
let ballSpeed = 0.8;
let balls = [];

init = () => {
    //renderer
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(devicePixelRatio);
    document.body.appendChild(renderer.domElement);

    //scene
    scene = new THREE.Scene();

    //camera
    cam = new THREE.PerspectiveCamera(
        settings.fov, 
        window.innerWidth / window.innerHeight,
        settings.clippingMin, 
        settings.clippingMax,
    );
    cam.position.set(5.25, settings.pinSize, 4);

    //listener
    listener = new THREE.AudioListener();
    cam.add(listener);

    //lights
    ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    keyLight = new THREE.SpotLight(0xffffff);
    keyLight.position.set(1.25, 10, 5);
    keyLight.castShadow = true;
    keyLight.penumbra = 0.5;
    scene.add(keyLight);

    //window adaptation
    window.addEventListener('resize', onWindowResize = () => {
        cam.aspect = window.innerWidth / window.innerHeight;
        cam.updateProjectionMatrix();
    
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(devicePixelRatio);    
    }, false);

    //controls
    dragControls = new THREE.DragControls(mouseControls, cam, document.body);
    dragControls.transformGroup = true;

    //orbitControls = new THREE.OrbitControls(cam, document.body);

    document.addEventListener('keydown', onKeyDown = (e) => {
        controls[e.keyCode] = true;
    }, false);
    document.addEventListener('keyup', onKeyUp = (e) => {
        controls[e.keyCode] = false;
    }, false);  

    keyMap = () => {
        if (controls[81] || controls[65] || controls[37]) {
            winieThePin.position.x -= 0.1;
            cam.position.x -= 0.05;
        }; //left
        if (controls[68] || controls[39]) {
            winieThePin.position.x += 0.1;
            cam.position.x += 0.05;
        }; //right
    };

    scene.add(floor);

    //ballSound = new THREE.PositionalAudio(listener);
    // audioLoader.load('sounds/rolling_ball.ogg', function(buffer) {
    //     ballSound.setBuffer(buffer);
    //     ballSound.setRefDistance(185);
    //     ballSound.play();
    // });

};

animate = () => {
    requestAnimationFrame(animate);

    keyMap();

    lightningBlue.position.z += ballSpeed;

    if (lightningBlue.position.z > 0) {
        ballReset();
        ballSpeed += 0.1
    };

    renderer.render(scene, cam);
};

init();
ballCreation();
window.onload = function() {
    animate();
};