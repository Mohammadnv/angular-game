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
    record: number = 0;
    scoreup: number = 0;

    StartGame(): void {
        this.score = 0;
        this.health = 5;
        this.speed = 1;
        this.CleareShape();
        this.GameInterval = setInterval(() => this.CreateShape(), 1000);
    }

    EndGame(): void {
        clearInterval(this.GameInterval);
        this.showpopup()
        //  if (confirm('your score is' + this.score + "/*/*/*/*/*/*/" + 'Do you want to play again?')) {
        //this.StartGame()
        //}
        this.CleareShape();
        const setrecord = localStorage.getItem("record");
        this.record = Number(setrecord);

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
        Shape.classList.add(RandomType);

        Shape.style.position = "absolute";
        Shape.style.top = "0px";

        if (["rectangle", "oval", "circle", "square"].includes(RandomType)) {
            Shape.style.width = `${Math.floor((Math.random() * 50) + 30)}px`;
            Shape.style.height = `${Math.floor((Math.random() * 50) + 30)}px`;
            Shape.style.left = `${Math.random() * (window.innerWidth - 400)}px`;
            Shape.style.borderRadius = `${Math.floor(Math.random() * 50)}%`;
        }

        if (RandomType === "triangle-up") {
            Shape.style.width = "0";
            Shape.style.height = "0";
            Shape.style.borderRight = "25px solid transparent";
            Shape.style.borderBottom = "50px solid #555";
            Shape.style.borderLeft = "25px solid transparent";
        }

        if (RandomType === "triangle-down") {
            Shape.style.width = "0";
            Shape.style.height = "0";
            Shape.style.borderRight = "25px solid transparent";
            Shape.style.borderTop = "50px solid #555";
            Shape.style.borderLeft = "25px solid transparent";
        }

        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);

        if (["rectangle", "oval", "circle", "square"].includes(RandomType)) {
            Shape.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        }
        if (RandomType === "triangle-up") {
            Shape.style.borderBottomColor = `rgb(${r},${g},${b})`;
        }
        if (RandomType === "triangle-down") {
            Shape.style.borderTopColor = `rgb(${r},${g},${b})`;
        }

        Shape.onclick = () => {
            Shape.remove();
            this.score++;
            this.speed += 0.3;
        };

        document.getElementById("game-container")?.appendChild(Shape);
        this.animateFall(Shape);
    }



    animateFall(shape: HTMLElement): void {
        let lastTime = performance.now();

        const fall = (currentTime: number) => {
            if (!document.body.contains(shape)) return;
            const deltaTime = currentTime - lastTime;
            lastTime = currentTime;


            let shapeTop = parseFloat(shape.style.top || "0");
            shapeTop += this.speed * (deltaTime / 16.67);
            shape.style.top = `${shapeTop}px`;
            if (shapeTop > window.innerHeight) {
                if (document.body.contains(shape)) {
                    this.health--;
                    shape.remove();

                    if (this.speed > 1) {
                        this.speed--;
                    }

                    if (this.health === 0) {
                        this.EndGame();
                        this.scoreup = this.score;
                        if (this.record < this.scoreup) {
                            localStorage.setItem("record", this.scoreup.toString());
                        }
                        const setrecord = localStorage.getItem("record");
                        this.record = Number(setrecord);
                    }
                }
            } else {
                requestAnimationFrame(fall);
            }
        };

        requestAnimationFrame(fall);
    }




    showpopup(): void {

        const div = document.getElementById("pop-up");

        if (div) {
            div.style.zIndex = "100";
            div.style.display = "flex"
        }
    }

    closepopup(): void {
        debugger
        const div = document.getElementById("pop-up");
        const popupbtn = document.getElementById("pop-upbtn");


        if (div) {
            div.style.zIndex = "0"
            div.style.display = "none"
        }


    }



}