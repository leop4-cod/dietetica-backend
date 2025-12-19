export class SuccessResponseDto<T> {
    constructor(
        public message: string,
        public data: T,
    ) { }
}
