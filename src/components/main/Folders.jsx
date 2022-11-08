import { Link, useParams } from "react-router-dom";

function WSLists(props) {
    const params = useParams();
    console.log(params);
    return (
        <>All folders from {params.wsid}
        <Link to="/xxworkspace/xxfolder">Get this folder here</Link>

        </>
    );
}
export default WSLists;