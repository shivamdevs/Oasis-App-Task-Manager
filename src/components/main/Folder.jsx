import { useParams } from "react-router-dom";

function WSlist(props) {
    const params = useParams();
    console.log(params);
    return (
        <>Some lists from: {params.wsid} {">"} {params.fdid}</>
    );
}
export default WSlist;