import { Actions, createEffect, ofType } from "@ngrx/effects";
import { decrement, increment, init, set } from "./counter.actions";
import { tap } from "rxjs/internal/operators/tap";
import { of, switchMap, withLatestFrom } from "rxjs";
import { Store } from "@ngrx/store";
import { selectCount } from "./counter.selectors";
import { Injectable } from "@angular/core";

@Injectable()
export class CounterEffects {
    loadCount = createEffect(() => this.actions$.pipe(
        ofType(init),
        switchMap(() => { //switch to new observable chain
            const storedCounter =  localStorage.getItem('count');
            if(storedCounter) {
                return of(set({ value: +storedCounter})); //set is an action defined by us, of changes into an observable
                // => after getting the value from the localStorage a new action is triggered
            }
            return of(set({ value: 0}));
        }) //Merke: kein dispatch:false, weil neue action getriggert wird
    ))


    saveCount = createEffect(() => this.actions$.pipe(
        ofType(increment, decrement),
        withLatestFrom(this.store.select(selectCount)),
        tap(([action, counter]) => {
            console.log(action);
            localStorage.setItem('count', counter.toString());
        })
    ), {dispatch: false}); //Dispatch wird benötigt da keine neue Action getriggert wird

    constructor(private actions$: Actions,
        private store: Store<{counter: number}>) {}
}