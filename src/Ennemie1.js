//@ts-check
import Phaser from "phaser";

export default class Ennemi {
    constructor() {
        this.walkSpeed = 100;
        this.runSpeed = 175;
        
        this.playerSpeed = this.walkSpeed;
        this.ennemiRight = false;
        this.delay = 3000;
        this.delayToPause = 1000;
    }
    /**
     * @param {Phaser.Types.Physics.Arcade.SpriteWithDynamicBody} ennemi
    */
    MoveTheEnnemi(ennemi) {
        if(this.ennemiRight){
            console.log('ennemi move right');
            ennemi.setVelocity(40,-20)
            this.ennemiRight = !this.ennemiRight
        }
        else{
            console.log('ennemi move left');

            ennemi.setVelocity(-40,20)
            this.ennemiRight = !this.ennemiRight
        }
    }
}