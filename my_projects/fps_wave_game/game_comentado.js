// Importa a biblioteca Three.js para renderização 3D
import * as THREE from 'https://unpkg.com/three@0.168.0/build/three.module.js';

// Cria a cena 3D
const scene = new THREE.Scene();
// Cria a câmera com perspectiva (FOV: 75°, aspect: window, near: 0.1, far: 1000)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Cria o renderizador WebGL com anti-aliasing ativado
const renderer = new THREE.WebGLRenderer({ antialias: true });
// Define o tamanho do renderizador para o tamanho da janela
renderer.setSize(window.innerWidth, window.innerHeight);
// Ajusta o pixel ratio para a densidade de pixels do dispositivo
renderer.setPixelRatio(window.devicePixelRatio);
// Adiciona o canvas do renderizador ao body da página
document.body.appendChild(renderer.domElement);

// Event listener para atualizar tamanho quando a janela redimensionar
window.addEventListener('resize', () => {
    // Pega as novas dimensões da janela
    const width = window.innerWidth;
    // Pega a altura atual da janela
    const height = window.innerHeight;
    // Atualiza o tamanho do renderizador
    renderer.setSize(width, height);
    // Atualiza o aspect ratio da câmera
    camera.aspect = width / height;
    // Aplica as mudanças da câmera
    camera.updateProjectionMatrix();
});

// Pega elemento HTML com id 'start'
const startText = document.getElementById("start");
// Pega elemento HTML com id 'paused'
const pausedText = document.getElementById("paused");
// Pega elemento HTML com id 'game_over'
const game_over = document.getElementById("game_over");

// Booleana para verificar quando o jogo inicializar pela primeira vez
let startGame = false;

// Booleana para verificar se o jogador morreu
let gameOver = false;

// Relógio para calcular o deltaTime entre frames
const clock = new THREE.Clock();

// Função principal que atualiza o jogo a cada frame
function update(){
    // Obtém o tempo passado desde o último frame
    const deltaTime = clock.getDelta();

    // Verifica se o usuário clicou usando o 'isPointerLock'
    if (isPointerLock === true && gameOver === false){
        // Executa movimentação WASD
        WASD();
        // Executa disparo de balas
        shoot();
        // Limita rotação vertical da câmera
        rotateX();
        // Aplica gravidade ao jogador
        gravity();
        // Verifica se o jogador está no chão
        onGround();
        // Atualiza status do menu debug
        debugMenuStatus();
        // Atualiza UI do debug (coordenadas)
        updateDebugUI();
        // Executa pulo do jogador
        jump_();
        // Spawna inimigos
        spawnEnemies();
        // Gerencia waves de inimigos
        enemiesWave(deltaTime);
        // Movimenta inimigos
        enemiesMove(deltaTime);
        // Atualiza UI do jogador
        playerUI_();
        // Atualiza UI geral
        UI_();
        // Rotaciona o cubo (se ativado)
        rotationCube();
        // Muda cor RGB do cubo (se ativado)
        cubeRGB(deltaTime);
        // Inimigos disparam balas
        enemyShoot(deltaTime);

        // Atualiza texto de rotação do cubo
        cube_rotation.innerText = cubeRotation;
        // Atualiza texto de cor RGB do cubo
        cube_color_RGB.innerText = cubeColorRGB;
        
        // Marca que o jogo iniciou
        startGame = true;

        // Esconde o texto de pausa
        pausedText.classList.add("hidden");
        
        // Atualiza texto de saúde do jogador
        playerHealth.innerText = `Vida: ${player.userData.health}`;
        // Atualiza texto de wave atual
        waveUI.innerText = `Wave: ${waveRound}`;
        
    }else{
        
        // Roda só uma vez antes do jogo começar pela primeira vez 
        if (startGame === true && gameOver === false){
            
            // Mostra o texto de pausa
            pausedText.classList.remove("hidden");  
        }
    }
    
    // Se o jogo começou, esconde o texto inicial
    if (startGame === true){
        startText.classList.add("hidden");
    }
    
    // Se a saúde do jogador chegou a 0, o jogo acabou
    if (player.userData.health <= 0){
        // Marca jogo como terminado
        gameOver = true;
        // Sai do pointer lock
        document.exitPointerLock();
        // Mostra tela de game over
        game_over.classList.remove("hidden");
    }

    // Solicita próximo frame de animação
    requestAnimationFrame(update);
    // Renderiza a cena com a câmera
    renderer.render(scene, camera);
}

