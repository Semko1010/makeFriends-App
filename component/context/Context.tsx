import React, { createContext, useState } from "react"
import { View } from "react-native"

import App from "../../App"
import RegisterA from "../register/RegisterA"
import RegisterB from "../register/RegisterB"

type userImg={
    img:string;
    setImg:React.Dispatch<React.SetStateAction<string>>
  }

const userImage = createContext<userImg>({} as userImg)

const Context = () =>{
    const [ img, setImg] = useState("dasd")
    return(
        <View>
        <userImage.Provider value={{img,setImg}}>   
       
        <App/>
      
            
        </userImage.Provider>
        </View>
    )
}
export {userImage}
export default Context