const SERVICE_WORKER_TIMEOUT_SHAPE: Partial<Response> = {
    ok: false,
    status: 504,
    statusText: 'Gateway Timeout'
}

export class ServiceWorkerHelper {
    static isServiceWorkerTimeout(response: Response): boolean {
        return response.ok === SERVICE_WORKER_TIMEOUT_SHAPE.ok &&
            response.status === SERVICE_WORKER_TIMEOUT_SHAPE.status &&
            response.statusText === SERVICE_WORKER_TIMEOUT_SHAPE.statusText;
    }
}