// Pega elemento HTML com id 'debug_ui'
const debug_ui = document.querySelector("#debug_ui");
// Pega elemento HTML com id 'coords' para mostrar coordenadas
const coordsElement = document.querySelector("#coords");

// Pega elemento HTML com id 'cube_rotation' para mostrar rotação do cubo
const cube_rotation = document.getElementById("cube_rotation");
// Pega elemento HTML com id 'cube_color_RGB' para mostrar cor RGB do cubo
const cube_color_RGB = document.getElementById("cube_color_RGB");

// Pega elemento HTML com id 'player_health' para mostrar saúde do jogador
const playerHealth = document.getElementById("player_health");
// Pega elemento HTML com id 'player_UI' para mostrar UI do jogador
const playerUI = document.getElementById("player_UI");

// Pega elemento HTML com id 'UI' para mostrar UI geral
const UI = document.getElementById("UI");
// Pega elemento HTML com id 'wave' para mostrar número da wave
const waveUI = document.getElementById("wave");

// Booleana para verificar se o menu debug está ativo
let debugAtivo = false;

// Função que verifica se o menu debug está ativo
function debugMenuStatus(){
    // Se o menu debug não tem a classe 'hidden', então está ativo
    if (!debug_ui.classList.contains("hidden")){
        // Menu está ativo
        debugAtivo = true;

    }else{
        // Menu está inativo
        debugAtivo = false;
    }
}

// Função que atualiza UI do jogador (esconde/mostra baseado em condições)
function playerUI_(){

    // Se o jogo começou, mostra a UI do jogador
    if (startGame === true){
        playerUI.classList.remove("hidden");
    }

    // Se debug está ativo, esconde a UI do jogador
    if (debugAtivo === true){
        playerUI.classList.add("hidden");

    }else{
        // Se debug está inativo, mostra a UI do jogador
        playerUI.classList.remove("hidden");
    }
}

// Função que atualiza UI geral (esconde/mostra baseado em condições)
function UI_(){
    // Se o jogo começou, mostra a UI geral
    if (startGame === true){
        UI.classList.remove("hidden");
    }

    // Se debug está ativo, esconde a UI geral
    if (debugAtivo === true){
        UI.classList.add("hidden");

    }else{
        // Se debug está inativo, mostra a UI geral
        UI.classList.remove("hidden");
    }
}

// Função que atualiza as coordenadas do jogador no menu debug
function updateDebugUI(){
    // Atualiza o texto com as coordenadas x, y, z do jogador
    coordsElement.innerText = `x: ${player.position.x.toFixed(2)}` + " | " + `y: ${player.position.y.toFixed(2)}` + " | " + `z: ${player.position.z.toFixed(2)}`;
}

// Booleana para verificar se o cubo deve rotacionar
let cubeRotation = false;
// Booleana para verificar se o cubo deve mudar cor RGB
let cubeColorRGB = false;

// Cria luz ambiente branca com intensidade 1.5
const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1.5);
// Adiciona a luz à cena
scene.add(ambientLight);

// Cria a geometria do cubo (1x1x1)
const geometryCube = new THREE.BoxGeometry(1, 1, 1);
// Cria material amarelo para o cubo
const materialCube = new THREE.MeshBasicMaterial({color: 0xfcba03});
// Cria o mesh do cubo combinando geometria e material
const cube = new THREE.Mesh(geometryCube, materialCube);

// Cria o Mesh do Player (invisível pois é apenas para colisão/posicionamento)
const player = new THREE.Mesh(
    // Cria geometria 1x1x1
    new THREE.BoxGeometry(1, 1, 1),
    // Material invisível
    new THREE.MeshBasicMaterial({visible: false})
);

// Cria o Mesh da Bala do jogador
const bullet = new THREE.Mesh(
    // Cria geometria pequena 0.25x0.25x0.25
    new THREE.BoxGeometry(0.25, 0.25, 0.25),
    // Material azul para as balas do jogador
    new THREE.MeshBasicMaterial({color: 0x0400ed})
);

// Cria o Mesh da Bala do Inimigo
const enemyBullet = new THREE.Mesh(
    // Cria geometria pequena 0.25x0.25x0.25
    new THREE.BoxGeometry(0.25, 0.25, 0.25),
    // Material azul para as balas do inimigo
    new THREE.MeshBasicMaterial({color: 0x0400ed})
);

