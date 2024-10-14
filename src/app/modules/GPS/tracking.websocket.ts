import { Server, Socket } from 'socket.io';
import { Tracking } from '../tracking/tracking.model';


const setupSocket = (server: any) => {
    const io = new Server(server);

    io.on('connection', (socket: Socket) => {
        console.log('A user connected');

        socket.on('trackOrder', (orderId: string) => {
            socket.join(orderId);
        });

        socket.on('updateLocation', async (orderId: string, location: { latitude: number; longitude: number }) => {
            try {
                // Update the location in the database
                await Tracking.findByIdAndUpdate(orderId, { currentLocation: location }, { new: true });

                // Emit the updated location to all clients tracking this order
                io.to(orderId).emit('locationUpdate', location);
            } catch (error) {
                console.error('Error updating location:', error);
            }
        });
    });

    return io;
};

export default setupSocket;