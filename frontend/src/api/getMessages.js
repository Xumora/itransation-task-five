import axios from 'axios'

const getMessages = async (setMessages, msgType, setIsLoading) => {
    try {
        setIsLoading(true)
        const user = JSON.parse(localStorage.getItem('userInfo'))
        await axios.get(`https://taskmailapp.herokuapp.com/api/message/getMessage?type=${msgType}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                user: user.id
            }
        })
            .then(res => {
                if (res?.data) {
                    setMessages(res?.data)
                }
                setIsLoading(false)
            })
    } catch (error) {
        console.log(error);
        setIsLoading(false)
    }
}

export {
    getMessages
}