// Cria o Mesh do Chão
const ground = new THREE.Mesh(
    // Cria plano 50x50
    new THREE.PlaneGeometry(50, 50),
    // Material amarelo com dois lados visíveis
    new THREE.MeshStandardMaterial({color: 0xffff00, side: THREE.DoubleSide})
);

// Define nome 'cube' para identificação
cube.name = "cube";
// Define nome 'ground' para identificação
ground.name = "ground";

// Adiciona o Chão à cena
scene.add(ground);

// Rotaciona o Chão 90 graus em X para deixá-lo deitado (horizontal)
ground.rotation.x = Math.PI / 2;

// Muda a posição do 'y' para -1 (abaixo do jogador)
ground.position.y = -1;

// Adiciona o jogador à cena
scene.add(player);
// Adiciona a câmera como filho do jogador (se move com ele)
player.add(camera);

// Define saúde inicial do jogador em 300
player.userData.health = 300;

// Adiciona o cubo à cena
scene.add(cube);
// Define posição Z do cubo (longe na câmera)
cube.position.z = -2;
// Define posição Y do cubo (um pouco acima do solo)
cube.position.y = 1;

// Velocidade de rotação do cubo
let i = 0.005;

// Função que rotaciona o cubo (se ativado)
function rotationCube(){
    // Se a rotação está ativada
    if(cubeRotation === true){
        // Rotaciona em Y (giro horizontal)
        cube.rotation.y += i;
        // Rotaciona em X (giro vertical)
        cube.rotation.x += i;
    }
}

// Valor de vermelho na cor RGB (0-255)
let r = 255;
// Valor de verde na cor RGB (0-255)
let g = 0;
// Valor de azul na cor RGB (0-255)
let b = 0;

// String que armazena a cor em formato RGB
let rgb = "";
// Velocidade de mudança de cor
const colorSpeed = 60;

// Função que muda a cor RGB do cubo (se ativado)
function cubeRGB(deltaTime){
    // Se a mudança de cor está ativada
    if (cubeColorRGB === true){
        // Aumenta o valor de vermelho baseado no delta time
        r += deltaTime * colorSpeed;

    }else{
        // Não faz nada
    }

    // Se vermelho ultrapassou 255, volta para 0
    if (r > 255) r = 0;
    // Se verde ultrapassou 255, volta para 0
    if (g > 255) g = 0;
    // Se azul ultrapassou 255, volta para 0
    if (b > 255) b = 0;

    // Converte vermelho para inteiro
    const ri = Math.floor(r);
    // Converte verde para inteiro
    const gi = Math.floor(g);
    // Converte azul para inteiro
    const bi = Math.floor(b);

    // Cria string com formato RGB
    rgb = `rgb(${ri}, ${gi}, ${bi})`;

    // Define a cor do cubo
    cube.material.color.set(rgb);

};

// Booleana para tecla W pressionada
let w = false;
// Booleana para tecla S pressionada
let s = false;
// Booleana para tecla A pressionada
let a = false;
// Booleana para tecla D pressionada
let d = false;

// Booleana para tecla ESPAÇO pressionada
let space = false;
// Booleana para tecla SHIFT pressionada
let shift = false;

// Velocidade de movimento padrão
let moveSpeed = 0.1;

// Vetor que aponta para frente do jogador
const forward = new THREE.Vector3();
// Vetor que aponta para direita do jogador
const right = new THREE.Vector3();
// Vetor que aponta para cima
const up = new THREE.Vector3();

// Função que movimenta o jogador com WASD
function WASD(){
    // Define o vetor forward baseado na rotação do jogador
    forward.set(0, 0, -1).applyQuaternion(player.quaternion);
    // Define o vetor right baseado na rotação do jogador
    right.set(1, 0, 0).applyQuaternion(player.quaternion);
    // Define o vetor up (sempre para cima)
    up.set(0, 1, 0);
    
    // Vetor que armazena o movimento total
    const move = new THREE.Vector3();
    
    // Se W está pressionado, move para frente
    if (w === true){
        move.add(forward);
    }
    // Se S está pressionado, move para trás
    if (s === true){
        move.sub(forward);
    }
    // Se A está pressionado, move para esquerda
    if (a === true){
        move.sub(right);
    }
    // Se D está pressionado, move para direita
    if (d === true){
        move.add(right);
    }
    
    // Se SHIFT está pressionado, aumenta velocidade
    if (shift === true){
        moveSpeed = 0.2;
        
    }else{
        // Velocidade padrão
        moveSpeed = 0.1;
        
    }
    
    // Aplica velocidade ao movimento
    move.multiplyScalar(moveSpeed);
    // Adiciona o movimento à posição do jogador
    player.position.add(move);
}

