let camera
let controls
let scene
let renderer

init()
//render(); // remove when using next line for animation loop (requestAnimationFrame)
animate()

function init() {
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xcccccc)
  // 비교적 빠르고 가까이 있는 물체에 시야를 제공하는 안개효과
  scene.fog = new THREE.FogExp2(0xcccccc, 0.002)

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000)
  camera.position.set(400, 200, 0)

  // controls

  controls = new THREE.MapControls(camera, renderer.domElement)

  //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

  // Damping은 제동이라는 뜻인데 드래그했을 때 천천히 느려지는 효과를 적용하는 것인듯 하다. (부드러운 제동 효과)
  controls.enableDamping = true // an animation loop is required when either damping or auto-rotation are enabled
  controls.dampingFactor = 0.05

  // 마우스 왼클릭했을 때 시점을 이동시키는 듯.
  // true로 설정 시 그냥 제자리에서 고개만 돌리기
  controls.screenSpacePanning = false

  controls.minDistance = 100
  controls.maxDistance = 500

  //  How far you can orbit vertically, upper limit. Range is 0 to Math.PI radians, and default is Math.PI.
  // 수직이동 범위 설정.
  controls.maxPolarAngle = Math.PI / 2
  // world

  const geometry = new THREE.BoxBufferGeometry(1, 1, 1)
  geometry.translate(0, 0.5, 0)
  // MeshPhongMaterial: 대충 광원 효과가 있는 매테리얼
  // 플랫한 그림자 생성
  const material = new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true })

  for (let i = 0; i < 500; i++) {
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.x = Math.random() * 1600 - 800
    mesh.position.y = 0
    mesh.position.z = Math.random() * 1600 - 800
    mesh.scale.x = 20
    mesh.scale.y = Math.random() * 80 + 10
    mesh.scale.z = 20
    // 매틑릭스 수동 업데이트
    mesh.updateMatrix()
    // 매 프레임마다 매트릭스를 업데이트.
    mesh.matrixAutoUpdate = false
    scene.add(mesh)
  }

  // lights

  const dirLight1 = new THREE.DirectionalLight(0xffffff)
  dirLight1.position.set(1, 1, 1)
  scene.add(dirLight1)

  const dirLight2 = new THREE.DirectionalLight(0x002288)
  dirLight2.position.set(-1, -1, -1)
  scene.add(dirLight2)

  const ambientLight = new THREE.AmbientLight(0x222222)
  scene.add(ambientLight)

  //

  window.addEventListener("resize", onWindowResize, false)

  const gui = new dat.GUI()
  gui.add(controls, "screenSpacePanning")
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
}

function animate() {
  requestAnimationFrame(animate)

  controls.update() // only required if controls.enableDamping = true, or if controls.autoRotate = true

  render()
}

function render() {
  renderer.render(scene, camera)
}
