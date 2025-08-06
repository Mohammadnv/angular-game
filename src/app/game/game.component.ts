import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
    selector: 'app-game',
    templateUrl: 'game.component.html',
    styleUrls: ['game.component.css'],
})
export class GameComponent implements OnInit {
    constructor(private renderer: Renderer2) { }

    score: number = 0;
    mistake: number = 0;
    gameinterval: any;
    speed: number = 1;
    

    ngOnInit() { }

    startGame(): void {
        this.score = 0;
        this.mistake = 0;
        this.clearShapes();
        this.gameinterval = setInterval(() => this.createshape(), 1000);
    }

    endGame(): void {
        debugger
        clearInterval(this.gameinterval);
        alert("امتیاز:" + this.score + "----" + "خطا" + this.mistake);
        this.score = 0;
        this.mistake = 0;
        this.clearShapes();

        this.startGame();

    }

    clearShapes(): void {
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach(shape => shape.remove());
    }

    createshape(): void {
        const shape = this.renderer.createElement("div");
        this.renderer.addClass(shape, "shape");

        const shapeTypes: string[] = ['oval', 'square', 'rectangle', 'circle'];
        const randomType = shapeTypes[Math.floor(Math.random() * 4)];
        this.renderer.addClass(shape, randomType);

        this.renderer.setStyle(shape, 'position', 'absolute');
        this.renderer.setStyle(shape, 'top', '0px');
        this.renderer.setStyle(shape, 'left', `${Math.random() * (window.innerWidth - 50)}px`);

        if (randomType === 'circle' || randomType === 'square' || randomType === 'oval' || randomType === 'rectangle') {
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);
            this.renderer.setStyle(shape, 'background-color', `rgb(${r}, ${g}, ${b})`);
        }

        shape.onclick = () => {
            this.score++;
            this.speed += 0.5;
            shape.remove();
        };

        document.querySelector(".game-container")?.appendChild(shape);

        const fall = setInterval(() => {
            let top = parseInt(shape.style.top);

            debugger

            if (top > window.innerHeight) {
                this.mistake++;
                shape.remove();
                clearInterval(fall)
                if(this.speed > 1){
                    this.speed--;
                }

                if (this.mistake > 4) {
                    this.endGame();
                }

                debugger
            } else {
                top += this.speed;
                shape.style.top = `${top}px`;
            }
        }, 100);
    }
}