// Velocidade vertical do jogador
let velocityY = 0;
// Força do pulo
const jumpForce = 0.4;
// Força da gravidade
const gravityForce = 0.03;

// Função que faz o jogador pular
function jump_(){
    // Se pode pular e ESPAÇO foi pressionado
    if (canJump === true && space === true){
        // Aplica força de pulo na velocidade vertical
        velocityY = jumpForce;
        // Marca que já usou o pulo (até tocar o chão novamente)
        canJump = false;
    }
}

// Função que aplica gravidade ao jogador
function gravity(){
    // Diminui velocidade vertical (simula gravidade)
    velocityY -= gravityForce;
    // Aplica velocidade vertical à posição
    player.position.y += velocityY;
    
    // Se jogador caiu abaixo de 0 (chão)
    if (player.position.y <= 0){
        // Posiciona jogador no chão
        player.position.y = 0;
        // Reseta velocidade vertical
        velocityY = 0;
        // Permite pular novamente
        canJump = false;
    }
    
}

// Raycaster para detecção de colisões
const raycaster = new THREE.Raycaster();
// Vetor de origem para raycaster
const origin = new THREE.Vector3();

// Booleana para controlar disparo de balas
let bulletBool = false;

// Velocidade de movimento da bala
const bulletSpeed = 0.5;

// Distância máxima para despawn da bala
const despawnBulletDis = 80;

// Array que armazena as balas ativas
let bullets = [];

// Vetor que armazena a direção da bala
const direction = new THREE.Vector3();

// Função que cria uma nova bala
function createBullet(){
    // Clona o modelo de bala
    const bulletClone = bullet.clone();

    // Usa a direção real da câmera no mundo para evitar quaternion invertido
    camera.getWorldDirection(direction);

    // Posiciona a bala na posição atual da câmera para sair exatamente de onde o jogador mira
    camera.getWorldPosition(origin);

    // Define posição da bala clonada
    bulletClone.position.copy(origin);
    // Define direção normalizada da bala
    bulletClone.direction = direction.clone().normalize();

    // Adiciona a bala à cena
    scene.add(bulletClone);

    // Adiciona a bala clonada como último lugar na lista de balas
    bullets.push(bulletClone);
}

// Cria os vetores de posição do player e da bala
const posPlayer = new THREE.Vector3();
const posBullet = new THREE.Vector3();

// Função que dispara e gerencia balas
function shoot(){
    // Se o botão de disparo foi pressionado
    if (bulletBool === true){
        // Cria uma nova bala
        createBullet();
        // Reseta o flag de disparo
        bulletBool = false;
    }
    
    // Percorre a lista de balas enquanto não estiver vazia
    for (let i = 0; bullets.length > i; i++){
        // Adiciona velocidade a cada bala já com a rotação certa
        bullets[i].position.add(bullets[i].direction.clone().multiplyScalar(bulletSpeed));
        
        // Verifica se a bala atingiu um inimigo
        const hitEnemy = checkBulletEnemyCollision(bullets[i]);
        
        // Se a bala atingiu um inimigo
        if (hitEnemy !== null) {
            // Diminui saúde do inimigo
            hitEnemy.userData.health--;
            
            // Se o inimigo morreu
            if (hitEnemy.userData.health < 1) {
                // Remove inimigo da cena
                scene.remove(hitEnemy);
                // Marca inimigo como morto
                hitEnemy.userData.alive = false;
                
                // Remove o inimigo do array
                const enemyIndex = enemies.indexOf(hitEnemy);
                if (enemyIndex > -1) {
                    enemies.splice(enemyIndex, 1);
                }
            }
            
            // Remove a bala da cena
            scene.remove(bullets[i]);
            // Remove a bala do array
            bullets.splice(i, 1);
            i--;
            
            continue;
        }

        // Atribui a posição global do player para o vetor
        player.getWorldPosition(posPlayer);
        // Atribui a posição global da bala para o vetor
        bullets[i].getWorldPosition(posBullet);
        
        // Calcula a distância do player para a bala
        const distancePlayerBullet = posPlayer.distanceTo(posBullet);
        
        // Se a bala estiver a 'despawnBulletDis' de distância do player ela é removida
        if (distancePlayerBullet > despawnBulletDis){
            // Remove a bala da cena
            scene.remove(bullets[i]);
            
            // Remove a bala da lista
            bullets.splice(i, 1);
            i--;
            
            continue;
        }
        
    }
}

