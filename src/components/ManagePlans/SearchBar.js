import { Stack, Input } from "@chakra-ui/react";
import { CiSearch } from "react-icons/ci"

const SearchBar = (props) => {
    let {searchbarinput, setSearchBarinput} = props
    const findIconCss = {
        "position": "absolute",
        "bottom": "10px",
        "right": "0"
    }

    const divCss = {
        "position": "relative",
        "width":"fit-content"
    }
    

 
    return (
        <Stack >
             <div style={divCss}>
                <Input
                    placeholder="Search rate plans"
                    type="search"
                    px="0"
                    borderWidth="0 0 1px 0"
                    outline="none"
                    mt={3}
                    borderColor="grey"
                    borderRadius="0"
                    width="sm"
                    size='md'
                    fontSize="12"
                    _placeholder={{ fontSize: "12px" }}
                    value={searchbarinput}
                    onChange={ (e)=> setSearchBarinput(e.target.value)}
                    />
                <CiSearch style={findIconCss} />
            </div>
        </Stack>
    )
}

export default SearchBar;