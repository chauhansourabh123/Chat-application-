import { createContext, useContext, useEffect, useState } from "react";
import { Context } from "../Context/Context.jsx";
import { io } from "socket.io-client";

export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const { loggedInUser } = useContext(Context);
    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {
        if (loggedInUser) {
            const socketInstance = io("http://localhost:4002", {
                query: {
                    userId: loggedInUser._id,
                },
            });
            setSocket(socketInstance);

            socketInstance.on("getOnline", (users) => {
                setOnlineUsers(users);
            });

            // Return a cleanup function to close the socket
            return () => {
                socketInstance.close();
            };
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [loggedInUser]);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;