// Array que armazena inimigos ativos
let enemies = [];
// Booleana para verificar se inimigos já foram spawnados nesta wave
let enemiesSpawned = false;

// Número da wave atual
let waveRound = 0;
// Tempo decorrido desde o fim da última wave
let nextWaveTimer = 0;
// Tempo de espera para proxima wave
let cooldownNextWave = 4;

// Quantidade de inimigos a spawnar nesta wave
let qtdEnemiesSpawn = 1;

// Função que gerencia as waves de inimigos
function enemiesWave(deltaTime){
    // Se não há mais inimigos vivos
    if (enemies.length <= 0){
        // Incrementa o tempo de espera
        nextWaveTimer += deltaTime;

        // Se passou tempo suficiente para nova wave
        if (nextWaveTimer >= cooldownNextWave){
            // Incrementa o número da wave
            waveRound += 1;
            
            // Se a wave é múltipla de 5 (5, 10, 15, etc)
            if (waveRound % 5 === 0){
                // Adiciona 3 inimigos extras para wave especial
                qtdEnemiesSpawn += 3;
                
            }else{
                // Spawna +1 inimigo a cada wave nova
                qtdEnemiesSpawn += 1;
            }

            // Reseta o timer
            nextWaveTimer = 0;
            // Marca que os inimigos ainda não foram spawnados
            enemiesSpawned = false;
            
        }
    }
}

// Função que spawna os inimigos da wave
function spawnEnemies(){
    // Se os inimigos já foram spawnados, não faz nada
    if (enemiesSpawned === true) return;
    
    // Cria tantos inimigos quanto definido em qtdEnemiesSpawn
    for (let i = 0; i < qtdEnemiesSpawn; i++){
        // Cria um novo mesh do inimigo
        const enemy = new THREE.Mesh(
            // Cria geometria 1x2x1 (mais alto que largo)
            new THREE.BoxGeometry(1, 2, 1),
            // Cria material com cor aleatória entre vermelho e laranja
            new THREE.MeshBasicMaterial({color: Math.random() > 0.5 ? 0xff4444 : 0xff8844})
        )

        // Define saúde inicial do inimigo em 3
        enemy.userData.health = 3;
        // Define que o inimigo está vivo
        enemy.userData.alive = true;

        // Variáveis para armazenar posição X e Z
        let x = 0, z = 0;

        // Loop que gera posição aleatória longe do jogador
        do{
            // Gera posição X aleatória entre -75 e 75
            x = (Math.random() - 0.5) * 150;
            // Gera posição Z aleatória entre -75 e 75
            z = (Math.random() - 0.5) * 150;

        }while (Math.sqrt(x*x + z*z) < 20) // Define a posição para spawn de inimigo longe do player
        
        // Define posição do inimigo
        enemy.position.set(x, 0, z);

        // Inicializa cooldown de ataque do inimigo
        enemy.userData.attackCooldown = 0;

        // Adiciona o inimigo à cena
        scene.add(enemy);
        // Adiciona o inimigo ao array de inimigos
        enemies.push(enemy);
        
    }

    // Marca que os inimigos foram spawnados
    enemiesSpawned = true;
}

// Vetor que armazena posição do inimigo
const posEnemy = new THREE.Vector3();

// Função que verifica colisão entre bala e inimigo
function checkBulletEnemyCollision(bullet) {
    // Percorre cada inimigo no array
    for (let j = 0; j < enemies.length; j++){
        // Pega o inimigo atual
        const enemy = enemies[j];
        // Se o inimigo não está vivo, pula para próximo
        if (!enemy.userData.alive) continue;

        // Pega posição global da bala
        bullet.getWorldPosition(posBullet);
        // Pega posição global do inimigo
        enemy.getWorldPosition(posEnemy);

        // Calcula distância entre bala e inimigo
        const distance = posBullet.distanceTo(posEnemy);

        // Se a distância é menor que 1.5, há colisão
        if (distance < 1.5) {
            return enemy; // Retorna o inimigo atingido
        }
    }

    return null; // Nenhuma colisão encontrada
}

// Velocidade de movimento dos inimigos
const enemySpeed = 2;

