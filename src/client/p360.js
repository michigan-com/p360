import THREE from 'three';

export default class p360 {
  constructor() {
    this.lon = 413;
    this.lat = -19;

    this.phi = 0;
    this.theta = 0;

    this.alpha = 0;
    this.beta = 0;
    this.gamma = 0;

    this.container;
    this.camera;
    this.scene;
    this.renderer;
  }

  drawImage(imgUrl) {

    this.container = document.getElementById('container');
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);
    //controls = new THREE.DeviceOrientationControls( this.camera );
    this.scene = new THREE.Scene();
    var geometry = new THREE.SphereGeometry( 500, 60, 40 );
    geometry.applyMatrix( new THREE.Matrix4().makeScale( -1, 1, 1 ) );
    var material = new THREE.MeshBasicMaterial( {
      map: THREE.ImageUtils.loadTexture(imgUrl)
    });
    var mesh = new THREE.Mesh( geometry, material );
    this.scene.add( mesh );
    //renderer = new THREE.CanvasRenderer();
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.domElement.style.position = 'absolute';
    this.renderer.domElement.style.top = 0;
    this.container.appendChild(this.renderer.domElement);

    window.addEventListener('resize', function() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize( window.innerWidth, window.innerHeight );
    }, false);
    window.addEventListener( 'mousemove', this.mouseMove, false );
    window.addEventListener( 'deviceorientation', this.deviceOrientationChange, false );
    this.animate();
  }

  animate = () => {
    window.requestAnimationFrame( this.animate );
    if((this.alpha === 0 || this.alpha == null) &&
       (this.beta === 0 || this.beta == null) &&
        (this.gamma === 0 || this.gamma == null)) {
      this.render();
    }
    else{
      //controls.update();
    }
    //see if we're in sbs mode
    this.renderer.render(this.scene, this.camera);
  };

  mouseMove = (event) => {
    this.lon = ( event.clientX - (window.innerWidth / 2)) * .33;
    this.lat = ( event.clientY - (window.innerHeight / 2)) * .5;
  }

  deviceOrientationChange = (event) => {
    this.alpha = event.alpha;
    this.beta = event.beta;
    this.gamma = event.gamma;
  }

  render = () => {
    this.lat = Math.max( - 85, Math.min( 85, this.lat ) );
    this.phi = THREE.Math.degToRad( 90 - this.lat );
    this.theta = THREE.Math.degToRad( this.lon );
    this.camera.position.x = 100 * Math.sin( this.phi ) * Math.cos( this.theta );
    this.camera.position.y = 100 * Math.cos( this.phi );
    this.camera.position.z = 100 * Math.sin( this.phi ) * Math.sin( this.theta );
    this.camera.lookAt( this.scene.position );
  }
}

