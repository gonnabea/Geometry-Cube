let camera, scene, renderer
let mesh

init()
animate()

function init() {
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000)
  camera.position.z = 400

  scene = new THREE.Scene()

  const texture = new THREE.TextureLoader().load("./Resources/Stars.jpg")

  const geometry = new THREE.BoxBufferGeometry(200, 200, 200)
  // MeshBasicMaterial은 광원을 생성하지 않는 재질
  const material = new THREE.MeshBasicMaterial({ map: texture })

  mesh = new THREE.Mesh(geometry, material)

  scene.add(mesh)

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  // renderer.domElement refers to the <canvas> element where the scene will be rendered
  document.body.appendChild(renderer.domElement)

  window.addEventListener("resize", onMouseResize, false)
}

function onMouseResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  // 투영 행렬이라는 3D를 2D로 변환할 때 사용하는 엄청 복잡한 과정이 있나보다 그걸 화면에 업데이트해주는 것
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
}

function animate() {
  requestAnimationFrame(animate)

  mesh.rotation.x += 0.005
  mesh.rotation.y += 0.01
  renderer.render(scene, camera)
}