// Função que movimenta os inimigos
function enemiesMove(deltaTime){
    // Se os inimigos foram spawnados
    if (enemiesSpawned === true){
        // Percorre cada inimigo
        for (let i = 0; i < enemies.length; i++){
            // Pega o inimigo atual
            const enemy = enemies[i];

            // Cria um vetor para o alvo (onde o inimigo está olhando)
            const lookTarget = new THREE.Vector3();
            // Copia posição do jogador
            lookTarget.copy(player.position);
            // Mantém a altura do inimigo (Y do inimigo)
            lookTarget.y = 0;

            // Faz o inimigo olhar para o jogador
            enemy.lookAt(lookTarget);

            // Se o inimigo não está vivo, pula para próximo
            if (!enemy.userData.alive) continue;
            
            // Cria vetor de direção do inimigo para o jogador
            const directionPlayer = new THREE.Vector3();
            // Calcula direção subtraindo posição do inimigo de posição do jogador
            directionPlayer.subVectors(player.position, enemy.position);
            // Mantém movimento no plano horizontal (ignora Y)
            directionPlayer.y = 0;
            // Transforma em vetor unitário (comprimento = 1)
            directionPlayer.normalize();
            
            // Move o inimigo em direção ao jogador
            enemy.position.add(directionPlayer.multiplyScalar(enemySpeed * deltaTime));

            // Pega posição global do jogador
            player.getWorldPosition(posPlayer);
            // Pega posição global do inimigo
            enemy.getWorldPosition(posEnemy);

            // Calcula distância entre inimigo e jogador
            const distance = posEnemy.distanceTo(posPlayer);

            // Incrementa cooldown de ataque
            enemy.userData.attackCooldown += deltaTime * 2.5;

            // Se o inimigo está perto e cooldown passou
            if (distance < 1.5 && enemy.userData.attackCooldown >= 1){
                // Diminui saúde do jogador
                player.userData.health--;
                // Reseta cooldown de ataque
                enemy.userData.attackCooldown = 0;
            }
        }
    }
}

// Vetor que armazena direção do inimigo para disparo
const enemyDirection = new THREE.Vector3();
// Vetor que armazena origem do disparo do inimigo
const enemyOrigin = new THREE.Vector3();

// Array que armazena balas disparadas pelos inimigos
const enemyBullets = [];

// Função que cria uma bala disparada por um inimigo
function createBulletEnemy(enemy){
    // Clona o modelo de bala do inimigo
    const bulletCloneEnemy = enemyBullet.clone();

    // Pega direção que o inimigo está apontando
    enemy.getWorldDirection(enemyDirection);
    // Pega posição global do inimigo
    enemy.getWorldPosition(enemyOrigin);

    // Define posição da bala clonada
    bulletCloneEnemy.position.copy(enemyOrigin);
    // Define direção normalizada da bala
    bulletCloneEnemy.direction = enemyDirection.clone().normalize();

    // Adiciona a bala à cena
    scene.add(bulletCloneEnemy);

    // Adiciona a bala ao array de balas do inimigo
    enemyBullets.push(bulletCloneEnemy);
}

// Velocidade das balas do inimigo
const bulletEnemySpeed = 0.1;

// Função que gerencia disparos dos inimigos
function enemyShoot(deltaTime){
    // Percorre cada inimigo para atualizar cooldown e criar balas
    for (let i = 0; i < enemies.length; i++){
        // Pega o inimigo atual
        const enemy = enemies[i];

        // Se o inimigo não está vivo, pula para próximo
        if (!enemy.userData.alive) continue;

        // Pega posição global do jogador
        player.getWorldPosition(posPlayer);
        // Pega posição global do inimigo
        enemy.getWorldPosition(posEnemy);

        // Calcula distância entre inimigo e jogador
        const distanceEnemyPlayer = posPlayer.distanceTo(posEnemy);

        // Incrementa cooldown de ataque
        enemy.userData.attackCooldown += deltaTime * 0.2;

        // Se cooldown passou e jogador está longe (acima de 30)
        if (enemy.userData.attackCooldown > 2 && distanceEnemyPlayer > 30){
            // Cria uma bala disparada pelo inimigo
            createBulletEnemy(enemy);
            // Reseta cooldown de ataque
            enemy.userData.attackCooldown = 0;
        }
    }

    // Move as balas já existentes disparadas pelos inimigos
    for (let i = 0; enemyBullets.length > i; i++){
        // Adiciona velocidade à bala
        enemyBullets[i].position.add(enemyBullets[i].direction.clone().multiplyScalar(bulletEnemySpeed));

        // Verifica se a bala atingiu o jogador
        const hitPlayer = checkBulletPlayerCollision(enemyBullets[i]);

        // Se a bala atingiu o jogador
        if (hitPlayer !== null) {
            // Diminui saúde do jogador
            player.userData.health--;

            // Remove a bala da cena
            scene.remove(enemyBullets[i]);
            // Remove a bala do array
            enemyBullets.splice(i, 1);
            i--;

            continue;
        }

        // Pega posição global do jogador
        player.getWorldPosition(posPlayer);
        // Pega posição global da bala
        enemyBullets[i].getWorldPosition(posBullet);
        
        // Calcula distância entre jogador e bala
        const distancePlayerBullet = posPlayer.distanceTo(posBullet);
        
        // Se a bala estiver muito longe do jogador
        if (distancePlayerBullet > despawnBulletDis){
            // Remove a bala da cena
            scene.remove(enemyBullets[i]);

            // Remove a bala do array
            enemyBullets.splice(i, 1);
            i--;

            continue;
        }
    }
}

