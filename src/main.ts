import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { constants } from 'http2';

interface HTTPResponse {
    status: number
    body: string
}

const helloWorld: AzureFunction = async (context: Context, req: HttpRequest): Promise<HTTPResponse> => {
    context.log('Http hello world action triggered');

    return {
        status: constants.HTTP_STATUS_OK,
        body: "Hello World"
    };

};

export default helloWorld;