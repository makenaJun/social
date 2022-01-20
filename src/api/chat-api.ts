import { ChatMessageType } from "../redux/chatReducer"

let ws: WebSocket | null = null

const subscribers = {
    'messages-received': [] as Array<MessagesReceivedSubscribersType>,
    'status-changed' : []  as Array<StatusChangedSubscribersType>
}

const closeHandler = () => {
    notifySubscribersAboutStatus('pending')
    setTimeout(createChannel, 3000)
}
const openHandler = () => {
    notifySubscribersAboutStatus('ready')
}
const errorHandler = () => {
    notifySubscribersAboutStatus('error')
    console.error('Please refresh page!');
    
}

const cleanUp = () => {
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', messageHandler)
    ws?.removeEventListener('open' , openHandler)
    ws?.removeEventListener('error' , errorHandler)
}

const notifySubscribersAboutStatus = (status: ConnectStatusType ) => {
    subscribers['status-changed'].forEach(s => s(status))
}

const createChannel = async () => {
    await cleanUp()
    await ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    notifySubscribersAboutStatus('pending')
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
    ws.addEventListener('open' , openHandler)
    ws.addEventListener('error' , errorHandler)
}

const messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribers['messages-received'].forEach(s => s(newMessages))
}

export const chatApi = {
    start() {
        createChannel()
    },
    stop() {
        subscribers['messages-received'] = []
        subscribers['status-changed'] = []
        cleanUp()
        ws?.close()
    },
    subscribe(eventName: EventNamesType, 
        callback: MessagesReceivedSubscribersType | StatusChangedSubscribersType) {
        //@ts-ignore
        subscribers[eventName].push(callback)
        return () => {
            //@ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
        }
    },
    unsubscribe(eventName: EventNamesType, 
        callback: MessagesReceivedSubscribersType | StatusChangedSubscribersType) {
            //@ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
    }
}

export type ChatMessageApiType = {
    message: string
    photo: string
    userId: number
    userName: string
}
export type ConnectStatusType = 'pending' | 'ready' | 'error'
type EventNamesType = 'messages-received' | 'status-changed'
type MessagesReceivedSubscribersType = (message: Array<ChatMessageType>) => void
type StatusChangedSubscribersType = (status: ConnectStatusType) => void
