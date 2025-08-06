import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'appgame-selector',
    templateUrl: 'App-game.component.html',
    styleUrls: ['app-game.component.css']
})

export class AppGameComponent implements OnInit {
    constructor() { }

    ngOnInit() { }

    score: number = 0;
    health: number = 5;
    GameInterval: any;
    speed: number = 1;


    StartGame(): void {
        this.score = 0;
        this.health = 5;
        this.speed = 1;
        this.CleareShape();
        this.GameInterval = setInterval(() => this.CreateShape(), 1000);
    }

    EndGame(): void {
        clearInterval(this.GameInterval);
        if (confirm('your score is' + this.score +  "/*/*/*/*/*/*/" + 'Do you want to play again?')) {
            this.StartGame()
        }
        this.CleareShape();

    }

    CleareShape(): void {
        let allshapes = document.querySelectorAll(".shape");
        allshapes.forEach(item => item.remove());
    }

    CreateShape(): void {
        const Shape = document.createElement("div");
        Shape.classList.add("shape");
        let Shapestype: string[] = ["rectangle", "oval", "circle", "square", "triangle-up", "triangle-down"];
        const RandomType = Shapestype[Math.floor(Math.random() * 6)];
        console.log(RandomType);
        Shape.classList.add(RandomType);

        Shape.style.position = "absolute"
        Shape.style.top = "0";


        if (["rectangle", "oval", "circle", "square"].includes(RandomType)) {
            Shape.style.width = `${Math.floor((Math.random() * 50) + 30)}`
            Shape.style.height = `${Math.floor((Math.random() * 50) + 30)}`
            Shape.style.left = `${Math.random() * (window.innerWidth - 400)}px`;
            let x = Shape.style.borderRadius = `${Math.floor(Math.random() * 50)}%`
        }


        if (["triangle-up"].includes(RandomType)) {
            Shape.style.width = "0";
            Shape.style.height = "0";
            Shape.style.borderRight = "25px solid transparent";
            Shape.style.borderBottom = "50px solid #555";
            Shape.style.borderLeft = "25px solid transparent";
        }

        if (["triangle-down"].includes(RandomType)) {
            Shape.style.width = "0";
            Shape.style.height = "0";
            Shape.style.borderRight = "25px solid transparent";
            Shape.style.borderTop = "50px solid #555";
            Shape.style.borderLeft = "25px solid transparent";
        }
        //console.log(x);

        if (["rectangle", "oval", "circle", "square"].includes(RandomType)) {
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);
            Shape.style.backgroundColor = `rgb(${r}, ${g}, ${b})`
        }
        if (["triangle-up"].includes(RandomType)) {
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);
            Shape.style.borderBottomColor = `rgb(${r},${g},${b})`
        }
        if (["triangle-down"].includes(RandomType)) {
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);
            Shape.style.borderTopColor = `rgb(${r},${g},${b})`
        }

        Shape.onclick = () => {
            Shape.remove();
            this.score ++;
            (this.speed += 0.5).toFixed(0)
        }

        // const container = document.getElementById("game-container");
        // console.log("Container:", container);
        document.getElementById("game-container")?.appendChild(Shape);

        const fall = setInterval(() => {
            let shapetop = parseInt(getComputedStyle(Shape).top);

            if (shapetop > window.innerHeight) {
                this.health--;
                Shape.remove();
                clearInterval(fall);

                if (this.speed > 1) {
                    this.speed--;
                }

                if (this.health == 0) {
                    this.EndGame();
                }
            } else {
                shapetop += this.speed;
                Shape.style.top = `${shapetop}px`;
            }
        }, 100);
    }


}