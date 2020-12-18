/// <reference path="GameEntity.ts" />


class Layout extends GameEntity{

    public constructor(xPos: number, yPos: number, imageUrl: string){
        super(xPos, yPos)
        this.image = this.loadNewImage(imageUrl);
    }

}