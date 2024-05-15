import { Divider, List } from "@mui/material"
import HistoryItem from "./HistoryItem"

const HistoryList = ({ values }) => {
    return (
        <List sx={{ width: "100%" }} >
            {
                values?.map((eachValue) => (
                    <>
                        <HistoryItem
                            title={eachValue?.title}
                            date={eachValue?.date}
                        />
                        
                        <Divider variant="fullWidth" component={"li"} />
                    </>

                ))
            }
        </List>
    )
}

export default HistoryList