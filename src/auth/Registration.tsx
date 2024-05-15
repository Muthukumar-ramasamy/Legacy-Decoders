import { Box, Button, TextField, Typography } from "@mui/material"
import { Controller, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import FormInput from "../form/FormInput"
import { registerUser } from "./authService.service"

const Registration = () => {
    const navigate = useNavigate()
    const { control, handleSubmit } = useForm({ mode: "onSubmit" })

    const handleRegistration = (data) => {
        console.log(data, "form")
        registerUser(data).then((response) => {
            console.log(response)
            if (response.status === 201) {
                navigate("/auth/login")
            }
        })
    }

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: 6
        }}>
            <Typography variant={"h4"}>{"Registration"}</Typography>
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