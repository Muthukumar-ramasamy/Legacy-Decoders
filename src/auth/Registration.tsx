import { Alert, Box, Button, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import FormInput from "../form/FormInput"
import { registerUser } from "./authService.service"
import { useState } from "react"

const Registration = () => {
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState("")
    const { control, handleSubmit } = useForm({ mode: "onSubmit" })

    const handleRegistration = (data) => {
        registerUser(data).then((response) => {
            if (response.status === 200) {
                navigate(`/auth/login?username=${response?.data?.username}`)
            }
        }).catch((error) => {
            setErrorMessage(error.message)
        })
    }

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: 6
        }}>
            <Typography variant={"h4"}>{"Registration"}</Typography>
            {
                errorMessage && (
                    <Alert severity="error">{errorMessage}</Alert>
                )
            }
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2
                }}
                component={"form"}
                onSubmit={handleSubmit(handleRegistration)}>
                <FormInput name={"firstname"} label={"First Name"} control={control} required={true} type={"text"} />
                <FormInput name={"lastname"} label={"Last Name"} control={control} required={true} type={"text"} />
                <FormInput name={"email"} label={"Email"} control={control} required={true} type={"email"} />
                <FormInput name={"password"} label={"Password"} control={control} required={true} type={"password"} />

                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    mt: 2
                }}>
                    <Button sx={{ borderRadius: "10px" }} type={"submit"} variant={"contained"}>
                        {"Submit"}
                    </Button>
                    <Button sx={{ borderRadius: "10px" }} onClick={() => navigate(-1)} variant={"contained"}>
                        {"Back"}
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

export default Registration