import { CustomErrorInterface } from "../interfaces/customErrorInterface";

export class BadRequestError extends Error implements CustomErrorInterface {
    status: number;
    title: string;
    message: string;

    constructor(message: string) {
        super(message);
        this.status = 400;
        this.title = 'BAD_REQUEST';
        this.message = message;
    }
}

export class UnauthorizedError extends Error implements CustomErrorInterface {
    status: number;
    title: string;
    message: string;

    constructor(message: string) {
        super(message);
        this.status = 401;
        this.title = 'UNAUTHORIZED';
        this.message = message;
    }
}

export class ForbiddenError extends Error implements CustomErrorInterface {
    status: number;
    title: string;
    message: string;

    constructor(message: string) {
        super(message);
        this.status = 403;
        this.title = 'FORBIDDEN';
        this.message = message;
    }
}

export class NotFoundError extends Error implements CustomErrorInterface {
    status: number;
    title: string;
    message: string;

    constructor(message: string) {
        super(message);
        this.status = 404;
        this.title = 'NOT_FOUND';
        this.message = message;
    }
}

export class ConflictError extends Error implements CustomErrorInterface {
    status: number;
    title: string;
    message: string;

    constructor(message: string) {
        super(message);
        this.status = 409;
        this.title = 'CONFLICT';
        this.message = message;
    }
}

export class InternalServerError extends Error implements CustomErrorInterface {
    status: number;
    title: string;
    message: string;

    constructor(message: string) {
        super(message);
        this.status = 500;
        this.title = 'INTERNAL_SERVER_ERROR';
        this.message = message;
    }
}