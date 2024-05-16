export const useMessagesStore = defineStore("messages", () => {
    const messageTitle = useCookie('messageTitle')
    const messageType = useCookie('messageType')

    const showMessage = (message, isSuccess) => {
        messageTitle.value = message
        messageType.value = isSuccess
        setTimeout(() => {
            messageTitle.value = null
        }, 1500)
    }

    return {messageTitle, messageType, showMessage}
})