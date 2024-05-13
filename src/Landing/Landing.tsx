import { Grid } from "@mui/material"
import { FC } from "react"
import { Outlet } from "react-router-dom"
import welcome from "../assets/Welcome.png"

export const Landing: FC = () => {
    return (
        <Grid container 
        direction={"row"}  
        minWidth={"lg"} 
        sx={{backgroundImage:`url(${welcome})`,
         backgroundSize:"cover",
         minHeight:"100vh"

         }}>
            <Grid container sx={{ justifyContent:"center"}} display={"block"}>
                <Outlet />
            </Grid>
        </Grid>
    )
}