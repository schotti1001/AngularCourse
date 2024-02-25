import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrl: './game-control.component.css'
})
export class GameControlComponent {
    @Output() gameTicker = new EventEmitter<number>();
    tickerValue = 0;
    ref;

    startGame() {
        this.ref = setInterval(() => {
              this.gameTicker.emit(this.tickerValue);
              this.tickerValue ++;
            }, 1000);
    }

    stopGame(){
        clearInterval(this.ref);
    }
}
