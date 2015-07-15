var paramD = getParameterByName("d");

var container = document.getElementsByClassName("container360")[0];
var parentElem = container.parentNode;

var loader1 = false;
var loader2 = false;
var loader3 = false;
var loader4 = false;
var loader5 = false;
var loader6 = false;

if(typeof THREE == 'undefined'){ //three.js
	loadScript("three.min.js");
}
else{
	loader1 = true;
	//since that's already in place, we just keep going. semi redundant, but don't see the better workflow yet.
	if(typeof $.colorbox == 'undefined'){ //colorbox
		loadScript("jquery.colorbox.js");
	}
	else{
		if(paramD == "dev"){
			console.log("Already Loaded: jquery.colorbox.js");
		}
		loader6 = true;
	}

	if(typeof THREE.OrbitControls == 'undefined'){ //three.js - orbit
		loadScript("controls/OrbitControls.js");
	}
	else{
		if(paramD == "dev"){
			console.log("Already Loaded: controls/OrbitControls.js");
		}
		loader2 = true;
	}

	if(typeof THREE.CSS3DRenderer == 'undefined'){ //three.js - CSS3DRenderer
		loadScript("renderers/CSS3DRenderer.js");
	}
	else{
		if(paramD == "dev"){
			console.log("Already Loaded: renderers/CSS3DRenderer.js");
		}
		loader3 = true;
	}

	if(typeof THREE.StereoEffect == 'undefined'){ //three.js - StereoEffect
		loadScript("effects/StereoEffect.js");
	}
	else{
		if(paramD == "dev"){
			console.log("Already Loaded: effects/StereoEffect.js");
		}
		loader4 = true;
	}

	if(typeof THREE.DeviceOrientationControls == 'undefined'){ //three.js - device orientation
		loadScript("controls/DeviceOrientationControls.js");
	}
	else{
		if(paramD == "dev"){
			console.log("Already Loaded: controls/DeviceOrientationControls.js");
		}
		loader5 = true;
	}

}

function loadScript(src){
	if(paramD == "dev"){
		console.log('Loading: '+ src);
	}
	var script_tag = document.createElement('script');
	script_tag.setAttribute("type","text/javascript");
	script_tag.setAttribute("src","http://www.freeptools.com/mapster/js/" + src);
	parentElem.insertBefore(script_tag, container);
}

$.fn.pollster2 = function(){
	console.log('yup');
};

