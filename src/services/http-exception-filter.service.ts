import {ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(_exception: HttpException, host: ArgumentsHost){
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = _exception.getStatus ? _exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        const errResponse = {
            code: status,
            timestamp: new Date().toLocaleDateString(),
            path: request.url,
            method: request.method,
            message: status !== HttpStatus.INTERNAL_SERVER_ERROR ? _exception.message['error'] || _exception.message || null : 'Internal Server Error'
        };
        return response.status(status).json(errResponse);

    }
}