// Função que verifica colisão entre bala do inimigo e jogador
function checkBulletPlayerCollision(bullet){
    // Se o jogo já terminou, retorna null
    if (gameOver) return null;

    // Pega posição global da bala
    bullet.getWorldPosition(posBullet);
    // Pega posição global do jogador
    player.getWorldPosition(posPlayer);

    // Calcula distância entre bala e jogador
    const distance = posBullet.distanceTo(posPlayer);

    // Se a distância é menor que 1.5, há colisão
    if (distance < 1.5) {
        return player; // Retorna o jogador como atingido
    }

    return null; // Sem colisão
}

// Vetor que aponta para baixo (para verificar se está no chão)
const down = new THREE.Vector3(0, -1, 0);

// Booleana que indica se o jogador pode pular
let canJump = true;

// Pequeno offset para raycaster ficar um pouco acima do jogador
const footOffset = new THREE.Vector3(0, 0.05, 0);

// Função que verifica se o jogador está no chão
function onGround() {
    // Pega posição global do jogador e adiciona offset
    player.getWorldPosition(origin.add(footOffset));

    // Configura raycaster na posição do jogador apontando para baixo
    raycaster.set(origin, down);

    // Verifica intersecção com o chão
    const intersects = raycaster.intersectObject(scene.getObjectByName("ground"), true);

    // Se o raycaster intersectou com o chão e está perto (distância <= 1.1)
    if (intersects.length > 0 && intersects[0].distance <= 1.1){
        // Pode pular
        canJump = true;

    }else{
        // Não pode pular (está no ar)
        canJump = false;
    }
}

// Booleana para verificar se atingiu limite superior de rotação
let rotationCimaLimite = false;
// Booleana para verificar se atingiu limite inferior de rotação
let rotationBaixoLimite = false;

// Função que limita a rotação vertical da câmera
function rotateX(){
    // Se câmera rotacionou muito para cima (0.6 radianos)
    if (camera.rotation.x >= 0.6){
        // Marca que atingiu limite superior
        rotationCimaLimite = true;

    }else{
        // Não atingiu limite superior
        rotationCimaLimite = false;

    }

    // Se câmera rotacionou muito para baixo (-0.9 radianos)
    if (camera.rotation.x <= -0.9){
        // Marca que atingiu limite inferior
        rotationBaixoLimite = true;
        
    }else{
        // Não atingiu limite inferior
        rotationBaixoLimite = false;
        
    }
    
}

// Booleana que indica se o pointer lock está ativo
let isPointerLock = false;

// Event listener para quando o jogador clica
renderer.domElement.addEventListener("click", async () => {
    // Try-catch para tratar erro ao solicitar pointer lock
    try{
        // Se o jogo não terminou
        if (gameOver === false){
            // Solicita pointer lock no renderizador
            await renderer.domElement.requestPointerLock();
        }

    } catch (e){
        // Cancelou o lock
    }

});

// Event listener para quando pointer lock muda
document.addEventListener("pointerlockchange", () =>{
    // Se o elemento com pointer lock é o renderizador
    if (document.pointerLockElement === renderer.domElement){
        // Pointer lock está ativo
        isPointerLock = true;

    }else{
        // Pointer lock está inativo
        isPointerLock = false;
    }

});

// Armazena movimento horizontal do mouse
let mouseX = 0;
// Armazena movimento vertical do mouse
let mouseY = 0;