(function($) {

	jQuery(document).ready(function($) {

		//kept only for deciding on tablet vs mouse camera controllers
		window.addEventListener('deviceorientation', onDeviceOrientationChangeEvent, false );

		var cssObject = {};
		var lon = '. $lon .';
		var lat = '. $lat .';
		var phi = 0;
		var theta = 0;
		var alpha = null;
		var beta = null;
		var gamma = null;

		//take that jQuery, doing this old school
		var w = window,
		d = document,
		e = d.documentElement,
		g = d.getElementsByTagName('body')[0],
		x = w.innerWidth || e.clientWidth || g.clientWidth,
		y = w.innerHeight|| e.clientHeight|| g.clientHeight;

		//lets track our containers... can't think of a better way to handle this atm
		var containers = {};
		var BASE_URL = 'http://www.freeptools.com/mapster/';

		//custom console function that won't break anything...
		$.logger = function(logvar){
			if ((window['console'] !== undefined)) {
				console.log(logvar);
			};
		}


		//css
		var script_tag1 = document.createElement('link');
		script_tag1.setAttribute("type","text/css");
		script_tag1.setAttribute("href","http://www.freeptools.com/mapster/css/pano-widget.css");
		script_tag1.setAttribute("rel","stylesheet");
		(document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag1);

		var script_tag2 = document.createElement('link');
		script_tag2.setAttribute("type","text/css");
		script_tag2.setAttribute("href","http://www.freeptools.com/mapster/css/colorbox.css");
		script_tag2.setAttribute("rel","stylesheet");
		(document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag2);


		/******** Our main function ********/


		//super annoying loader, but necessary
		var loader = parentElem.addEventListener("load", function(event) {
			if (event.target.nodeName === "SCRIPT"){
				//first we look for our scripts being loaded successfully
				if(nameCheck("three.min.js", event.target.getAttribute("src")) >= 0){
					if(paramD == "dev"){
						console.log('Done Loading: three.min.js');
					}
					loader1 = true;
					//load the rest of the scripts - this same listener should see their additions
					if(typeof $.colorbox == 'undefined'){ //colorbox
						loadScript("jquery.colorbox.js");
					}
					else{
						if(paramD == "dev"){
							console.log("Already Loaded: jquery.colorbox.js");
						}
						loader6 = true;
					}

					if(typeof THREE.OrbitControls == 'undefined'){ //three.js - orbit
						loadScript("controls/OrbitControls.js");
					}
					else{
						if(paramD == "dev"){
							console.log("Already Loaded: controls/OrbitControls.js");
						}
						loader2 = true;
					}

					if(typeof THREE.CSS3DRenderer == 'undefined'){ //three.js - CSS3DRenderer
						loadScript("renderers/CSS3DRenderer.js");
					}
					else{
						if(paramD == "dev"){
							console.log("Already Loaded: renderers/CSS3DRenderer.js");
						}
						loader3 = true;
					}

					if(typeof THREE.StereoEffect == 'undefined'){ //three.js - StereoEffect
						loadScript("effects/StereoEffect.js");
					}
					else{
						if(paramD == "dev"){
							console.log("Already Loaded: effects/StereoEffect.js");
						}
						loader4 = true;
					}

					if(typeof THREE.DeviceOrientationControls == 'undefined'){ //three.js - device orientation
						loadScript("controls/DeviceOrientationControls.js");
					}
					else{
						if(paramD == "dev"){
							console.log("Already Loaded: controls/DeviceOrientationControls.js");
						}
						loader5 = true;
					}

				}
				if(nameCheck("OrbitControls.js", event.target.getAttribute("src")) >= 0){
					if(paramD == "dev"){
						console.log('Done Loading: OrbitControls.js');
					}
					loader2 = true;
				}
				if(nameCheck("CSS3DRenderer.js", event.target.getAttribute("src")) >= 0){
					if(paramD == "dev"){
						console.log('Done Loading: CSS3DRenderer.js');
					}
					loader3 = true;
				}
				if(nameCheck("StereoEffect.js", event.target.getAttribute("src")) >= 0){
					if(paramD == "dev"){
						console.log('Done Loading: StereoEffect.js');
					}
					loader4 = true;
				}
				if(nameCheck("DeviceOrientationControls.js", event.target.getAttribute("src")) >= 0){
					if(paramD == "dev"){
						console.log('Done Loading: DeviceOrientationControls.js');
					}
					loader5 = true;
				}
				if(nameCheck("jquery.colorbox.js", event.target.getAttribute("src")) >= 0){
					if(paramD == "dev"){
						console.log('Done Loading: jquery.colorbox.js');
						console.log('-----');
						console.log(typeof $.colorbox);
						console.log('-----');
					}
					loader6 = true;
				}

				if(loader1 == true && loader2 == true && loader3 == true && loader4 == true && loader5 == true && loader6 == true && typeof $.slyPano == "undefined"){
					if(paramD == "dev"){
						console.log('launching app');
					}
					$.slyPano = { //create a function really just to track it - could be done a million times better
						init: function(){
							var myPlugin = $.slyPano;

							// Attach jQuery Object Prototype (fn function)
							$.fn.slyPano = myPlugin.fn;

							// Attach DomReady
							$(function(){
								myPlugin.domReady();
							});
						}
					};
					main();
				}
			}
		}, true);


		$(document).delegate(".container360").resize(function(event){
			//isn't getting triggered for some reason
			//console.log(box.width());
			//console.log(box.height());
			containers[panoID].camera.aspect = box.width() / box.height()
			containers[panoID].camera.updateProjectionMatrix();
			containers[panoID].renderer.setSize(box.width(), box.height());
			containers[panoID].rendererCSS.setSize(box.width(), box.height());
		});

		function onDeviceOrientationChangeEvent( event ) {
			alpha = event.alpha;
			beta = event.beta;
			gamma = event.gamma;
		}

		function main(){

			//placed here for scoping issues
			var panoFullScreen = $(document).delegate(".panoFullScreen",'click', function(e){
				var container = $(this).parent();
				var panoID = $(this).parent().attr('id');

				$.colorbox({
					inline:true,
					href: container,
					width:"80%",
					height:"80%",
					onComplete:function(){
						//console.log("Pano: "+ panoID);
						//set the new dimensions
						container.width($("#cboxLoadedContent").width());
						container.height($("#cboxLoadedContent").height());
						containers[panoID].camera.aspect = $("#cboxLoadedContent").width() / $("#cboxLoadedContent").height()
						containers[panoID].camera.updateProjectionMatrix();
						containers[panoID].renderer.setSize($("#cboxLoadedContent").width(), $("#cboxLoadedContent").height());
						containers[panoID].rendererCSS.setSize($("#cboxLoadedContent").width(), $("#cboxLoadedContent").height());

					},
					onClosed:function(){
						container.width(containers[panoID].baseX);
						container.height(containers[panoID].baseY);
						//trigger the resize/rerender
						containers[panoID].camera.aspect = containers[panoID].baseX / containers[panoID].baseY
						containers[panoID].camera.updateProjectionMatrix();
						containers[panoID].renderer.setSize(containers[panoID].baseX, containers[panoID].baseY);
						containers[panoID].rendererCSS.setSize(containers[panoID].baseX, containers[panoID].baseY);
					}
				});
			});

			var panoOrigScreen = $(document).delegate(".panoOrigScreen",'click', function(e){
				var panoID = $(this).parent().attr('id');
				$(this).parent().removeClass("panoFull");
				$(this).parent().width(containers[panoID].baseX);
				$(this).parent().height(containers[panoID].baseY);
				//trigger the resize/rerender
				containers[panoID].camera.aspect = containers[panoID].baseX / containers[panoID].baseY
				containers[panoID].camera.updateProjectionMatrix();
				containers[panoID].renderer.setSize(containers[panoID].baseX, containers[panoID].baseY);
				containers[panoID].rendererCSS.setSize(containers[panoID].baseX, containers[panoID].baseY);
				//now we scroll to it
				$('html, body').animate({scrollTop: $(this).parent().offset().top}, 2000);
			});

			//console.log('here');
            /******* Load HTML *******/
			//get my objects based on their class. do a foreach with them, then pull the list attribute, and query things based on the value. that will auto populate everything.
			$('.container360').each(function(i, obj){
				$(this).html("<img src='http://www.freep.com/includes/pollster/ajax-loader.gif' style='margin-left:auto;margin-right:auto;'>");

				//hitting some scoping issues.. need to add this line for the next loop
				var box = $(this); //jquery object
				var box2 = this; //dom object

				var panoID = $(this).attr('id');

				containers[panoID] = box; //keep a reference of our jquery object
				//setup some our base item vars
				containers[panoID].baseX = box.width();
				containers[panoID].baseY = box.height();
				containers[panoID].isUserInteracting = false;
				containers[panoID].sbs = false;
				var paramsbs = getParameterByName("sbs");
				if(paramsbs == "true"){
					containers[panoID].sbs = true;
				}

				var jsonp_url = BASE_URL+"widget.php?d=getPanoJSON&panoID="+ panoID +"&callback=?";

				var count = 0;

				var animate = function(){
					window.requestAnimationFrame(animate);
					containers[panoID].controls.update();

					if(containers[panoID].sbs === true){ //test for stereo effect
						containers[panoID].effect.render(containers[panoID].cssScene, containers[panoID].camera);  //html embed
						containers[panoID].effect.render(containers[panoID].scene, containers[panoID].camera); //the pano
					}
					else{
						containers[panoID].rendererCSS.render(containers[panoID].cssScene, containers[panoID].camera);  //html embed
						containers[panoID].renderer.render(containers[panoID].scene, containers[panoID].camera); //the pano
					}

					if(paramD == "dev"){
						$(".debug").html("polar(up) Degrees: "+ containers[panoID].controls.getPolarAngle()*(180.0/3.14159265) +"<br>");
						$(".debug").append("polar(up) Rads: "+ containers[panoID].controls.getPolarAngle() +"<br>");

						$(".debug").append("azimuth(left) Degrees: "+ containers[panoID].controls.getAzimuthalAngle()*(180.0/3.14159265)+"<br>");
						$(".debug").append("azimuth(left) Rads: "+ containers[panoID].controls.getAzimuthalAngle()+"<br>");
					}
				};

				if(paramD == "dev"){
					console.log(jsonp_url);
				}

				$.getJSON(jsonp_url, function(data){
					box.html(''); //clear anything there initially
					box.append('<div class="info">'+ data.title +'</div>');
					if(typeof $.colorbox != 'undefined'){ //presto seems to be rejecting this for some reason
						box.append('<img class="panoFullScreen" src="http://www.freeptools.com/mapster/images/view-fullscreen-4.png">');
					}
					//box.append('<img class="panoOrigScreen" src="http://www.freeptools.com/mapster/images/document-close-3.png">');

					if(paramD == "dev"){
						console.log(data);
					}

					containers[panoID].camera = new THREE.PerspectiveCamera(75, box.width() / box.height(), 1, 1100);
					//containers[panoID].camera.position.set( 600, 400, 1100 );

					//console.log(panoID);

					containers[panoID].camera.position.z = 1;

					containers[panoID].scene = new THREE.Scene();

                    containers[panoID].geometry = new THREE.SphereGeometry( 500, 120, 80 );
                    containers[panoID].geometry.applyMatrix( new THREE.Matrix4().makeScale( -1, 1, 1 ) );

					var myImage = new Image(); //who cares about browser security and cross domain access anyways!?
					myImage.src = "data:image/jpeg;base64,"+data['raw'];
					var mapOverlay = new THREE.ImageUtils.loadTexture(myImage.src);

					containers[panoID].material = new THREE.MeshBasicMaterial( {
						map: mapOverlay,
						needsUpdate: true
					});

					containers[panoID].mesh = new THREE.Mesh( containers[panoID].geometry, containers[panoID].material );
					containers[panoID].scene.add( containers[panoID].mesh );

					// Create our Coaster
					// create a new scene to hold CSS
					containers[panoID].cssScene = new THREE.Scene();
					element = document.createElement('img');
					element.className = 'htmlembed';
					element.src = "http://www.freeptools.com/mapster/360s/"+data.coaster;
					var aspectRatio = box.height() / box.width();
					var elementHeight = box.width() * aspectRatio;

					// create a CSS3DObject to display element
					cssObject['coaster'] = new THREE.CSS3DObject(element);
					// synchronize cssObject position/rotation with planeMesh position/rotation
					cssObject['coaster'].position = containers[panoID].mesh.position;
					cssObject['coaster'].position.x = 0;
					cssObject['coaster'].position.y = -1000;
					cssObject['coaster'].position.z = 0;
					cssObject['coaster'].rotateOnAxis(new THREE.Vector3(1, 1, 1).normalize(), 4); //rotates it magically or something
					cssObject['coaster'].rotation = containers[panoID].mesh.rotation;
					// resize cssObject to same size as planeMesh (plus a border)
					var percentBorder = 0.05;
					cssObject['coaster'].scale.x /= (1 + percentBorder) * (box.width() / box.width());
					cssObject['coaster'].scale.y /= (1 + percentBorder) * (box.width() / box.width());
					containers[panoID].cssScene.add(cssObject['coaster']);

					// create a renderer for CSS
					containers[panoID].rendererCSS = new THREE.CSS3DRenderer();
					containers[panoID].rendererCSS.setSize(box.width(), box.height());
					containers[panoID].rendererCSS.domElement.style.position = 'absolute';
					containers[panoID].rendererCSS.domElement.style.top = 0;
					containers[panoID].rendererCSS.domElement.style.margin = 0;
					containers[panoID].rendererCSS.domElement.style.padding = 0;
					//containers[panoID].rendererCSS.domElement.style.position = "absolute"; //html
					containers[panoID].rendererCSS.domElement.style.zIndex = 2; //html

					containers[panoID].renderer = new THREE.WebGLRenderer({antialias:true});
					containers[panoID].renderer.setPixelRatio(window.devicePixelRatio); //need to look into this one...
					containers[panoID].renderer.setSize(box.width(), box.height());
					containers[panoID].renderer.domElement.style.position = 'absolute';
					containers[panoID].renderer.domElement.style.top = 0;

					// make sure original renderer appears on top of CSS renderer
					containers[panoID].renderer.domElement.style.zIndex = 1; //html
					//containers[panoID].rendererCSS.domElement.appendChild(containers[panoID].renderer.domElement);

					if(containers[panoID].sbs === true){
						containers[panoID].effect = new THREE.StereoEffect(containers[panoID].renderer);
						containers[panoID].effect.setSize(box.width(), box.height());
					}

					box2.appendChild(containers[panoID].rendererCSS.domElement);
					box2.appendChild(containers[panoID].renderer.domElement);

					//camera controllers - tablet vs mouse
					//if((alpha == null) && (beta == null) && (gamma == null)) {
						containers[panoID].controls = new THREE.OrbitControls(containers[panoID].camera, box2); //track the movements of the container.
						containers[panoID].controls.damping = 0.2;
						containers[panoID].controls.noPan = true;
						containers[panoID].controls.noKeys = true;
						containers[panoID].controls.noZoom = true;

						containers[panoID].controls.rotateLeft(data.posX*-1);
						//containers[panoID].controls.rotateLeft(1.997597527206215);
						containers[panoID].controls.rotateUp(data.posY*.195);

						//containers[panoID].controls.object.rotation.x = data.posX;
						//containers[panoID].controls.object.rotation.y = data.posY;
						//containers[panoID].controls.object.rotation.z = data.posZ;

						//containers[panoID].controls.target.copy( containers[panoID].camera.rotation );

					//}
					//else{
					//	containers[panoID].controls = new THREE.DeviceOrientationControls(containers[panoID].camera, containers[panoID].renderer.domElement);
					//}

					animate();

	        	}); // end of json call
			}); // end of 360container.each
		}// end of main() function

	}); // end of document.ready

})(jQuery);

function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(location.search);
	return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function nameCheck(needle, haystack){
	var n = haystack.search(needle, "i");
	return n;
}

function getScripts(inserts, callback){
    var nextInsert = inserts.shift();
    if (nextInsert != undefined){
        console.log("calling"+nextInsert);
    jQuery.getScript("http://www.freeptools.com/mapster/js/"+nextInsert, function(){ getScripts(inserts, callback); });
            //.fail(function(jqxhr, settings, exception){alert("including "+nextInsert+" failed:\n" +exception)});
    }
    else{
        if (callback != undefined) callback();
    }
};