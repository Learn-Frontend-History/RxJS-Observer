import {Options, prepareDOM, print} from "../tools";
import {Observable, Observer} from "rxjs";

const OPTIONS: Options = {
    header: 'Observers are simply a set of callbacks',
    buttons: [
        { id: 'observer', caption: 'observer' }
    ]
}
prepareDOM(OPTIONS)

interface Actors<P, C> { producer: P, consumer: C }

{ // observable complete
    const actors: Actors<Observable<string>, Observer<string>> = {
        producer: new Observable(subscriber => {
            subscriber.next('Observers are simply a set of callbacks')
        }),
        consumer: {
            next: print.bind(null, ['RxJS']),
            complete: print.bind(null, ['RxJS']),
            error: print.bind(null, ['RxJS']),
        }
    }

    document.getElementById(
        OPTIONS.buttons[0].id
    ).addEventListener(
        'click',
        _ => {
            console.group()

            actors.producer.subscribe(actors.consumer)
        }
    )
}
