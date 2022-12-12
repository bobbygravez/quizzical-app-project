const randomArray = ["1", "z", "a", "2", "s", "k", "5", "p", "0", "$", "t", "@", "l", "&", "<", "}", "/", "]", ">", "o", "3", "4", "6", "7", "8", "9", "@", "*", ")"]
    
    export default function generateId(){
        let randomNumbers = ""
        for(let i = 0; i < randomArray.length; i++){
            const randomId = Math.floor(Math.random() * randomArray.length)
             randomNumbers += randomArray[randomId]
        }
        return randomNumbers
    }