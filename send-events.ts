import { messages } from './messages'
import axios from 'axios'

async function main() {
    for (let i = 0; i < messages.length; i++) {
        runMessage(messages[i])
    }
}

async function runMessage(message: any) {
    let endpoint = 'shipment'
    if (message.type === 'ORGANIZATION') {
        endpoint = 'organization'
    }

    try {
        const response = await axios.post(`http://localhost:3000/${endpoint}`, message)
        console.log(`Input: endpoint[\"/${endpoint}\"], message[${JSON.stringify(message)}]\nOutput: status[${response.statusText}], data[\"${response.data}\"]\n`)
    } catch (error) {
        console.error(error.code)
    }
}

main()