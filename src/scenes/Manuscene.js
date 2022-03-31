//@ts-check
import Phaser from "phaser";
import Ennemi from "../Ennemie1";
export default class startScene extends Phaser.Scene {

    init() {
        this.walkSpeed = 100;
        this.runSpeed = 175;
        this.ennemiMov = new Ennemi();
        this.playerSpeed = this.walkSpeed;
        this.delay = 3000;
        this.delayToPause = 1000;
    }

    preload() {
        this.load.image('player', 'assets/sprites/cat-proto.png');
        this.load.image('ennemi', 'assets/sprites/cat-proto.png');
        this.load.image("grass", "assets/tiles/grass.png");
        this.load.tilemapTiledJSON("map", "assets/tiledmap/testmap.json");  
    }

    create() {

        this.physics.world.setBounds(0, 0, 3200, 640); // Augmente la taille du monde

        this.cursors = this.input.keyboard.createCursorKeys(); // Assigne les touches prédéfinis (flèches directionnelles, shift, alt, espace)

        const mapLevel = this.add.tilemap("map");  // Ajoute les coordonnées de chaque tile
        const tileset = mapLevel.addTilesetImage("corridor", "grass");  // Ajoutes les tiles
        const floor = mapLevel.createLayer("floors", tileset); // Créé un layer pour le sol
        const walls = mapLevel.createLayer("walls", tileset); // Créé un layer pour les murs

        /*const colliders = mapLevel.createFromObjects("collider", {name: 'collider'});
        console.log(colliders)
        colliders.forEach(collider => {
            this.physics.world.enable(collider);
        })*/ // Les collisions à travailler
        
        this.player = this.physics.add.sprite(400, 150, 'player');
        //this.physics.add.collider(this.player, colliders, null, null, this); // permet la collision entre 2 objects
        this.ennemi = this.physics.add.sprite(300, 150, 'ennemi');
        this.cameras.main.startFollow(this.player, false, 0.1, 0.1); // Permet que la caméra suit le joueur

        this.timer = this.time.addEvent({ 
            delay: this.delay, 
            callback: this.ennemiMov.MoveTheEnnemi, 
            args: [this.ennemi],
            loop: true 
        });
    }

    update() {
        this.checkPlayerInputs();
    }

    checkPlayerInputs() {
        this.player.setVelocity(0);

        if (this.cursors.shift.isDown) {
            this.playerSpeed = this.runSpeed;
        } else {
            this.playerSpeed = this.walkSpeed;
        }
        
        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-this.playerSpeed);
        } 
        else if (this.cursors.down.isDown) {
            this.player.setVelocityY(this.playerSpeed);
        }

        if (this.cursors.right.isDown) {
            this.player.setVelocityX(this.playerSpeed);
        } 
        else if (this.cursors.left.isDown) {
            this.player.setVelocityX(-this.playerSpeed);
        }
    }
}

