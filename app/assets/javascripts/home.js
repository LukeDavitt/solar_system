var buildSun = function(){
	// revolutions per second
      var angularSpeed = 0.2; 
      var lastTime = 0;
 
      // this function is executed on each animation frame
      function animate(){
        // update
        var time = (new Date()).getTime();
        var timeDiff = time - lastTime;
        var delta = Math.min(200, timeDiff)/1000;
		
		earthMesh.rotation.y += 1/32 * delta;
        cloudMesh.rotation.y += 1/16 * delta;
        lastTime = time;
 
        // render
        renderer.render(scene, camera);
 
        // request new frame
        requestAnimationFrame(function(){
            animate();
        });
      }
 
      // renderer
      var renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);
	// camera
      var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
      camera.position.z = 700;
 
      // scene
      var scene = new THREE.Scene();
                
      var earthGeom = new THREE.SphereGeometry(150, 32, 32);

      var material = new THREE.MeshPhongMaterial();
      material.map = THREE.ImageUtils.loadTexture('/images/earthmap.jpg');
      material.bumpMap = THREE.ImageUtils.loadTexture('/images/earthbump.jpg');
	  material.bumpScale = 10 ;
	  material.specularMap = THREE.ImageUtils.loadTexture('/images/earthspec.jpg');
	  material.specular  = new THREE.Color('grey');
	  
      var earthMesh = new THREE.Mesh(earthGeom, material);
      earthMesh.overdraw = true;


      var geometry   = new THREE.SphereGeometry(152, 32, 32);
	  var cloudmaterial  = new THREE.MeshPhongMaterial({
	    map     : THREE.ImageUtils.loadTexture('/images/clouds.jpg'),
	    side        : THREE.DoubleSide,
	    opacity     : 0.3,
	    transparent : true,
	    depthWrite  : false,
	  });
	  var cloudMesh = new THREE.Mesh(geometry, cloudmaterial);
	  earthMesh.add(cloudMesh);


      scene.add(earthMesh);


      // create the geometry sphere
		var stargeometry  = new THREE.SphereGeometry(300, 32, 32);
		// create the material, using a texture of startfield
		var starmaterial  = new THREE.MeshBasicMaterial();
		starmaterial.map   = THREE.ImageUtils.loadTexture('/images/galaxy_starfield.png');
		starmaterial.side  = THREE.BackSide;
		// create the mesh based on geometry and material
		var starmesh  = new THREE.Mesh(stargeometry, starmaterial);

	scene.add(starmesh);


      // add subtle ambient lighting
      var ambientLight = new THREE.AmbientLight(0x404040);
      scene.add(ambientLight);
      
      // directional lighting
      var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
      directionalLight.position.set(1000, 1000, 1000).normalize();
      scene.add(directionalLight);
      
      // start animation
      animate();
};