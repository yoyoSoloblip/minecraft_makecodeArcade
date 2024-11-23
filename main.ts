namespace SpriteKind {
    export const Wall = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mySprite) {
        if (mySprite.isHittingTile(CollisionDirection.Bottom)) {
            mySprite.vy = -90
        }
    }
})
function Start_Game () {
    myMenu.close()
    scene.setBackgroundImage(assets.image`bg`)
    tiles.setCurrentTilemap(tilemap`level3`)
    mySprite = sprites.create(Characters[blockSettings.readNumber("Character")], SpriteKind.Player)
    controller.moveSprite(mySprite, 100, 0)
    mySprite.setPosition(73, 0)
    scene.cameraFollowSprite(mySprite)
}
function Setup () {
    myMenu = miniMenu.createMenu(
    miniMenu.createMenuItem("Play          "),
    miniMenu.createMenuItem("Character"),
    miniMenu.createMenuItem("Controls")
    )
    myMenu.setDimensions(100, 100)
    myMenu.setPosition(83, 104)
    MyCharacterIndex = 0
    Characters = [assets.image`Steve`, assets.image`Alexis`, assets.image`Ezeal`]
    scene.setBackgroundImage(assets.image`cover`)
}
function Character_Selection () {
    myMenu.close()
    scene.setBackgroundImage(assets.image`black bg`)
    myMenu2 = miniMenu.createMenu(
    miniMenu.createMenuItem("Steve", assets.image`Steve`),
    miniMenu.createMenuItem("Alexis", assets.image`Alexis`),
    miniMenu.createMenuItem("Ezeal", assets.image`Ezeal`)
    )
    myMenu2.onButtonPressed(controller.A, function (selection, selectedIndex) {
        if (selection == "Steve") {
            MyCharacterIndex = 1
            blockSettings.writeNumber("Character", MyCharacterIndex)
        } else if (selection == "Alexis") {
            MyCharacterIndex = 2
            blockSettings.writeNumber("Character", MyCharacterIndex)
        } else if (selection == "Ezeal") {
            MyCharacterIndex = 3
            blockSettings.writeNumber("Character", MyCharacterIndex)
        }
    })
    pauseUntil(() => controller.B.isPressed())
    game.reset()
}
function GenerateTerrain () {
    // Starting base height for the ground
    terrainHeight = 9
}
let terrainHeight = 0
let myMenu2: miniMenu.MenuSprite = null
let MyCharacterIndex = 0
let Characters: Image[] = []
let mySprite: Sprite = null
let myMenu: miniMenu.MenuSprite = null
Setup()
myMenu.onButtonPressed(controller.A, function (selection, selectedIndex) {
    if (selection == "Play          ") {
        Start_Game()
    } else if (selection == "Character") {
        Character_Selection()
    } else if (selection == "Controls") {
        game.splash("[SOON TO BE POSTED]")
    }
})
forever(function () {
    if (mySprite) {
        mySprite.ay = 140
    }
})
