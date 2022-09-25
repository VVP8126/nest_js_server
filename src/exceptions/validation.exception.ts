import {HttpException, HttpStatus} from "@nestjs/common";

export class ValidationException extends HttpException {
    messages: string;
    constructor(responce) {
        super(responce, HttpStatus.BAD_REQUEST);
        this.message = "";
    }
}
