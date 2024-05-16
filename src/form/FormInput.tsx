import { TextField } from "@mui/material"
import { Controller } from "react-hook-form"

const FormInput = ({ name, type, label, required, control }) => {
    return (
        <Controller name={name} control={control} render={({ field: { onChange, name, value } }) => (
            <TextField
                onChange={onChange}
                value={value || ""}
                name={name}
                required={required}
                type={type}
                label={label} />
        )} />
    )
}

export default FormInput