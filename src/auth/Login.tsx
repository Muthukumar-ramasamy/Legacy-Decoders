import { Box, Button, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import FormInput from "../form/FormInput"
import { loginUser } from "./authService.service"
import { jwtDecode } from "jwt-decode"

const Login = () => {
    const navigate = useNavigate()
    const { control, handleSubmit } = useForm({ mode: "onSubmit" })

    const handleLogin = (data) => {
        loginUser(data).then((response) => {
            console.log(response)
            const decodedToken = jwtDecode(response?.data?.token)
            console.log(decodedToken)
            localStorage.setItem("token", response?.data.token)
            navigate("/story-to-syntex")
        })
    }

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4
        }}>
            <Typography variant={"h4"}>{"Login"}</Typography>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2
                }}
                component={"form"}
                onSubmit={handleSubmit(handleLogin)}>

                <FormInput name={"username"} label={"Username"} control={control} required={true} type={"text"} />
                <FormInput name={"password"} label={"Password"} control={control} required={true} type={"password"} />
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    mt: 2
                }}>
                    <Button sx={{ borderRadius: "10px" }} type={"submit"} variant={"contained"}>
                        {"Login"}
                    </Button>
                    <Button sx={{ borderRadius: "10px" }} onClick={() => navigate(-1)} variant={"contained"}>
                        {"Back"}
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

export default Login