// Event listener para movimento do mouse
window.addEventListener("mousemove", (event) => {
    // Se pointer lock não está ativo, não faz nada
    if (!isPointerLock) return;

    // Velocidade de rotação com mouse
    let rotateSpeed = 0.002;
    // Valor para arredondar rotação (evita girar infinitamente)
    const step = 1000;

    // Calcula mudança na rotação vertical (pitch)
    const deltaY = mouseY * rotateSpeed;
    // Calcula mudança na rotação horizontal (yaw)
    const deltaX = mouseX * rotateSpeed;

    // Se pointer lock está ativo
    if (isPointerLock === true){
        // Pega movimento horizontal do mouse
        mouseX = event.movementX;
        // Pega movimento vertical do mouse
        mouseY = event.movementY;
    
        // Se tentaria rotacionar para cima além do limite, ignora
        if (deltaY < 0 && rotationCimaLimite === true){
            return;
        }

        // Se tentaria rotacionar para baixo além do limite, ignora
        if (deltaY > 0 && rotationBaixoLimite === true){
            return;
        }

        // Rotaciona câmera verticalmente (pitch)
        camera.rotation.x -= deltaY;
        // Arredonda rotação para evitar erro de ponto flutuante
        camera.rotation.x = Math.round(camera.rotation.x * step) / step;

        // Rotaciona jogador horizontalmente (yaw)
        player.rotation.y -= deltaX;

    }

});

// Event listener para clique do mouse
window.addEventListener("mousedown", (event) => {
    // Se é o botão esquerdo do mouse e não é repeat
    if (event.button === 0 && !event.repeat){
        // Ativa disparo de bala
        bulletBool = true;
    }

});

// Event listener para soltar o clique do mouse
window.addEventListener("mouseup", (event) => {
    // Se é o botão esquerdo do mouse e não é repeat
    if (event.button === 0 && !event.repeat){
        // Desativa disparo de bala
        bulletBool = false;
    }

});

// Event listener para tecla pressionada
window.addEventListener("keydown", (event) => {
    // Se F3 + Shift foi pressionado
    if (event.key === "F3" && event.shiftKey) {
        // Previne ação padrão do navegador
        event.preventDefault();
        // Alterna visibilidade do menu debug
        debug_ui.classList.toggle("hidden");
    }

    // Se F4 foi pressionado e debug está ativo
    if (event.key === "F4" && debugAtivo === true){
        // Alterna rotação do cubo
        cubeRotation = !cubeRotation;
    }

    // Se 4 foi pressionado e debug está ativo
    if (event.key === "4" && debugAtivo === true){
        // Alterna mudança de cor do cubo
        cubeColorRGB = !cubeColorRGB;
    }

    // Se W foi pressionado
    if (event.key.toLowerCase() === "w"){
        // Marca tecla W como pressionada
        w = true;
    }
    // Se S foi pressionado
    if (event.key.toLowerCase() === "s"){
        // Marca tecla S como pressionada
        s = true;
    }
    // Se A foi pressionado
    if (event.key.toLowerCase() === "a"){
        // Marca tecla A como pressionada
        a = true;
    }
    // Se D foi pressionado
    if (event.key.toLowerCase() === "d"){
        // Marca tecla D como pressionada
        d = true;
    }

    // Se ESPAÇO foi pressionado
    if(event.key === " "){
        // Marca tecla ESPAÇO como pressionada
        space = true;
    }
    // Se SHIFT foi pressionado
    if (event.key === "Shift"){
        // Marca tecla SHIFT como pressionada
        shift = true;
    }

});

// Event listener para tecla liberada
window.addEventListener("keyup", (event) => {
    // Se W foi liberado
    if (event.key.toLowerCase() === "w"){
        // Marca tecla W como não pressionada
        w = false;
    }
    // Se S foi liberado
    if (event.key.toLowerCase() === "s"){
        // Marca tecla S como não pressionada
        s = false;
    }
    // Se A foi liberado
    if (event.key.toLowerCase() === "a"){
        // Marca tecla A como não pressionada
        a = false;
    }
    // Se D foi liberado
    if (event.key.toLowerCase() === "d"){
        // Marca tecla D como não pressionada
        d = false;
    }

    // Se ESPAÇO foi liberado
    if(event.key === " "){
        // Marca tecla ESPAÇO como não pressionada
        space = false;
    }
    // Se SHIFT foi liberado
    if (event.key === "Shift"){
        // Marca tecla SHIFT como não pressionada
        shift = false;
    }
    
});

// Inicia o loop de atualização do jogo
update();
