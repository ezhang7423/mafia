import getConfig from "next/config";
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
import io from "socket.io-client";
const socket = io(publicRuntimeConfig.ENDPOINT);

export default socket;
