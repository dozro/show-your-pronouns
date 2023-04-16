export class UserNotFoundError extends Error{
    constructor(message: string) {
        super(message);
    }
}
export class NoDataBecauseUserNotFound extends UserNotFoundError{
    constructor(message: string) {
        super(message);
    }
}