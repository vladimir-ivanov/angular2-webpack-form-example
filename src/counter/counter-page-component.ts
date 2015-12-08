import {Component, Inject, OnDestroy} from 'angular2/angular2';
import {CounterActions} from './counter-actions';
import {CounterStore} from "./counter-store";

@Component({
    selector: 'counter',
    providers: [CounterActions, CounterStore],
    templateUrl: './src/counter/counter.html'
})
export class CounterPageComponent implements OnDestroy{
    counter:number = 0;

    private counterActions;
    private counterStore;

    constructor(@Inject(CounterActions)counterActions:CounterActions,
                @Inject(CounterStore)counterStore:CounterStore) {
        this.counterActions = counterActions;
        this.counterStore = counterStore;

        this.counter = this.counterStore.getCounter();
        this.counterStore.subscribe(() => this.counter = this.counterStore.getCounter());
    }

    ngOnDestroy() {
        this.counterStore.unsubscribe();
    }

    increment() {
        this.counterActions.increment();
    }

    decrement() {
        this.counterActions.decrement();
    }

    reset() {
        this.counterActions.reset();
    }
}
