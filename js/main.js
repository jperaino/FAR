$(document).ready(function(){
    

    // MARK: - PROPERTIES ----------------------------------------------------------------------------

    	// SET Base VARIABLES

		// Tubes
		var cylRad = 0.15;
		var cylHeight = 50;

		// Circles
		var circRad = 25;
		var circPtCt = 50;
		var circ2Rot = 120 * Math.PI / 180;
		var circ2pos = 40;

		var top = new THREE.Object3D(); // Upper circle
		var cylinders = new THREE.Object3D();
		var endPts = new THREE.Object3D();
		var hyperboloid = new THREE.Object3D();
		var stairEnds = new THREE.Object3D();

		// Stairs
		var stairLength = 33;

		// Materials
		var material = new THREE.MeshBasicMaterial({color: 0xffffff, transparent: true});
		var lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });


    	// SET SCENE - - - - - - - 
    	var scene = new THREE.Scene();
		scene.background = new THREE.Color( 0xb2dfdb );

		var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		camera.position.set(-60, -60 , 80);
		camera.up = new THREE.Vector3(0,0,1);
		camera.lookAt(new THREE.Vector3(0, 0 , 0));

		var renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.setSize( window.innerWidth, window.innerHeight);

		controls = new THREE.OrbitControls(camera, renderer.domElement);
		controls.target.set(0, 0 , 0);
		//controls.enableZoom = false;


		// GRID
		// GRID XY static
		var size = 10000;
		var divisions = 1000;

		var grid = new THREE.GridHelper( size, divisions, 0xffffff, 0xffffff );
		grid.rotation.x = Math.PI/2;
		grid.material.transparent = true;
		grid.material.opacity = 0.9;
		scene.add( grid );
		scene.fog = new THREE.FogExp2( 0xb2dfdb, 0.0045 );

		

	// MARK: - ON LOAD DO ----------------------------------------------------------------------------

		// Add WebGL scene to HTML
		$('#canvasPlaceholder').html( renderer.domElement );


		// Add date to copyright 
		var d = new Date()
		var year = d.getFullYear()
		$('#crDate').html( "<i>Copyright &#169  " + year + " Jim Peraino. All rights reserved.</i>");

		// RENDER
		addSiteOutline();
		render();
		
	// MARK: - ADD GEOMETRY  ----------------------------------------------------------------------------

		function addSiteOutline() {

			var geometry = new THREE.Geometry();
			geometry.vertices.push(new THREE.Vector3(-10,0,0));
			geometry.vertices.push(new THREE.Vector3(0,10,0));
			geometry.vertices.push(new THREE.Vector3(10,5,0));
			geometry.vertices.push(new THREE.Vector3(10,0,0));
			geometry.vertices.push(new THREE.Vector3(0,-5,0));
			geometry.vertices.push(new THREE.Vector3(-10,0,0));

			var line = new THREE.Line(geometry, lineMaterial);
			line.name = "siteBoundary"

			scene.add(line);
		}

	// MARK: - EVENT LISTENERS --------------------------------------------------------------------

		// Listen for window resize
		window.addEventListener( 'resize', onWindowResize, false );

		$(".fadeJ").delay(100).fadeIn(750);
		

	// MARK: - ACTIONS ----------------------------------------------------------------------------

    	// Keep the view boundary updated
    	function onWindowResize() {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize( window.innerWidth, window.innerHeight );
		}

		// With JQuery
		$('#ex2').slider({
			formatter: function(value) {
				return 'Current value: ' + value;
			}
		});

		$('#ex3').slider({
			formatter: function(value) {
				return 'Current value: ' + value;
			}
		});

		$('#ex4').slider({
			formatter: function(value) {
				return 'Current value: ' + value;
			}
		});


		$('#ex2').on("slide", function(slideEvt2){
			rotation = slideEvt2.value * Math.PI / 180;
			circ2Rot = rotation;
			updateHyperboloid();
		})

		$('#ex3').on("slide", function(slideEvt3){
			circ2pos = slideEvt3.value;
			updateHyperboloid();
		})

		$('#ex4').on("slide", function(slideEvt4){
			stairLength = slideEvt4.value;
			updateHyperboloid();
		})


	// MARK: - METHODS ----------------------------------------------------------------------------


	// ___RENDER

		// Create the render loop
		function render() {
			requestAnimationFrame( render );

				// Render scene
				renderer.render( scene, camera);
				controls.update();
		};

	// ___GEOMETRY HELPERS


	// ___ALERTS






});