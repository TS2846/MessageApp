import {io} from 'socket.io-client';

import config from '@/config';

export const socket = io(config.SERVER_URI, {
    autoConnect: false,
});
