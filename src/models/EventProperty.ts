export interface EventProperty {
    Event: string,
    Listener: EventListenerOrEventListenerObject,
    Options?: boolean | AddEventListenerOptions | undefined
}
