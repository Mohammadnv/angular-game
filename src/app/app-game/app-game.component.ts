import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'appgame-selector',
    templateUrl: 'App-game.component.html',
    styleUrls : ['app-game.component.css']
})

export class AppGameComponent implements OnInit {
    constructor() { }

    ngOnInit() { }

    score: number = 0;
    mistake: number = 0;
    GameInterval: any;
    speed: number = 1;


    StartGame(): void {
        this.score = 0;
        this.mistake = 0;
        this.CleareShape();
        this.GameInterval = setInterval(() =>this.CreateShape(),1000);
    }

    EndGame(): void {
        clearInterval(this.GameInterval);
        if(confirm('your score is' + this.score + 'and your mistake is' + this.mistake  +'*****' + 'Do you want to play again?' )){
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
        let Shapestype: string[] = ["rectangle", "oval", "circle", "square"];
        const RandomType = Shapestype[Math.floor(Math.random() * 4)];
        Shape.classList.add(RandomType);

        Shape.style.position = "absolute"
        Shape.style.top = "0";
        Shape.style.width = Math.random() * (window.innerWidth - 20) + 'px';

        if (["rectangle", "oval", "circle", "square"].includes(RandomType)) {
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);
            Shape.style.backgroundColor = `rgb(${r}, ${g}, ${b})`
        }

        Shape.onclick = () => {
            Shape.remove();
            this.score++;
            (this.speed += 0.5).toFixed(0)
        }
        debugger
        document.getElementById("game-contariner")?.appendChild(Shape);

        const fall = setInterval(() => {
            let shapetop = parseInt(Shape.style.top)

            if(shapetop > window.innerHeight){
                this.mistake++;
                Shape.remove();
                clearInterval(fall)
                if(this.speed > 1){
                    this.speed--;
                }

                if(this.mistake > 3){
                    this.EndGame();
                }
            }

            else{
                shapetop += this.speed;
                Shape.style.top = `${shapetop}px`
            }
            
        }, 1000);

    }


}