import THREE from 'three';

var container, camera, scene, renderer, controls, geometry, mesh, effect;
var windowHalfX = window.innerWidth;
var windowHalfY = window.innerHeight;
var lon = 413;
var lat = -19;
var phi = 0;
var theta = 0;
var alpha = 0;
var beta = 0;
var gamma = 0;

export default function p360(imgUrl) {
  var animate = function(){
    window.requestAnimationFrame( animate );
    if((alpha === 0 || alpha == null) && (beta === 0 || beta == null) && (gamma === 0 || gamma == null)) {
      render();
    }
    else{
      //controls.update();
    }
    //see if we're in sbs mode
    renderer.render(scene, camera);
  };

  container = document.getElementById('container');
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);
  //controls = new THREE.DeviceOrientationControls( camera );
  scene = new THREE.Scene();
  var geometry = new THREE.SphereGeometry( 500, 60, 40 );
  geometry.applyMatrix( new THREE.Matrix4().makeScale( -1, 1, 1 ) );
  var material = new THREE.MeshBasicMaterial( {
    map: THREE.ImageUtils.loadTexture(imgUrl)
  });
  var mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );
  //renderer = new THREE.CanvasRenderer();
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.domElement.style.position = 'absolute';
  renderer.domElement.style.top = 0;
  container.appendChild(renderer.domElement);

  window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
  }, false);
  window.addEventListener( 'mousemove', onDocumentMouseMove, false );
  window.addEventListener( 'deviceorientation', onDeviceOrientationChangeEvent, false );
  animate();
};

function onDocumentMouseMove(event) {
  lon = ( event.clientX - (window.innerWidth / 2)) * .33;
  lat = ( event.clientY - (window.innerHeight / 2)) * .5;
}

function onDeviceOrientationChangeEvent( event ) {
  alpha = event.alpha;
  beta = event.beta;
  gamma = event.gamma;
}

function render() {
  lat = Math.max( - 85, Math.min( 85, lat ) );
  phi = THREE.Math.degToRad( 90 - lat );
  theta = THREE.Math.degToRad( lon );
  camera.position.x = 100 * Math.sin( phi ) * Math.cos( theta );
  camera.position.y = 100 * Math.cos( phi );
  camera.position.z = 100 * Math.sin( phi ) * Math.sin( theta );
  camera.lookAt( scene.position );
}

